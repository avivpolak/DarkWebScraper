import { HTMLElement } from "node-html-parser";
import { extractDataFromText } from "../scraper/utils/regex";
import parse from "node-html-parser";
import { Config } from "../../types/config";
import { isString } from "../../types/typeGourds";
import { fetchData } from "../scraper/utils/fetcher";
import { readCash, writeCash } from "../shared/cash";
import isUrl from "validator/lib/isUrl";
import { bar } from "../shared/progressBar";



const progressBar = bar('Collecting urls:              ')
const getFullUrlList = async (
    config: Config
): Promise<string[] | undefined> => {
    const urlsFromCash = await readCash(config.name);
    if (
        urlsFromCash &&
        urlsFromCash.data.length >= config.maxUrls &&
        config.url === urlsFromCash.config.url
    ) {
        return urlsFromCash.data.slice(0, config.maxUrls);
    } else {
        const urlList: string[] | undefined = await getUrlListFromUrl(config);

        if (urlList) {
            const overalPageUrls = await searchForUrlsFromAGivenUrlList(
                urlList,
                config
            );
            writeCash(overalPageUrls, config);
            return overalPageUrls;
        }
        return undefined;
    }
};

const searchForUrlsFromAGivenUrlList = async (
    urlList: string[],
    config: Config
): Promise<string[]> => {
    const overalPageUrls = urlList;
    overalPageUrls.push(config.url);
    let continueFlag = true;    
    progressBar.start(config.maxUrls, 0);
    while (continueFlag && overalPageUrls.length <= config.maxUrls) {
   
        for (const url of urlList) {
            const newConfig = { ...config, url };
            const urls2level = await getUrlListFromUrl(newConfig);
            if (urls2level) {
                for (const url2level of urls2level) {
                    if (!overalPageUrls.includes(url2level)) {
                        progressBar.update(overalPageUrls.length);
                        overalPageUrls.push(url2level);
                        if (overalPageUrls.length >= config.maxUrls) {
                            continueFlag = false;
                        }
                    }
                    if (!continueFlag) break;
                }
            }
            if (!continueFlag) break;
        }
    }
    progressBar.stop();
    return overalPageUrls;
};
const getUrlListFromUrl = async (
    config: Config
): Promise<string[] | undefined> => {
    try {
        const html: unknown = await fetchData(config.url, config.useTor);
        if (isString(html)) {
            const parseResult = parse(html);
            if (parseResult) {
                const links = await getPagesLinkes(parseResult, config);
                return links;
            }
        }
        return undefined;
    } catch (error) {
        console.log(error);
    }
};

const getPagesLinkes = async (parseResult: HTMLElement, config: Config) => {
    const aElements = await parseResult.querySelectorAll("a");
    const links = aElements
        .map((aElement) => {
            return aElement.rawAttributes.href;
        })
        .filter((link) => {
            if (isString(link)) {
                return (
                    extractDataFromText(link, /(?<=\/\/)(.*\n?)(?=\.)/) ===
                        extractDataFromText(
                            config.url,
                            /(?<=\/\/)(.*\n?)(?=\.)/
                        ) && isUrl(link)
                );
            }
        });
    return links;
};

export default getFullUrlList;

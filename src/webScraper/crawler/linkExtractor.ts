import { HTMLElement } from "node-html-parser";
import { extractDataFromText } from "../scraper/utils/regex";
import parse from "node-html-parser";
import { Config } from "../../types/config";
import { isString } from "../../types/typeGourds";
import { fetchData } from "../scraper/utils/fetcher";
import { readCash, writeCash } from "../shared/cash";

const getFullUrlList = async (
    config: Config
): Promise<string[] | undefined> => {
    const urlsFromCash = await readCash();
    if (urlsFromCash.length >= config.maxUrls) {
        return urlsFromCash.slice(0, config.maxUrls);
    } else {
        const urlList: string[] | undefined = await getUrlListFromUrl(config);
        if (urlList) {
            const overalPageUrls = await searchForUrlsFromAGivenUrlList(
                urlList,
                config
            );
            writeCash(overalPageUrls);
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
    while (continueFlag && overalPageUrls.length <= config.maxUrls) {
        for (const url of urlList) {
            console.log(overalPageUrls.length);
            const newConfig = { ...config, url };
            const urls2level = await getUrlListFromUrl(newConfig);
            if (urls2level) {
                for (const url2level of urls2level) {
                    if (!overalPageUrls.includes(url2level)) {
                        console.log("added!");
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
    return overalPageUrls;
};
const getUrlListFromUrl = async (
    config: Config
): Promise<string[] | undefined> => {
    try {
        const html: unknown = await fetchData(config.url, config.proxy);
        if (isString(html)) {
            const parseResult = parse(html);
            if (parseResult) {
                return await getPagesLinkes(parseResult, config);
            }
        }
        return undefined;
    } catch (error) {
        console.log(error);
    }
};

const getPagesLinkes = (parseResult: HTMLElement, config: Config) => {
    const aElements = parseResult.querySelectorAll("a");
    const links = aElements
        .map((aElement) => aElement.rawAttributes.href)
        .filter((link) => {
            if (isString(link)) {
                return (
                    extractDataFromText(link, /(?<=\/\/)(.*\n?)(?=.onion)/) ===
                    extractDataFromText(
                        config.url,
                        /(?<=\/\/)(.*\n?)(?=.onion)/
                    )
                );
            }
        });
    return links;
};

export default getFullUrlList;

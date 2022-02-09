import { pageScraper } from "./scraper/pageScraper";
import config from "../mockConfig";
import { Config } from "../types/config";
import { isPastes, isString } from "../types/typeGourds";
import { saveAll } from "./utils/db";
import { fetchData } from "./scraper/fetcher";
import parse from "node-html-parser";
import { getPagesLinkes } from "./crawler/linkExtractor";
import fs from "fs";
import path from "path";

export const scrape = async (config: Config) => {
    try {
        const overalPageUrls = await getUrlList(config);
        if (overalPageUrls) {
            const promises =[]
            let count = 1;
            for (const url of overalPageUrls) {
                console.clear();
                console.log("extracting data from pages...",count, "/", overalPageUrls.length);
                count++;

                const newConfig = { ...config, url };
                promises.push(pageScraper(newConfig))
                // if (isPastes(data)) {
                //     await saveAll(data);
                // }
            }
            const results = await Promise.all(promises)
            count = 1
            const savePromises = []
            for (const result of results) {
                console.clear();
                console.log("saving the results...",count, "/", overalPageUrls.length);
                count++;

                if (isPastes(result)) {
                    savePromises.push(saveAll(result))
                }
            }
            await Promise.all(savePromises)
 
            
        }
        console.log("finished");
    } catch (error) {
        console.log(error);
    }
};

const urlsInUrl = async (config: Config): Promise<string[] | undefined> => {
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

const getUrlList = async (config: Config): Promise<string[] | undefined> => {
    const urlsFromDb = JSON.parse(
        fs.readFileSync(path.join(__dirname, "./urls.json")).toString()
    );

    if (urlsFromDb.length >= config.maxUrls) {
        console.log("took urls from chash");
        return urlsFromDb.slice(0, config.maxUrls);
    } else {
        const urls: string[] | undefined = await urlsInUrl(config);
        if (urls) {
            const overalPageUrls = urls;
            overalPageUrls.push(config.url);
            let continueFlag = true;
            while (continueFlag && overalPageUrls.length <= config.maxUrls) {
                for (const url of urls) {
                    console.log(overalPageUrls.length);
                    const newConfig = { ...config, url };
                    const urls2level = await urlsInUrl(newConfig);
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

            fs.writeFile(
                path.join(__dirname, "./urls.json"),
                JSON.stringify(overalPageUrls),
                (err) => {
                    if (err) {
                        console.log(err);
                    }
                }
            ); //side effect!

            return overalPageUrls;
        }
        return undefined;
    }
};

setInterval(() => {
scrape(config);
}, 120000);

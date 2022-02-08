import { Config } from "../../types/config";
import { fetchData } from "./fetcher";
import {isPastes, isString} from "../../types/typeGourds";
import {parseHtmlToObject} from "./parser"
import { saveAll } from "./db";

const scraper = async (config: Config) => {
    const html: unknown = await fetchData(config.url, config.proxy);
    if (isString(html)) {
        return parseHtmlToObject(html, config);
    }
};

export const scrape = async (config: Config) => {
    try {
        console.log("starting scraper");
        const data = await scraper(config);
        console.log("saving data to db...");
        if (isPastes(data)) {
            await saveAll(data);
        }
    } catch (error) {
        console.log(error);
    }
};

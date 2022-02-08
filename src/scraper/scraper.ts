import { Config } from "../types/config";
import { fetchData } from "./utils/fetcher";
import {isString} from "../types/typeGourds";
import {parseHtmlToObject} from "./utils/parser"

export const scraper = async (config: Config) => {
    const html: unknown = await fetchData(config.url, config.proxy);
    if (isString(html)) {
        return parseHtmlToObject(html, config);
    }
};


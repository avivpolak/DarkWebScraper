import { Config } from "../../types/config";
import { fetchData } from "./fetcher";
import { isString} from "../../types/typeGourds";
import {parseHtmlToObject} from "./parser"


export const pageScraper = async (config: Config) => {
    const html: unknown = await fetchData(config.url, config.proxy);
    if (isString(html)) {
        return parseHtmlToObject(html, config);
    }
};

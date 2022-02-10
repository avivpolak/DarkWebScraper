import { Config } from "../../../types/config";
import { fetchData } from "./fetcher";
import { isString } from "../../../types/typeGourds";
import { parseHtmlToObject } from "./parser";

export const pageScraper = async (config: Config) => {
    try {
        const html: unknown = await fetchData(config.url, config.useTor);
        if (isString(html)) {
            const parsedHtml = await parseHtmlToObject(html, config);
            return parsedHtml;
        }
    } catch (error) {
        console.log(error)
    }
};

import { Config } from "../../types/config";
import { HTMLElement } from "node-html-parser";
import { isString } from "../../types/typeGourds";
import { extractDataFromText } from "../scraper/regex";

export const getPagesLinkes = (parseResult: HTMLElement,config:Config) => {
    const aElements = parseResult.querySelectorAll("a");
    const links = aElements
        .map((aElement) => aElement.rawAttributes.href)
        .filter((link) => {
            if (isString(link)) {
                return (
                    extractDataFromText(
                        link,
                        /(?<=\/\/)(.*\n?)(?=.onion)/
                    ) ===
                    extractDataFromText(
                        config.url,
                        /(?<=\/\/)(.*\n?)(?=.onion)/
                    )
                );
            }
        });
    return links;
};
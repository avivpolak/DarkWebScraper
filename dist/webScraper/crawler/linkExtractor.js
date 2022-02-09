"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagesLinkes = void 0;
const typeGourds_1 = require("../../types/typeGourds");
const regex_1 = require("../scraper/regex");
const getPagesLinkes = (parseResult, config) => {
    const aElements = parseResult.querySelectorAll("a");
    const links = aElements
        .map((aElement) => aElement.rawAttributes.href)
        .filter((link) => {
        if ((0, typeGourds_1.isString)(link)) {
            return ((0, regex_1.extractDataFromText)(link, /(?<=\/\/)(.*\n?)(?=.onion)/) ===
                (0, regex_1.extractDataFromText)(config.url, /(?<=\/\/)(.*\n?)(?=.onion)/));
        }
    });
    return links;
};
exports.getPagesLinkes = getPagesLinkes;

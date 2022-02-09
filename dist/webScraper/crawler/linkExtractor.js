"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const regex_1 = require("../scraper/utils/regex");
const node_html_parser_1 = __importDefault(require("node-html-parser"));
const typeGourds_1 = require("../../types/typeGourds");
const fetcher_1 = require("../scraper/utils/fetcher");
const cash_1 = require("../shared/cash");
const getFullUrlList = async (config) => {
    const urlsFromCash = await (0, cash_1.readCash)();
    if (urlsFromCash.length >= config.maxUrls) {
        return urlsFromCash.slice(0, config.maxUrls);
    }
    else {
        const urlList = await getUrlListFromUrl(config);
        if (urlList) {
            const overalPageUrls = await searchForUrlsFromAGivenUrlList(urlList, config);
            (0, cash_1.writeCash)(overalPageUrls);
            return overalPageUrls;
        }
        return undefined;
    }
};
const searchForUrlsFromAGivenUrlList = async (urlList, config) => {
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
                    if (!continueFlag)
                        break;
                }
            }
            if (!continueFlag)
                break;
        }
    }
    return overalPageUrls;
};
const getUrlListFromUrl = async (config) => {
    try {
        const html = await (0, fetcher_1.fetchData)(config.url, config.proxy);
        if ((0, typeGourds_1.isString)(html)) {
            const parseResult = (0, node_html_parser_1.default)(html);
            if (parseResult) {
                return await getPagesLinkes(parseResult, config);
            }
        }
        return undefined;
    }
    catch (error) {
        console.log(error);
    }
};
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
exports.default = getFullUrlList;

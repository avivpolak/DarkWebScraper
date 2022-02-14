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
const isUrl_1 = __importDefault(require("validator/lib/isUrl"));
const progressBar_1 = require("../shared/progressBar");
const progressBar = (0, progressBar_1.bar)('Collecting urls:              ');
const getFullUrlList = async (config) => {
    const urlsFromCash = await (0, cash_1.readCash)(config.name);
    if (urlsFromCash &&
        urlsFromCash.data.length >= config.maxUrls &&
        config.url === urlsFromCash.config.url) {
        console.log("Got the URLs from cashe.");
        return urlsFromCash.data.slice(0, config.maxUrls);
    }
    else {
        const urlList = await getUrlListFromUrl(config);
        if (urlList) {
            const overalPageUrls = await searchForUrlsFromAGivenUrlList(urlList, config);
            (0, cash_1.writeCash)(overalPageUrls, config);
            console.log("Wrote the URLs to cache.");
            return overalPageUrls;
        }
        return undefined;
    }
};
const searchForUrlsFromAGivenUrlList = async (urlList, config) => {
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
                    if (!continueFlag)
                        break;
                }
            }
            if (!continueFlag)
                break;
        }
    }
    progressBar.stop();
    return overalPageUrls;
};
const getUrlListFromUrl = async (config) => {
    try {
        const html = await (0, fetcher_1.fetchData)(config.url, config.useTor);
        if ((0, typeGourds_1.isString)(html)) {
            const parseResult = (0, node_html_parser_1.default)(html);
            if (parseResult) {
                const links = await getPagesLinkes(parseResult, config);
                return links;
            }
        }
        return undefined;
    }
    catch (error) {
        console.log(error);
    }
};
const getPagesLinkes = async (parseResult, config) => {
    const aElements = await parseResult.querySelectorAll("a");
    const links = aElements
        .map((aElement) => {
        return aElement.rawAttributes.href;
    })
        .filter((link) => {
        if ((0, typeGourds_1.isString)(link)) {
            return ((0, regex_1.extractDataFromText)(link, /(?<=\/\/)(.*\n?)(?=\.)/) ===
                (0, regex_1.extractDataFromText)(config.url, /(?<=\/\/)(.*\n?)(?=\.)/) && (0, isUrl_1.default)(link));
        }
    });
    return links;
};
exports.default = getFullUrlList;
//# sourceMappingURL=linkExtractor.js.map
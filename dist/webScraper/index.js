"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrape = void 0;
const pageScraper_1 = require("./scraper/pageScraper");
const mockConfig_1 = __importDefault(require("../mockConfig"));
const typeGourds_1 = require("../types/typeGourds");
const db_1 = require("./utils/db");
const fetcher_1 = require("./scraper/fetcher");
const node_html_parser_1 = __importDefault(require("node-html-parser"));
const linkExtractor_1 = require("./crawler/linkExtractor");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const scrape = async (config) => {
    try {
        const overalPageUrls = await getUrlList(config);
        if (overalPageUrls) {
            const promises = [];
            let count = 1;
            for (const url of overalPageUrls) {
                console.clear();
                console.log("extracting data from pages...", count, "/", overalPageUrls.length);
                count++;
                const newConfig = { ...config, url };
                promises.push((0, pageScraper_1.pageScraper)(newConfig));
                // if (isPastes(data)) {
                //     await saveAll(data);
                // }
            }
            const results = await Promise.all(promises);
            count = 1;
            const savePromises = [];
            for (const result of results) {
                console.clear();
                console.log("saving the results...", count, "/", overalPageUrls.length);
                count++;
                if ((0, typeGourds_1.isPastes)(result)) {
                    savePromises.push((0, db_1.saveAll)(result));
                }
            }
            await Promise.all(savePromises);
        }
        console.log("finished");
    }
    catch (error) {
        console.log(error);
    }
};
exports.scrape = scrape;
const urlsInUrl = async (config) => {
    try {
        const html = await (0, fetcher_1.fetchData)(config.url, config.proxy);
        if ((0, typeGourds_1.isString)(html)) {
            const parseResult = (0, node_html_parser_1.default)(html);
            if (parseResult) {
                return await (0, linkExtractor_1.getPagesLinkes)(parseResult, config);
            }
        }
        return undefined;
    }
    catch (error) {
        console.log(error);
    }
};
const getUrlList = async (config) => {
    const urlsFromDb = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, "./urls.json")).toString());
    if (urlsFromDb.length >= config.maxUrls) {
        console.log("took urls from chash");
        return urlsFromDb.slice(0, config.maxUrls);
    }
    else {
        const urls = await urlsInUrl(config);
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
                            if (!continueFlag)
                                break;
                        }
                    }
                    if (!continueFlag)
                        break;
                }
            }
            fs_1.default.writeFile(path_1.default.join(__dirname, "./urls.json"), JSON.stringify(overalPageUrls), (err) => {
                if (err) {
                    console.log(err);
                }
            }); //side effect!
            return overalPageUrls;
        }
        return undefined;
    }
};
setInterval(() => {
    (0, exports.scrape)(mockConfig_1.default);
}, 120000);

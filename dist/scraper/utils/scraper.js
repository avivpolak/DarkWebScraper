"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrape = void 0;
const fetcher_1 = require("./fetcher");
const typeGourds_1 = require("../../types/typeGourds");
const parser_1 = require("./parser");
const db_1 = require("./db");
const scraper = async (config) => {
    const html = await (0, fetcher_1.fetchData)(config.url, config.proxy);
    if ((0, typeGourds_1.isString)(html)) {
        return (0, parser_1.parseHtmlToObject)(html, config);
    }
};
const scrape = async (config) => {
    try {
        console.log("starting scraper");
        const data = await scraper(config);
        console.log("saving data to db...");
        if ((0, typeGourds_1.isPastes)(data)) {
            await (0, db_1.saveAll)(data);
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.scrape = scrape;

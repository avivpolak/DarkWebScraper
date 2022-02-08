"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scraper = void 0;
const fetcher_1 = require("./utils/fetcher");
const typeGourds_1 = require("../types/typeGourds");
const parser_1 = require("./utils/parser");
const scraper = async (config) => {
    const html = await (0, fetcher_1.fetchData)(config.url, config.proxy);
    if ((0, typeGourds_1.isString)(html)) {
        return (0, parser_1.parseHtmlToObject)(html, config);
    }
};
exports.scraper = scraper;

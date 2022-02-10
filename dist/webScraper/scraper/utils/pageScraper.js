"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageScraper = void 0;
const fetcher_1 = require("./fetcher");
const typeGourds_1 = require("../../../types/typeGourds");
const parser_1 = require("./parser");
const pageScraper = async (config) => {
    try {
        const html = await (0, fetcher_1.fetchData)(config.url, config.useTor);
        if ((0, typeGourds_1.isString)(html)) {
            const parsedHtml = await (0, parser_1.parseHtmlToObject)(html, config);
            return parsedHtml;
        }
    }
    catch (error) {
        console.log(error);
    }
};
exports.pageScraper = pageScraper;
//# sourceMappingURL=pageScraper.js.map
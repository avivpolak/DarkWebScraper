"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.custumScrape = void 0;
const typeGourds_1 = require("../../types/typeGourds");
const linkExtractor_1 = __importDefault(require("../crawler/linkExtractor"));
const db_1 = require("../shared/db");
const paralelWork_1 = require("../shared/paralelWork");
const pageScraper_1 = require("./utils/pageScraper");
const scrape = async (config) => {
    try {
        const fullUrlList = await (0, linkExtractor_1.default)(config);
        if (fullUrlList) {
            const [pastes, pastesProgressBar] = await (0, paralelWork_1.doInParalel)(fullUrlList, pageScraper_1.pageScraper, typeGourds_1.isString, "extracting data from pages...", config);
            pastesProgressBar.stop();
            const [saves, savesProgressBar] = await (0, paralelWork_1.doInParalel)(pastes, db_1.saveAll, typeGourds_1.isPastes, "");
            savesProgressBar.stop();
        }
        console.log("finish scraping");
    }
    catch (error) {
        console.log(error);
    }
};
const custumScrape = async (config) => {
    try {
        const fullUrlList = await (0, linkExtractor_1.default)(config);
        if (fullUrlList) {
            const pastes = await (0, paralelWork_1.doInParalel)(fullUrlList, pageScraper_1.pageScraper, typeGourds_1.isString, "extracting data from pages...", config);
            const nonDuplicatedPastes = [];
            for (let urlPastes of pastes) {
                if (urlPastes) {
                    for (let paste of urlPastes) {
                        if (!nonDuplicatedPastes.includes(paste)) {
                            nonDuplicatedPastes.push(paste);
                        }
                    }
                }
            }
            return nonDuplicatedPastes;
        }
        console.log("finished");
    }
    catch (error) {
        console.log(error);
    }
};
exports.custumScrape = custumScrape;
exports.default = scrape;
//# sourceMappingURL=scraper.js.map
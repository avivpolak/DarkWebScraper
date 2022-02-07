"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scraper_1 = require("./utils/scraper");
const db_1 = require("./utils/db");
const mockConfig_1 = __importDefault(require("../mockConfig"));
const scrape = async (config) => {
    try {
        console.log("starting scraper");
        const data = await (0, scraper_1.scraper)(config);
        console.log("scraper finished!");
        console.log("saving data to db...");
        (0, db_1.saveToDb)(data);
        console.log("saved!");
    }
    catch (error) {
        console.log(error);
    }
};
setInterval(() => {
    scrape(mockConfig_1.default);
}, 12000);

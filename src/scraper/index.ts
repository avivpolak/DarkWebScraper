import { Config } from "../types/config";
import { scraper } from "./utils/scraper";
import { saveToDb, readFromDb } from "./utils/db";
import config from "../mockConfig";

const scrape = async (config: Config) => {
    try {
        console.log("starting scraper");
        const data = await scraper(config);
        console.log("saving data to db...");
        saveToDb(data);
        console.log("saved!");
    } catch (error) {
        console.log(error);
    }
};

setInterval(() => {
    scrape(config);
}, 12000);

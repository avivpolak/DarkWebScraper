import config from "../mockConfig";
import scrape from "./scraper/scraper";
// import { readConfig } from "./shared/configReader";

// console.log(readConfig("../../config.yaml"),config)
// readConfig("../../config.yaml")
// setInterval(() => {
scrape(config);
// }, 120000);

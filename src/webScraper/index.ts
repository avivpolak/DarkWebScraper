import Pastebin from "../configs/sites/Pastebin";
import scratchbook from "../configs/sites/scratchbook";
import Stronghold from "../configs/sites/Stronghold";
import scrape from "./scraper/scraper";
// import { readConfig } from "./shared/configReader";

// console.log(readConfig("../../config.yaml"),config)
// readConfig("../../config.yaml")
// setInterval(() => {
scrape(Pastebin);
// }, 120000);

// import {getLabels} from "../analyzer/labels";
// getLabels()
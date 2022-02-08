import { scrape} from "./utils/scraper";
import config from "../mockConfig";

setInterval(() => {
    scrape(config);
}, 120000);

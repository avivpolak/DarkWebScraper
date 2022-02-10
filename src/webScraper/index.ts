import { isConfig } from "../types/typeGourds";
import scrape from "./scraper/scraper";
import { readConfig } from "./shared/configReader";
import fs from "fs";
import path from "path";


const run = async () => {
    // const configYamls = fs.readdirSync(path.join(__dirname, "../../configs/sites"));
    // for (const configYaml of configYamls) {
        // const config = await readConfig(`../../../configs/sites/${configYaml}`);
        const config = await readConfig(`../../../configs/sites/pastebin.yaml`);
        if (config && isConfig(config)) {
            scrape(config);
        }
    // }
};
run();

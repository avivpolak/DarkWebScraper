import { isConfig, isGeneralConfig } from "../types/typeGourds";
import scrape from "./scraper/scraper";
import { readConfig } from "./shared/configReader";
import fs from "fs";
import path from "path";


const ScrapeEveryYamlInConfig = async () => {
    // const configYamls = fs.readdirSync(path.join(__dirname, "../../configs/sites"));
    // for (const configYaml of configYamls) {
    //     const config = await readConfig(`../../../configs/sites/${configYaml}`);
        const config = await readConfig(`../../../configs/sites/stronghold.yaml`);
        if (config && isConfig(config)) {
          await scrape(config);
        }
    // }
};

ScrapeEveryYamlInConfig();//because set time out start with waiting 
setInterval(ScrapeEveryYamlInConfig,100000)
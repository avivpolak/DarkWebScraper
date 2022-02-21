import { Config } from "../../types/config";
import { isPastes, isString } from "../../types/typeGourds";
import getFullUrlList from "../crawler/linkExtractor";
import { saveAll } from "../shared/db";
import { doInParalel } from "../shared/paralelWork";
import { pageScraper } from "./utils/pageScraper";

const scrape = async (config: Config) => {
    try {
        console.log(`Started scraping "${config.name}"`);
        const fullUrlList = await getFullUrlList(config);
        if (fullUrlList) {
            const [pastes, pastesProgressBar] = await doInParalel(
                fullUrlList,
                pageScraper,
                isString,
                "Extracting data from pages   ",
                config
            );
            pastesProgressBar.stop();
            const [saves, savesProgressBar] = await doInParalel(
                pastes,
                saveAll,
                isPastes,
                ""
            );
            savesProgressBar.stop();
        }
        console.log(`Finish scraping ${config.name}`);
    } catch (error) {
        console.log(error);
    }
};

export const custumScrape = async (config: Config) => {
    try {
        const fullUrlList = await getFullUrlList(config);
   
        if (fullUrlList) {
            const pastes = await doInParalel(
                fullUrlList,
                pageScraper,
                isString,
                "extracting data from pages...",
                config
            );
  

            let nonDuplicatedPastes: any = [];
            for (let urlPastes of pastes) {
                if (urlPastes && urlPastes.length > 0) {
                    for (let paste of urlPastes) {
                        nonDuplicatedPastes = nonDuplicatedPastes.concat(paste);
                    }
                }
            }
            nonDuplicatedPastes = nonDuplicatedPastes.filter(
                (item: any) => item
            );

            return [...new Set(nonDuplicatedPastes)];
        }
        console.log("finished");
    } catch (error) {
        console.log(error);
    }
};

export default scrape;

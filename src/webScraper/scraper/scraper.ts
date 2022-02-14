import { Config } from "../../types/config";
import { isPastes, isString } from "../../types/typeGourds";
import getFullUrlList from "../crawler/linkExtractor";
import { saveAll } from "../shared/db";
import { doInParalel } from "../shared/paralelWork";
import { pageScraper } from "./utils/pageScraper";

const scrape = async (config: Config) => {
    try {
        const fullUrlList = await getFullUrlList(config);
        if (fullUrlList) {
            const [pastes,pastesProgressBar] = await doInParalel(
                fullUrlList,
                pageScraper,
                isString,
                "extracting data from pages...",
                config
            );
            pastesProgressBar.stop()
            const [saves,savesProgressBar]= await doInParalel(
                pastes,
                saveAll,
                isPastes,
                ""
            );
            savesProgressBar.stop()
        }
        console.log("finish scraping")
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
            const nonDuplicatedPastes: any = [];
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
    } catch (error) {
        console.log(error);
    }
};

export default scrape;

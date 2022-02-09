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
            const pastes = await doInParalel(
                fullUrlList,
                pageScraper,
                isString,
                "extracting data from pages...",
                config
            );
            await doInParalel(
                pastes,
                saveAll,
                isPastes,
                "saving the results..."
            );
        }
        console.log("finished");
    } catch (error) {
        console.log(error);
    }
};


export default scrape
import { ServerError } from "../../errors/types";
import { custumScrape } from "../../webScraper/scraper/scraper";
import {
    convertStandartConfigToReqConfig,
    convertToStandartConfig,
    getAllConfigs,
} from "../helpers/config";

export const getCustumScrape = async (req: any, res: any) => {
    try {
        const rowConfig: any = {};
        for (let [key, value] of Object.entries(req.body)) {
            if (!key.includes("REGEX")) {
                rowConfig[req.sanitize(key)] = req.sanitize(value);
            } else {
                rowConfig[req.sanitize(key)] = value;
            }
        }
        const config = convertToStandartConfig(rowConfig);
        const allPastes = await custumScrape(config);
        if (allPastes && allPastes.length > 0) {
            return res.status(200).json({ data: allPastes });
        } else {
            return res.status(204).send("No posts found");
        }
    } catch (error: any) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};
export const getConfigs = async (req: any, res: any) => {
    try {
        const configs = await getAllConfigs();
        if (configs) {
            const reqConfigs = [];
            for (let config of configs) {
                reqConfigs.push(convertStandartConfigToReqConfig(config));
            }
            if (reqConfigs.length > 0) {
                return res.status(200).json(reqConfigs);
            }
        } else {
            return res.status(204).send("No posts found");
        }
    } catch (error: any) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};

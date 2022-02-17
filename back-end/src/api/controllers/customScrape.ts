import { Request, Response } from "express";
import {
    getAllPastesFromDb,
    getPastesByQueryFromDb,
    deleteAllPastesFromDb,
    getLabelsStatisticsFromDb,
} from "../../prisma/utils/paste/actions";
import { custumScrape } from "../../webScraper/scraper/scraper";
import { convertToStandartConfig } from "../helpers/utils";

export const getCustumScrape = async (req: Request, res: Response) => {
    try {
        const config = convertToStandartConfig(req.body)

        const allPastes = await custumScrape(config);

        if (allPastes&& allPastes.length>0) {
            return res.status(200).json({data:allPastes});
        } else {
            console.log(allPastes)
            return res.status(404).send("No posts found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};

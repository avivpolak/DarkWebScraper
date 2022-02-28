import { Request, Response } from "express";
import {
    getPagesPastesFromDb,
    getPastesByQueryFromDb,
    deleteAllPastesFromDb,
    getLabelsStatisticsFromDb,
    countAllItems,
} from "../../prisma/utils/paste/actions";
import { ServerError } from "../../errors/types";

export const getPagesPastes = async (req: any, res: any) => {
    try {
        const page: number = Number(req.sanitize(req.query.page)) || 0;
        const pasetsPerPage: number =
            Number(req.sanitize(req.query.pasetsPerPage)) || 10;
        if (pasetsPerPage > 200)
            return res.status(403).send('"Pasets per page" is too large'); //against data thieth
        const pagesPastes = await getPagesPastesFromDb(page, pasetsPerPage);
        if (pagesPastes) {
            return res.status(200).json(pagesPastes);
        } else {
            return res.status(204).send("No posts found");
        }
    } catch (error: any) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};

export const deleteAllPastes = async (req: Request, res: Response) => {
    try {
        await deleteAllPastesFromDb();
        return res.status(204).send("deleted");
    } catch (error: any) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};
export const getCount = async (req: Request, res: Response) => {
    try {
        const count = await countAllItems();
        return res.status(200).json(count);
    } catch (error: any) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};

export const getLabelsStatistics = async (req: Request, res: Response) => {
    try {
        const statistics = await getLabelsStatisticsFromDb();
        console.log(statistics)
        if (statistics) {
            return res.status(200).json({ data: statistics });
        } else {
            return res.status(204).send("No posts found");
        }
    } catch (error: any) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};
export const getPastesByQuery = async (req: any, res: any) => {
    try {
        const query = req.sanitize(req.params.query);
        const pastes = await getPastesByQueryFromDb(query);
        if (pastes.length > 0) {
            return res.status(200).json({ data: pastes });
        } else {
            return res.status(204).send("No posts found");
        }
    } catch (error: any) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};

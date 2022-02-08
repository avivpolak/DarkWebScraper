import { Request, Response } from "express";
import {
    getAllPastesFromDb,
    getPastesByQueryFromDb,
    deleteAllPastesFromDb,
} from "../../prisma/utils/actions";

export const getAllPastes = async (req: Request, res: Response) => {
    try {
        const allPastes = await getAllPastesFromDb();
        if (allPastes) {
            return res.status(200).send(allPastes);
        } else {
            return res.status(404).send("No posts found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};

export const deleteAllPastes = async (req: Request, res: Response) => {
    try {
        await deleteAllPastesFromDb();
        return res.status(404).send("deleted");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};

export const getPastesByQuery = async (req: Request, res: Response) => {
    try {
        const { query } = req.params;
        const pastes = await getPastesByQueryFromDb(query);
        if (pastes.length > 0) {
            return res.status(200).send(pastes);
        } else {
            return res.status(404).send("No posts found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};

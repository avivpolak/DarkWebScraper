import config from "../mockConfig"; //currently there is problrm with getting the regex as regex from yaml
import { Request, Response } from "express";
import { scraper } from "../scraper/utils/scraper";
import { readFromDb } from "../scraper/utils/db";

export const getAnalyzedPosts = async (req: Request, res: Response) => {
    try {
        const analyzedPosts = await readFromDb()
        
        if (analyzedPosts) {
            return res.status(200).send(analyzedPosts);
        }
        else{
            return res.status(404).send("No posts found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};



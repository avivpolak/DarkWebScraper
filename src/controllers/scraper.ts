import { fetchData } from "../utils/fetch";
import analyzePosts from "../utils/analyzePosts";
import config from "../mockConfig"; //currently there is problrm with getting the regex as regex from yaml
import { Request, Response } from "express";
import {  parse } from "node-html-parser";



const scraper = async (req: Request, res: Response) => {
    try {
        const data: unknown = await fetchData(config.url, config.proxy);
        if (typeof data === "string") {
            const parseResult= parse(data);
            if (parseResult) {
                const posts = parseResult.querySelectorAll(
                    config.allPosts.selector
                );
                const analyzedPosts = analyzePosts(posts, config.params);
                if (analyzedPosts.length > 0) {
                    res.json(analyzedPosts);
                } else {
                    res.status(404).send("No posts found");
                }
            } else {
                res.status(404).send("No posts found");
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};

export default scraper;

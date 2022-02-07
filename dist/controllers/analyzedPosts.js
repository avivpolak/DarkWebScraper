"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalyzedPosts = void 0;
const db_1 = require("../scraper/utils/db");
const getAnalyzedPosts = async (req, res) => {
    try {
        const analyzedPosts = await (0, db_1.readFromDb)();
        if (analyzedPosts) {
            return res.status(200).send(analyzedPosts);
        }
        else {
            return res.status(404).send("No posts found");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};
exports.getAnalyzedPosts = getAnalyzedPosts;

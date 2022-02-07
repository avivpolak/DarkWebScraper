"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mockConfig_1 = __importDefault(require("../mockConfig")); //currently there is problrm with getting the regex as regex from yaml
const scraper_1 = require("../utils/scraper");
const getAnalyzedPosts = async (req, res) => {
    try {
        const analyzedPosts = await (0, scraper_1.scraper)(mockConfig_1.default);
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
exports.default = getAnalyzedPosts;

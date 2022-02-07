"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_1 = require("../utils/fetch");
const analyzePosts_1 = __importDefault(require("../utils/analyzePosts"));
const mockConfig_1 = __importDefault(require("../mockConfig")); //currently there is problrm with getting the regex as regex from yaml
const node_html_parser_1 = require("node-html-parser");
const scraper = async (req, res) => {
    try {
        const data = await (0, fetch_1.fetchData)(mockConfig_1.default.url, mockConfig_1.default.proxy);
        if (typeof data === "string") {
            const parseResult = (0, node_html_parser_1.parse)(data);
            if (parseResult) {
                const posts = parseResult.querySelectorAll(mockConfig_1.default.allPosts.selector);
                const analyzedPosts = (0, analyzePosts_1.default)(posts, mockConfig_1.default.params);
                if (analyzedPosts.length > 0) {
                    res.json(analyzedPosts);
                }
                else {
                    res.status(404).send("No posts found");
                }
            }
            else {
                res.status(404).send("No posts found");
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};
exports.default = scraper;

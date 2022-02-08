"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scraper = void 0;
const node_html_parser_1 = __importDefault(require("node-html-parser"));
const analyzePosts_1 = __importDefault(require("./analyzePosts"));
const fetch_1 = require("./fetch");
// import {isString} from "../../types/typeGourds"
const scraper = async (config) => {
    const html = await (0, fetch_1.fetchData)(config.url, config.proxy);
    if (isString(html)) {
        return parseHtmlToObject(html, config);
    }
};
exports.scraper = scraper;
const parseHtmlToObject = (html, config) => {
    const parseResult = (0, node_html_parser_1.default)(html);
    if (parseResult) {
        const posts = parseResult.querySelectorAll(config.allPosts.selector);
        const analyzedPosts = (0, analyzePosts_1.default)(posts, config.params);
        if (analyzedPosts.length > 0) {
            return analyzedPosts;
        }
        else {
            return undefined;
        }
    }
    else {
        return undefined;
    }
};

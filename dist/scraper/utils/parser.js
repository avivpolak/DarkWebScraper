"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseHtmlToObject = void 0;
const node_html_parser_1 = __importDefault(require("node-html-parser"));
const regex_1 = require("./regex");
const parseHtmlToObject = (html, config) => {
    const parseResult = (0, node_html_parser_1.default)(html);
    if (parseResult) {
        const posts = parseResult.querySelectorAll(config.allPosts.selector);
        const analyzedPosts = getPastesFromHtml(posts, config.params);
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
exports.parseHtmlToObject = parseHtmlToObject;
const getPastesFromHtml = (pasPastes, params) => {
    const analyzedPastes = [];
    for (let Paste of pasPastes) {
        try {
            const analyzedPaste = getPasteFromHtml(Paste, params);
            if (analyzedPaste && Object.keys(analyzedPaste).length > 0) {
                analyzedPastes.push(analyzedPaste);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return analyzedPastes;
};
const getPasteFromHtml = (Paste, params) => {
    try {
        const analyzedPaste = {};
        for (let param in params) {
            const htmlElement = Paste.querySelector(params[param].selector);
            if (htmlElement) {
                const htmlText = htmlElement.textContent;
                if (htmlText) {
                    const Paste = (0, regex_1.extractDataFromText)(htmlText.trim(), params[param].regex);
                    if (Paste) {
                        analyzedPaste[param] = Paste;
                    }
                }
            }
        }
        return analyzedPaste;
    }
    catch (error) {
        if (typeof error === "string") {
            throw new Error(error);
        }
    }
};

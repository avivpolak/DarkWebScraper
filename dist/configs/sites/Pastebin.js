"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    name: "Pastebin",
    url: "https://pastebin.pl/view/db44ef75",
    useTor: false,
    maxUrls: 10,
    allPosts: { selector: "div.container:nth-child(2)" },
    params: {
        title: { selector: ".pagetitle", regex: new RegExp("") },
        content: { selector: "ol", regex: new RegExp("") },
        author: { selector: "div.detail:nth-child(3) > b:nth-child(1)", regex: new RegExp("") },
        date: {
            selector: "div.detail:nth-child(3)",
            regex: new RegExp(""),
        },
    },
};
exports.default = config;
//# sourceMappingURL=Pastebin.js.map
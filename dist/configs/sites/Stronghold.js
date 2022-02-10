"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    name: "Stronghold",
    url: "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all",
    useTor: true,
    maxUrls: 50,
    allPosts: { selector: ".col-sm-12" },
    params: {
        title: { selector: "h4", regex: new RegExp("") },
        content: { selector: "ol", regex: new RegExp("") },
        author: { selector: ".col-sm-6", regex: /(?<=(\\w+\\s){2})(\\w+)/ },
        date: {
            selector: ".col-sm-6",
            regex: /\\d+\\s[a-zA-Z]+\\s\\d+,\\s\\d+:\\d+:\\d+\\s[a-zA-Z]+/,
        },
    },
};
exports.default = config;
//# sourceMappingURL=Stronghold.js.map
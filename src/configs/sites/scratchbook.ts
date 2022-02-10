import { Config } from "../../types/config";

const config: Config = {
    name:"Scratchbook",
    url: "https://paste.scratchbook.ch",
    useTor: false,
    maxUrls: 20,
    allPosts: { selector: "body" },
    params: {
        title: { selector: ".pagetitle", regex: new RegExp("") },
        content: { selector: "ol", regex: new RegExp("") },
        author: { selector: ".detail .by", regex: new RegExp("") },
        date: {
            selector: ".detail .by",
            regex: new RegExp(""),
        },
    },
};
export default config;

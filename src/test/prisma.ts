import { saveToDb } from "../prisma/utils/paste/actions";


const examplePaste = {
    title: "Best Oasdnion Child Porn asdasda❤️",
    content:
        "http://cpsasdexxklpu7kgwu4h4noa6ewlwinszoo6gw463elubo4y2lc3u6nfnyd.onion/",
    date: "08 Feb 2asd022, 20:02:29 UTC",
    author: "Anonymoasdus",
    santimate: 10,
};
console.log("testing save")
saveToDb(examplePaste)
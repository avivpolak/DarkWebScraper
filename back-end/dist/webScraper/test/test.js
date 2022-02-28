"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("../scraper/utils/parser");
const mockHtml = '<!DOCTYPE html>   <html lang="en">   <head> <meta charset="UTF-8" />    <meta http-equiv="X-UA-Compatible" content="IE=edge" />  <meta name="viewport" content="width=device-width, initial-scale=1.0" />  <title>Document</title>  </head> <body>   <div class="npmo">    <div class="npm">   <div class="title">title1</div>   <div class="content">content1</div>    </div>  <div class="npm"> <div class="title">title2</div>   <div class="content">content2</div>  </div>   <div class="npm"> <div class="title">title3</div>   <div class="content">content3</div>  </div> <div class="npm"><div class="title">title4</div> <div class="content">content4</div></div> </div></body></html>';
const mockConig = {
    name: "stronghold",
    url: "https://stronghold.co/",
    useTor: true,
    allPosts: {
        selector: ".npm",
    },
    maxUrls: 10,
    params: {
        title: {
            selector: ".title",
            regex: /(?:)/,
        },
        content: {
            selector: ".content",
            regex: /(?:)/,
        },
    },
};
const test = async () => {
    const result = await (0, parser_1.parseHtmlToObject)(mockHtml, mockConig);
    console.log(result);
};
test();
//# sourceMappingURL=test.js.map
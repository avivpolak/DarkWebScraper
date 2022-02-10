"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSentimentFromText = void 0;
const natural_1 = require("natural");
const fetcher_1 = require("../webScraper/scraper/utils/fetcher");
const tokenizer = new natural_1.WordTokenizer();
const analyzer = new natural_1.SentimentAnalyzer('English', natural_1.PorterStemmer, 'afinn');
const getSentimentFromText = (text) => {
    return analyzer.getSentiment(tokenizer.tokenize(text));
};
exports.getSentimentFromText = getSentimentFromText;
const getLabels = async (text) => {
    const token = tokenizer.tokenize(text);
    for (let word of token) {
        try {
            const res = await (0, fetcher_1.fetchData)(`https://wordsapiv1.p.mashape.com/words/${word}`, false);
            console.log(res);
        }
        catch (error) {
        }
    }
};
//# sourceMappingURL=sentimentor.js.map
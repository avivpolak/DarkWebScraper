"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sentimentor = void 0;
const natural_1 = require("natural");
const tokenizer = new natural_1.WordTokenizer();
const analyzer = new natural_1.SentimentAnalyzer('English', natural_1.PorterStemmer, 'afinn');
const sentimentor = (text) => {
    return analyzer.getSentiment(tokenizer.tokenize(text));
};
exports.sentimentor = sentimentor;

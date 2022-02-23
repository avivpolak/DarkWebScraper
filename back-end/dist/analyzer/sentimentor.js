"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSentimentFromText = void 0;
const language_1 = __importDefault(require("@google-cloud/language"));
const client = new language_1.default.LanguageServiceClient();
const getSentimentFromText = async (text) => {
    try {
        const type = "PLAIN_TEXT";
        const document = {
            content: text,
            type: type,
        };
        const res = await client.analyzeSentiment({ document: document });
        if (res) {
            const sentement = res[0].documentSentiment;
            if (sentement && sentement.score) {
                return sentement?.score;
            }
        }
        return undefined;
    }
    catch (error) {
        const err = { message: "google cloud error", code: "SERVER_ERROR" };
        throw err;
    }
};
exports.getSentimentFromText = getSentimentFromText;
//# sourceMappingURL=sentimentor.js.map
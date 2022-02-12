"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLabelsFromText = void 0;
const language_1 = __importDefault(require("@google-cloud/language"));
const client = new language_1.default.LanguageServiceClient();
const getLabelsFromText = async (text) => {
    try {
        console.log("analyizing");
        const type = "PLAIN_TEXT";
        const document = {
            content: text,
            type: type,
        };
        const res = await client.classifyText({ document: document });
        if (res) {
            if (res[0]) {
                if (res[0].categories) {
                    if (res[0].categories[0]) {
                        if (res[0].categories[0].name) {
                            console.log(res[0].categories[0].name);
                            return res[0].categories[0].name
                                .split("/")
                                .filter((category) => !!category);
                        }
                    }
                }
            }
        }
    }
    catch (error) {
        console.log(error);
        return undefined;
    }
};
exports.getLabelsFromText = getLabelsFromText;
//# sourceMappingURL=labels.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractDataFromText = void 0;
const extractDataFromText = (text, regex) => {
    try {
        if (!regex || !text)
            return text;
        const match = text.match(regex);
        return (match && match.length > 0 && match[0]) ? match[0].trim() : text;
    }
    catch {
        const err = { message: "regex error", code: "SERVER_ERROR" };
        throw err;
    }
};
exports.extractDataFromText = extractDataFromText;
//# sourceMappingURL=regex.js.map
import { ServerError } from "../../../errors/types";

export const extractDataFromText = (
    text: string,
    regex: RegExp
): string | undefined => {
    try {
        if (!regex || !text) return text;
        const match = text.match(regex);
        return  (match && match.length > 0 && match[0]) ? match[0].trim():text
    } catch{
        const err: ServerError = { message: "regex error", code: "SERVER_ERROR" };
        throw err;
    }
};

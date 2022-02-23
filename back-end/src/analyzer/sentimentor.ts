import language from "@google-cloud/language";
import { ServerError } from "../errors/types";
import { Plain } from "../types/google";
const client = new language.LanguageServiceClient();

export const getSentimentFromText = async (
    text: string
): Promise<number | undefined> => {
    try {
        const type: Plain = "PLAIN_TEXT";
        const document = {
            content: text,
            type: type,
        };
        const res = await client.analyzeSentiment({ document: document });
        if (res) {
            const sentement = res[0].documentSentiment;
            if(sentement && sentement.score){
                 return sentement?.score
            }
        }
        return undefined;
    } catch (error: any) {
        const err: ServerError = { message: "google cloud error", code: "SERVER_ERROR" };
        throw err;
    }
};

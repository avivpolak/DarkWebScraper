import language from "@google-cloud/language";
import { ServerError } from "../errors/types";
import { Plain } from "../types/google";
const client = new language.LanguageServiceClient();


export const getLabelsFromText = async (text:string):Promise<string[] | undefined>=> {
    try {
        const type: Plain = "PLAIN_TEXT";
        const  document = {
            content: text,
            type: type,
        };
        
        const res = await client.classifyText({ document: document });
        if (res) {
            if (res[0]) {
                if (res[0].categories) {
                    if (res[0].categories[0]) {
                        if (res[0].categories[0].name) {
                            return res[0].categories[0].name
                                .split("/")
                                .filter((category) => !!category);
                        }
                    }
                }
            }
        }
    } catch (error: any) {
        const err: ServerError = { message: "google cloud error", code: "SERVER_ERROR" };
        throw err;
    }
};

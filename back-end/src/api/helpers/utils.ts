import { Config, ReqConfig } from "../../types/config";
import { ServerError } from "../../errors/types";
import { writeConfig } from "../../webScraper/shared/configReader";

export const convertToStandartConfig = (reqConfig: ReqConfig): Config => {
    try {
        const config: Config = {
            name: reqConfig.name,
            url: reqConfig.url,
            useTor: Boolean(reqConfig.useTor),
            maxUrls: Number(reqConfig.maxUrls),
            allPosts: {
                selector: reqConfig.allPostsSelector,
            },
            params: {
                [reqConfig.param1Name]: {
                    selector: reqConfig.param1Selector,
                    regex: new RegExp(reqConfig.param1REGEX),
                },
                [reqConfig.param2Name]: {
                    selector: reqConfig.param2Selector,
                    regex: new RegExp(reqConfig.param2REGEX),
                },
                [reqConfig.param3Name]: {
                    selector: reqConfig.param3Selector,
                    regex: new RegExp(reqConfig.param3REGEX),
                },
                [reqConfig.param4Name]: {
                    selector: reqConfig.param4Selector,
                    regex: new RegExp(reqConfig.param4REGEX),
                },
            },
        };
        if (Boolean(reqConfig.save)) {
            writeConfig(config, "../../../configs/sites");
        }
        return config;
    } catch (error: any) {
        const err: ServerError = { message: "config convert error", code: "SERVER_ERROR" };
        throw err;
    }
};

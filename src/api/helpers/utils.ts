import { Config, ReqConfig } from "../../types/config";

export const convertToStandartConfig = (reqConfig: ReqConfig):Config => {
    const config: Config = {
        name: reqConfig.name,
        url: reqConfig.url,
        useTor: reqConfig.useTor,
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
    return config
};

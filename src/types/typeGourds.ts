import { Config } from "./config";
import { Paste, Pastes } from "./pastes";
import { Website } from "./website";

export const isString = (str: unknown): str is string => {
    return typeof str === "string";
};

export const isConfig = (config: any): config is Config => {
    return config.url && config.proxy && config.allPosts && config.params;
};

export const isPastes = (pastes: unknown): pastes is Pastes => {
    return typeof pastes === "object";
};

export const isPaste = (paste: unknown): paste is Paste => {
    return typeof paste === "object";
};
export const isWebsite = (data: Website): data is Website => {
    const { enrtyUrl, urls } = data;
    return (
        isString(urls) &&
        urls.length < 2703 &&
        isString(enrtyUrl)
    );
};

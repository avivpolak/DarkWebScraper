import { Config } from "./config";
import { Paste, Pastes } from "./pastes";

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

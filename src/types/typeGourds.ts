import { Config } from "./config";

export const isString = (str: unknown): str is string => {
    return (typeof str === "string")
 };

 
export const isConfig = (config: any): config is Config => {
    return config.url && config.proxy && config.allPosts && config.params;
};

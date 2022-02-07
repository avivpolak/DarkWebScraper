import yaml from "js-yaml";
import * as fs from "fs";
import path from "path";
import { Config } from "../types/config";

export const readConfig = (configPath: string): Config | undefined => {
    try {
        const config = yaml.load(
            fs.readFileSync(path.join(__dirname, configPath), "utf8")
        );
        if (isConfig(config)) {
            return config;
        }
        else return undefined
    } catch (error: unknown) {
        if (typeof error === "string") {
            throw new Error(error);
        }
    }
};

const isConfig = (config: any): config is Config => {
    return config.url && config.proxy && config.allPosts && config.params;
};

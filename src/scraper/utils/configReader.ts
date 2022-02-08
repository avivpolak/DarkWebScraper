import yaml from "js-yaml";
import * as fs from "fs";
import path from "path";
import { Config } from "../../types/config";
import { isConfig, isString } from "../../types/typeGourds";

export const readConfig = (configPath: string): Config | undefined => {
    try {
        const config = yaml.load(
            fs.readFileSync(path.join(__dirname, configPath), "utf8")
        );
        if (isConfig(config)) {
            console.log(config)
            return config;
        }
        else return undefined
    } catch (error: unknown) {
        if (isString(error)) {
            throw new Error(error);
        }
    }
};

readConfig("../../config.yaml")
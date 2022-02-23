import yaml from "yaml";
import * as fs from "fs";
import path from "path";
import { Config, ConfigREGEXAsString } from "../../types/config";
import { isConfig, isGeneralConfig, isString } from "../../types/typeGourds";
import { GeneralConfig } from "../../types/generalConfig";
import { ServerError } from "../../errors/types";

export const readConfig = async (
    configPath: string
): Promise<Config | GeneralConfig | undefined> => {
    try {
        const config = await yaml.parse(
            fs.readFileSync(path.join(__dirname, configPath), "utf8")
        );
        if (isConfig(config)) {
            const regexConfig = makeItRegex(config);
            return regexConfig;
        } else if (isGeneralConfig(config)) {
            return config;
        }
        return undefined;
    } catch (error: any) {
        const err: ServerError = { message: error, code: "SERVER_ERROR" };
        throw err;
    }
};

export const writeConfig = async (
    config: Config,
    pathStr: string
): Promise<void> => {
    try {
        const yamlConfig = await yaml.stringify(stringifyRegex(config));
        const overallPath = path.join(
            __dirname,
            pathStr,
            `/${config.name}-custom.yaml`
        );
        console.log(overallPath);
        fs.writeFile(overallPath, yamlConfig, (err) => {
            if (err) {
                console.log(err);
            }
        });
    } catch (error: any) {
        const err: ServerError = { message: error, code: "SERVER_ERROR" };
        throw err;
    }
};
const makeItRegex = (config: Config) => {
    const newConfig = config;
    Object.keys(newConfig.params).forEach((param) => {
        newConfig.params[param].regex = new RegExp(
            newConfig.params[param].regex
        );
    });
    return newConfig;
};
const stringifyRegex = (config: any): ConfigREGEXAsString => {
    const newConfig = config;
    Object.keys(newConfig.params).forEach((param) => {
        newConfig.params[param].regex =
            newConfig.params[param].regex.toString();
    });
    return newConfig;
};

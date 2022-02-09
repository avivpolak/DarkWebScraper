import yaml from "yaml";
import * as fs from "fs";
import path from "path";
import { Config } from "../../types/config";
import { isConfig, isString } from "../../types/typeGourds";
export const readConfig =async (configPath: string):Promise<Config | undefined> => {
    try {
  
        const config = await yaml.parse(
             fs.readFileSync(path.join(__dirname, configPath), "utf8")
        );
     console.log(config)
        if (isConfig(config)) {
            return makeItRegex(config);
        }
        else return undefined
    } catch (error: unknown) {
        console.log(error)
        if (isString(error)) {
            throw new Error(error);
        }
    }
};
const makeItRegex=(config:Config)=>{
    const newConfig = config
    Object.keys(newConfig.params).forEach(param => {
        newConfig.params[param].regex =new RegExp(newConfig.params[param].regex)
    });
    return newConfig
    
}

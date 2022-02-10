import { Config } from "../../types/config";
import { GeneralConfig } from "../../types/generalConfig";
export declare const readConfig: (configPath: string) => Promise<Config | GeneralConfig | undefined>;

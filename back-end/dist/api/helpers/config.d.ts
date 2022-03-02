import { Config, ReqConfig } from "../../types/config";
export declare const getAllConfigs: () => Promise<any>;
export declare const convertToStandartConfig: (reqConfig: ReqConfig) => Config;
export declare const convertStandartConfigToReqConfig: (config: Config) => ReqConfig;

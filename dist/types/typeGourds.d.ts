import { Config } from "./config";
import { Paste, Pastes } from "./pastes";
import { Website } from "./website";
export declare const isString: (str: unknown) => str is string;
export declare const isConfig: (config: any) => config is Config;
export declare const isPastes: (pastes: unknown) => pastes is Pastes;
export declare const isPaste: (paste: unknown) => paste is Paste;
export declare const isWebsite: (data: Website) => data is Website;

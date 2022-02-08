import { Config } from "../../types/config";
import { Pastes } from "../../types/pastes";
export declare const scraper: (config: Config) => Promise<Pastes | undefined>;

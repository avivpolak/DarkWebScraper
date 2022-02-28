import axios from "axios";
import { isGeneralConfig } from "../../../types/typeGourds";
import { readConfig } from "../../shared/configReader";
import isURL from "validator/lib/isURL";

export const fetchData = async (url: string, useTor: boolean): Promise<any> => {
    try {
        let response: any = {};
        const generalConfig = await readConfig("../../../configs/general.yaml");
        if (isGeneralConfig(generalConfig) && isURL(url)) {
            if (useTor) {
                response = await axios.get(url, { proxy: generalConfig.proxy });
                console.log(response.data);
                return response.data;
            } else {
                response = await axios.get(url);
                return response.data;
            }
        }
        return undefined;
    } catch (error: unknown) {
        if (typeof error === "string") {
            throw new Error(error);
        }
    }
};

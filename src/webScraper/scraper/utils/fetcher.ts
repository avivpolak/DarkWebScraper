import axios from "axios";
import { isGeneralConfig } from "../../../types/typeGourds";
import { readConfig } from "../../shared/configReader";

export const fetchData = async (url: string, useTor: boolean): Promise<any> => {
    try {
        let response: any = {};
        const generalConfig = await readConfig("../../../configs/general.yaml");
        if (isGeneralConfig(generalConfig)) {
            if (useTor) {
                response = await axios.get(url, { proxy: generalConfig.proxy });
                return response.data;
            } else {
                response = await axios.get(url,{headers:{host:"atlas.microsoft.com"}});
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

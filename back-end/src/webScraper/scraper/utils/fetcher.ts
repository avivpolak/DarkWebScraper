import axios, { AxiosResponse } from "axios";
import { isGeneralConfig } from "../../../types/typeGourds";
import { readConfig } from "../../shared/configReader";
import isURL from "validator/lib/isURL";
import { ServerError } from "../../../errors/types";

export const fetchData = async (
    url: string,
    useTor: boolean
): Promise<AxiosResponse["data"]> => {
    try {
        let response: AxiosResponse<any, any>;
        const generalConfig = await readConfig("../../../configs/general.yaml");
        if (isGeneralConfig(generalConfig) && isURL(url)) {
            if (useTor) {
                const response = await axios.get(url, {
                    proxy: generalConfig.proxy,
                });
                return response.data;
            } else {
                response = await axios.get(url);
                return response.data;
            }
        }
        const Erorr_Server_Fetch_NoData: ServerError = {
            message: "no data found",
            code: "SERVER_ERROR",
            subCode: "fetch error",
        };
        throw Erorr_Server_Fetch_NoData;
    } catch (error: any) {
        const Erorr_Server_Fetch: ServerError = {
            message: error.message,
            code: "SERVER_ERROR",
            subCode: "fetch error",
        };
        throw Erorr_Server_Fetch;
    }
};

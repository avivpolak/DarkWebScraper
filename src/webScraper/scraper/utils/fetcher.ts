import axios from "axios";
import generalConfig from "../../../configs/general";

export const fetchData = async (url: string, useTor: boolean): Promise<any> => {
    try {
        let response: any = {};
        if (useTor) {
            response = await axios.get(url, { proxy: generalConfig.proxy });
            return response.data;
        } else {
            response = await axios.get(url);
            return response.data;
        }
    } catch (error: unknown) {
        if (typeof error === "string") {
            throw new Error(error);
        }
    }
};

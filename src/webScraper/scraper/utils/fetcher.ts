import axios from "axios";
import { Proxy } from "../../../types/config";

export const fetchData = async (url: string, proxy: Proxy): Promise<any> => {
    try {
        const response = await axios.get(url, {
            proxy,
        });
        return response.data;
    } catch (error: unknown) {
        if (typeof error === "string") {
            throw new Error(error);
        }
    }
};

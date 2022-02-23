import { AxiosResponse } from "axios";
export declare const fetchData: (url: string, useTor: boolean) => Promise<AxiosResponse["data"]>;

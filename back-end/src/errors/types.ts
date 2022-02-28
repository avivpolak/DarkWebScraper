export interface NetworkError {
    code: "NETWORK_ERROR";
    httpCode: number;
}

export interface ServerError {
    code: "SERVER_ERROR";
    message: string;
    subCode?: string;
}
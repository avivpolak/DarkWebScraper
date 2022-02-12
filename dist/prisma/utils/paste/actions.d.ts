import { Paste } from "../../../types/pastes";
export declare const saveToDb: (data: Paste) => Promise<void>;
export declare const deleteAllPastesFromDb: () => Promise<import(".prisma/client").Prisma.BatchPayload>;
export declare const getAllPastesFromDb: () => Promise<{
    title: string | null;
    date: string | null;
    author: string | null;
    labels: string[];
}[]>;
export declare const getLabelsStatisticsFromDb: () => Promise<{
    title: string;
    color: string;
    value: number;
}[]>;
export declare const getPastesByQueryFromDb: (query: string) => Promise<import(".prisma/client").Paste[]>;

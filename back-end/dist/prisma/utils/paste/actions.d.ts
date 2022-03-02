import { Paste } from "../../../types/pastes";
export declare const saveToDb: (data: Paste) => Promise<void>;
export declare const deleteAllPastesFromDb: () => Promise<import(".prisma/client").Prisma.BatchPayload>;
export declare const countAllItems: () => Promise<number>;
export declare const getPagesPastesFromDbWithSearchWord: (page: number, pasetsPerPage: number, searchWord: string) => Promise<{
    title: string | null;
    labels: string[];
    date: string | null;
    author: string | null;
}[]>;
export declare const getPasteByIdFromDb: (pasteId: number) => Promise<import(".prisma/client").Paste | null>;
export declare const getPagesPastesFromDb: (page: number, pasetsPerPage: number) => Promise<{
    id: number;
    title: string | null;
    labels: string[];
    date: string | null;
    author: string | null;
}[]>;
export declare const getLabelsStatisticsFromDb: () => Promise<{
    title: any;
    color: string;
    value: number;
}[]>;
export declare const getPastesByQueryFromDb: (query: string) => Promise<{
    title: string | null;
    labels: string[];
    date: string | null;
    author: string | null;
}[]>;

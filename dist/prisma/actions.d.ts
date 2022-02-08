import { Post } from "../types/posts";
export declare const saveToDb: (data: Post) => Promise<void>;
export declare const deleteAllPastesFromDb: () => Promise<import(".prisma/client").Prisma.BatchPayload>;
export declare const getAllPastesFromDb: () => Promise<import(".prisma/client").Paste[]>;
export declare const getPastesByQueryFromDb: (query: string) => Promise<import(".prisma/client").Paste[]>;

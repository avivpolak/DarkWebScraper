import { Paste } from "../../types/pastes";
export declare const saveToDb: (data: Paste) => Promise<void>;
export declare const deleteAllPastesFromDb: () => Promise<import(".prisma/client").Prisma.BatchPayload>;
export declare const getAllPastesFromDb: () => Promise<import(".prisma/client").Paste[]>;
export declare const getPastesByQueryFromDb: (query: string) => Promise<import(".prisma/client").Paste[]>;

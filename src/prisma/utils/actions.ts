import { PrismaClient } from "@prisma/client";
import { Paste } from "../../types/pastes";
import { isValidAndNew } from "./validate";

const prisma = new PrismaClient();

export const saveToDb = async (data: Paste) => {
    if (await isValidAndNew(data)) {
        await prisma.paste.create({
            data,
        });
        console.log("saved!");
    }
};
export const deleteAllPastesFromDb = async () => {
    return await prisma.paste.deleteMany({});
};
export const getAllPastesFromDb = async () => {
    return await prisma.paste.findMany({});
};
export const getPastesByQueryFromDb = async (query: string) => {
    return await prisma.paste.findMany({
        where: {
            OR: [
                {
                    content: {
                        contains: query,
                    },
                },
                {
                    title: {
                        contains: query,
                    },
                },
                {
                    author: {
                        contains: query,
                    },
                },
                {
                    date: {
                        contains: query,
                    },
                },
            ],
        },
    });
};

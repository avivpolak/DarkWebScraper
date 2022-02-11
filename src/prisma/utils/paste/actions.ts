import { PrismaClient } from "@prisma/client";
import { Paste } from "../../../types/pastes";
import { isValidAndNew } from "./validate";
const prisma = new PrismaClient();

export const saveToDb = async (data: Paste) => {
    try {
        await prisma.paste.create({
            data,
        });
        console.log("saved!");
    } catch (error) {
        throw new Error("error");
    }
};
export const deleteAllPastesFromDb = async () => {
    return await prisma.paste.deleteMany({});
};
export const getAllPastesFromDb = async () => {
    return await prisma.paste.findMany({
        orderBy: {
            santimate: "asc",
        },
    });
};
export const getPastesByQueryFromDb = async (query: string) => {
    return await prisma.paste.findMany({
        where: {
            OR: [
                {
                    content: {
                        contains: query,
                        mode: "insensitive",
                    },
                },
                {
                    title: {
                        contains: query,
                        mode: "insensitive",
                    },
                },
                {
                    author: {
                        contains: query,
                        mode: "insensitive",
                    },
                },
                {
                    date: {
                        contains: query,
                        mode: "insensitive",
                    },
                },
            ],
        },
        orderBy: {
            santimate: "asc",
        },
    });
};

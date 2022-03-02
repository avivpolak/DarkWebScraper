import { PrismaClient } from "@prisma/client";
import { ServerError } from "../../../errors/types";
import { Paste } from "../../../types/pastes";
import { getRandomColor } from "./utils/helpers";

const prisma = new PrismaClient();

export const saveToDb = async (data: Paste) => {
    try {
        await prisma.paste.create({
            data,
        });
        console.log("Item saved!");
    } catch (error: any) {
        console.log(error);
        const err: ServerError = {
            message: "db save error",
            code: "SERVER_ERROR",
        };
        throw err;
    }
};
export const deleteAllPastesFromDb = async () => {
    try {
        return await prisma.paste.deleteMany({});
    } catch (error: any) {
        const err: ServerError = {
            message: "db delete error",
            code: "SERVER_ERROR",
        };
        throw err;
    }
};
export const countAllItems = async () => {
    try {
        return await prisma.paste.count();
    } catch (error: any) {
        const err: ServerError = {
            message: "db count error",
            code: "SERVER_ERROR",
        };
        throw err;
    }
};
export const getPagesPastesFromDbWithSearchWord = async (
    page: number,
    pasetsPerPage: number,
    searchWord: string
) => {
    try {
        console.log("searchWordsearchWord", searchWord);
        const result = await prisma.paste.findMany({
            // skip: page * pasetsPerPage,
            take: pasetsPerPage,
            select: {
                title: true,
                author: true,
                labels: true,
                date: true,
            },
            where: {
                OR: [
                    {
                        title: {
                            contains: searchWord,
                            mode: "insensitive",
                        },
                    },
                    {
                        content: {
                            contains: searchWord,
                            mode: "insensitive",
                        },
                    },
                    {
                        labels: {
                            has: searchWord,
                        },
                    },
                ],
            },

            orderBy: {
                date: "desc",
            },
        });
        console.log(result);
        return result;
    } catch (error: any) {
        const err: ServerError = {
            message: "db find error",
            code: "SERVER_ERROR",
        };
        throw err;
    }
};
export const getPasteByIdFromDb = async (
    pasteId: number,
) => {
    return await prisma.paste.findFirst({
        where: {
            id: pasteId,
        },
    });
};
export const getPagesPastesFromDb = async (
    page: number,
    pasetsPerPage: number
) => {
    try {
        return await prisma.paste.findMany({
            skip: page * pasetsPerPage,
            take: pasetsPerPage,
            select: {
                title: true,
                author: true,
                labels: true,
                date: true,
                id: true,
            },

            orderBy: {
                date: "desc",
            },
        });
    } catch (error: any) {
        console.log(error);

        const err: ServerError = {
            message: "db find error",
            code: "SERVER_ERROR",
        };
        throw err;
    }
};

export const getLabelsStatisticsFromDb = async () => {
    try {
        const groups = await prisma.paste.groupBy({
            by: ["labels"],
            _count: {
                id: true,
            },
            where: {
                labels: {
                    isEmpty: false,
                },
            },
        });
        const labels = groups.map((item: any) => item.labels.join(","));
        const sum = groups
            .map((group: any) => group._count.id)
            .reduce((a: any, b: any) => a + b, 0);
        const series = groups.map((item: any) => (item._count.id / sum) * 100);

        const itemToSend = labels.map((label: any, index: any) => {
            return {
                title: label,
                color: getRandomColor(),
                value: series[index],
            };
        });
        return itemToSend;
    } catch (error: any) {
        const err: ServerError = { message: "db error", code: "SERVER_ERROR" };
        throw err;
    }
};

export const getPastesByQueryFromDb = async (query: string) => {
    try {
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
                date: "desc",
            },
            select: {
                title: true,
                author: true,
                labels: true,
                date: true,
            },
        });
    } catch (error: any) {
        const err: ServerError = {
            message: "db find error",
            code: "SERVER_ERROR",
        };
        throw err;
    }
};

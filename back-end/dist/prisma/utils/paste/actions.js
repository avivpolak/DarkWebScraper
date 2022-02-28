"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPastesByQueryFromDb = exports.getLabelsStatisticsFromDb = exports.getPagesPastesFromDb = exports.getPagesPastesFromDbWithSearchWord = exports.countAllItems = exports.deleteAllPastesFromDb = exports.saveToDb = void 0;
const client_1 = require("@prisma/client");
const helpers_1 = require("./utils/helpers");
const prisma = new client_1.PrismaClient();
const saveToDb = async (data) => {
    try {
        await prisma.paste.create({
            data,
        });
        console.log("Item saved!");
    }
    catch (error) {
        const err = {
            message: "db save error",
            code: "SERVER_ERROR",
        };
        throw err;
    }
};
exports.saveToDb = saveToDb;
const deleteAllPastesFromDb = async () => {
    try {
        return await prisma.paste.deleteMany({});
    }
    catch (error) {
        const err = {
            message: "db delete error",
            code: "SERVER_ERROR",
        };
        throw err;
    }
};
exports.deleteAllPastesFromDb = deleteAllPastesFromDb;
const countAllItems = async () => {
    try {
        return await prisma.paste.count();
    }
    catch (error) {
        const err = {
            message: "db count error",
            code: "SERVER_ERROR",
        };
        throw err;
    }
};
exports.countAllItems = countAllItems;
const getPagesPastesFromDbWithSearchWord = async (page, pasetsPerPage, searchWord) => {
    try {
        console.log("searchWordsearchWord", searchWord);
        const result = await prisma.paste.findMany({
            skip: page * pasetsPerPage,
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
    }
    catch (error) {
        const err = {
            message: "db find error",
            code: "SERVER_ERROR",
        };
        throw err;
    }
};
exports.getPagesPastesFromDbWithSearchWord = getPagesPastesFromDbWithSearchWord;
const getPagesPastesFromDb = async (page, pasetsPerPage) => {
    try {
        return await prisma.paste.findMany({
            skip: page * pasetsPerPage,
            take: pasetsPerPage,
            select: {
                title: true,
                author: true,
                labels: true,
                date: true,
            },
            orderBy: {
                date: "desc",
            },
        });
    }
    catch (error) {
        const err = {
            message: "db find error",
            code: "SERVER_ERROR",
        };
        throw err;
    }
};
exports.getPagesPastesFromDb = getPagesPastesFromDb;
const getLabelsStatisticsFromDb = async () => {
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
        const labels = groups.map((item) => item.labels.join(","));
        const sum = groups
            .map((group) => group._count.id)
            .reduce((a, b) => a + b, 0);
        const series = groups.map((item) => (item._count.id / sum) * 100);
        const itemToSend = labels.map((label, index) => {
            return {
                title: label,
                color: (0, helpers_1.getRandomColor)(),
                value: series[index],
            };
        });
        return itemToSend;
    }
    catch (error) {
        const err = { message: "db error", code: "SERVER_ERROR" };
        throw err;
    }
};
exports.getLabelsStatisticsFromDb = getLabelsStatisticsFromDb;
const getPastesByQueryFromDb = async (query) => {
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
    }
    catch (error) {
        const err = {
            message: "db find error",
            code: "SERVER_ERROR",
        };
        throw err;
    }
};
exports.getPastesByQueryFromDb = getPastesByQueryFromDb;
//# sourceMappingURL=actions.js.map
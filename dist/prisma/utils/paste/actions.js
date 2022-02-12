"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPastesByQueryFromDb = exports.getLabelsStatisticsFromDb = exports.getAllPastesFromDb = exports.deleteAllPastesFromDb = exports.saveToDb = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const saveToDb = async (data) => {
    try {
        await prisma.paste.create({
            data,
        });
        console.log("saved!");
    }
    catch (error) {
        throw new Error("error");
    }
};
exports.saveToDb = saveToDb;
const deleteAllPastesFromDb = async () => {
    return await prisma.paste.deleteMany({});
};
exports.deleteAllPastesFromDb = deleteAllPastesFromDb;
const getAllPastesFromDb = async () => {
    return await prisma.paste.findMany({
        select: {
            title: true,
            author: true,
            labels: true,
            date: true,
        },
        orderBy: {
            date: "asc",
        },
    });
};
exports.getAllPastesFromDb = getAllPastesFromDb;
const getLabelsStatisticsFromDb = async () => {
    const groups = await prisma.paste.groupBy({
        by: ["labels"],
        _count: {
            id: true,
        },
        where: {
            labels: {
                isEmpty: false,
            }
        }
    });
    const fullLabelName = groups.map((item) => item.labels.join(","));
    const sum = groups.map((group) => group._count.id).reduce((a, b) => a + b, 0);
    const persentage = groups.map((item) => item._count.id / sum * 100);
    return { persentage, labels: fullLabelName };
};
exports.getLabelsStatisticsFromDb = getLabelsStatisticsFromDb;
const getPastesByQueryFromDb = async (query) => {
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
exports.getPastesByQueryFromDb = getPastesByQueryFromDb;
//# sourceMappingURL=actions.js.map
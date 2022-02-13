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
            date: "desc",
        },
    });
};
exports.getAllPastesFromDb = getAllPastesFromDb;
const getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};
const getLabelsStatisticsFromDb = async () => {
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
        return { title: label, color: getRandomColor(), value: series[index] };
    });
    return itemToSend;
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
};
exports.getPastesByQueryFromDb = getPastesByQueryFromDb;
//# sourceMappingURL=actions.js.map
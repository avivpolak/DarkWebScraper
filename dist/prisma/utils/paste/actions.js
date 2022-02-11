"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPastesByQueryFromDb = exports.getAllPastesFromDb = exports.deleteAllPastesFromDb = exports.saveToDb = void 0;
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
        orderBy: {
            santimate: "asc",
        },
    });
};
exports.getAllPastesFromDb = getAllPastesFromDb;
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
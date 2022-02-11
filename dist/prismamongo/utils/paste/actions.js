"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPastesByQueryFromDb = exports.getAllPastesFromDb = exports.deleteAllPastesFromDb = exports.saveToDb = void 0;
const client_1 = require("@prisma/client");
const validate_1 = require("./validate");
const prisma = new client_1.PrismaClient();
const saveToDb = async (data) => {
    try {
        if (await (0, validate_1.isValidAndNew)(data)) {
            await prisma.paste.create({
                data,
            });
            console.log("saved!");
        }
        console.log("finish");
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
            id: "asc",
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
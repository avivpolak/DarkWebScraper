"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidAndNew = void 0;
const client_1 = require("@prisma/client");
const typeGourds_1 = require("../../../types/typeGourds");
const prisma = new client_1.PrismaClient();
const isValidAndNew = async (data) => {
    return (0, typeGourds_1.isWebsite)(data) && !(await isExsistsInDb(data)) ? true : false;
};
exports.isValidAndNew = isValidAndNew;
const isExsistsInDb = async (data) => {
    const Website = await prisma.website.findFirst({
        where: {
            enrtyUrl: data.enrtyUrl,
        },
    });
    return !!Website;
};

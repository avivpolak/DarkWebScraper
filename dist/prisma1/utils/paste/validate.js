"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidAndNew = void 0;
const client_1 = require("@prisma/client");
const typeGourds_1 = require("../../../types/typeGourds");
const prisma = new client_1.PrismaClient();
const isValidAndNew = async (data) => {
    return isValidData(data) && !(await isExsistsInDb(data)) ? true : false;
};
exports.isValidAndNew = isValidAndNew;
const isValidData = (data) => {
    const { title, content, date, author } = data;
    if ((0, typeGourds_1.isString)(content) && content.length < 2703) {
        return title && content && date && author ? true : false;
    }
    else
        return false;
};
const isExsistsInDb = async (data) => {
    if (isValidData(data) && typeof data.content === "string") {
        const paste = await prisma.paste.findFirst({
            where: {
                content: data.content,
            },
        });
        return paste ? true : false;
    }
};

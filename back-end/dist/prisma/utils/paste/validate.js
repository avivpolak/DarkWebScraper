"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidAndNew = void 0;
const client_1 = require("@prisma/client");
const typeGourds_1 = require("../../../types/typeGourds");
const prisma = new client_1.PrismaClient();
const isValidAndNew = async (data) => {
    try {
        return isValidData(data) && !(await isExsistsInDb(data)) ? true : false;
    }
    catch (error) {
        throw error;
    }
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
    try {
        if (isValidData(data) && typeof data.content === "string") {
            const paste = await prisma.paste.findFirst({
                where: {
                    content: data.content,
                },
            });
            return paste ? true : false;
        }
    }
    catch (error) {
        const err = {
            message: "db find error",
            code: "SERVER_ERROR",
        };
        throw err;
    }
};
//# sourceMappingURL=validate.js.map
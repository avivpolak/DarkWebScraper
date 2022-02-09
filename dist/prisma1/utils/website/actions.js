"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveToDb = void 0;
const client_1 = require("@prisma/client");
const validate_1 = require("./validate");
const prisma = new client_1.PrismaClient();
const saveToDb = async (data) => {
    if (await (0, validate_1.isValidAndNew)(data)) {
        await prisma.website.create({
            data,
        });
        console.log("saved!");
    }
};
exports.saveToDb = saveToDb;

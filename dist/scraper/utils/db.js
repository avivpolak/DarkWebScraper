"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAll = void 0;
const client_1 = require("@prisma/client");
const actions_1 = require("../../prisma/utils/actions");
const sentimentor_1 = require("../../analyzer/sentimentor");
const prisma = new client_1.PrismaClient();
const saveAll = async (data) => {
    if (data) {
        for (let post of data) {
            if (typeof post.content === "string") {
                post.santimate = (0, sentimentor_1.getSentimentFromText)(post.content);
            }
            await (0, actions_1.saveToDb)(post)
                .catch((e) => {
                throw e;
            })
                .finally(async () => {
                await prisma.$disconnect();
            });
        }
    }
};
exports.saveAll = saveAll;

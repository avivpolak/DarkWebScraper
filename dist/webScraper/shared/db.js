"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAll = void 0;
const client_1 = require("@prisma/client");
const actions_1 = require("../../prisma/utils/paste/actions");
const sentimentor_1 = require("../../analyzer/sentimentor");
const validate_1 = require("../../prisma/utils/paste/validate");
const labels_1 = require("../../analyzer/labels");
const prisma = new client_1.PrismaClient();
const saveAll = async (data) => {
    if (data) {
        for (let post of data) {
            if (await (0, validate_1.isValidAndNew)(post)) {
                if (typeof post.content === "string" && typeof post.title === "string") {
                    const santimate = await (0, sentimentor_1.getSentimentFromText)(post.title + post.content);
                    const labels = await (0, labels_1.getLabelsFromText)(post.title + post.content);
                    if (santimate) {
                        post.santimate = santimate;
                    }
                    else {
                        post.santimate = 2; //to define between -1:1 => ok
                    }
                    if (labels) {
                        post.labels = labels;
                    }
                    else {
                        post.labels = [];
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
        }
    }
};
exports.saveAll = saveAll;
//# sourceMappingURL=db.js.map
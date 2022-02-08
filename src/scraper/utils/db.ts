import { PrismaClient } from "@prisma/client";
import { saveToDb } from "../../prisma/utils/actions";
import { getSentimentFromText } from "../../analyzer/sentimentor";
import { Pastes } from "../../types/pastes";
const prisma = new PrismaClient();

export const saveAll = async (data: Pastes) => {
    if (data) {
        for (let post of data) {
            if (typeof post.content === "string") {
                post.santimate = getSentimentFromText(post.content);
            }
            await saveToDb(post)
                .catch((e) => {
                    throw e;
                })
                .finally(async () => {
                    await prisma.$disconnect();
                });
        }
    }
};

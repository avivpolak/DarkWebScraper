import { PrismaClient } from "@prisma/client";
import { saveToDb } from "../../prisma/utils/paste/actions";
import { getSentimentFromText } from "../../analyzer/sentimentor";
import { Pastes } from "../../types/pastes";
import { isValidAndNew } from "../../prisma/utils/paste/validate";
import { getLabelsFromText } from "../../analyzer/labels";

const prisma = new PrismaClient();

export const saveAll = async (data: Pastes) => {
    if (data) {
        for (let post of data) {
            if (await isValidAndNew(post)) {
                if (typeof post.content === "string" && typeof post.title === "string") {
                    const santimate = await getSentimentFromText(post.title + post.content);
                    const labels = await getLabelsFromText(post.title + post.content);
                    if (santimate) {
                        post.santimate = santimate;
                    } else {
                        post.santimate = 2; //to define between -1:1 => ok
                    }
                    if (labels) {
                        post.labels = labels;
                    } else {
                        post.labels = [];
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
        }
    }
};

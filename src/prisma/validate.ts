import { PrismaClient } from "@prisma/client";
import { Post } from "../types/posts";
const prisma = new PrismaClient();

export const isValidAndNew = async (data: Post) => {
    return isValidData(data) && !(await isExsistsInDb(data)) ? true : false;
};
const isValidData = (data: Post): data is Post => {
    const { title, content, date, author } = data;
    return title && content && date && author ? true : false;
};
const isExsistsInDb = async (data: Post) => {
    if (isValidData(data)) {
        const paste = await prisma.paste.findFirst({
            where: {
                content:data.content,
            },
        });
        return paste ? true : false;
    }
};

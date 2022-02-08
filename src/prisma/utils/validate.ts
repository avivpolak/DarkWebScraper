import { PrismaClient } from "@prisma/client";
import { Paste } from "../../types/pastes";
const prisma = new PrismaClient();

export const isValidAndNew = async (data: Paste) => {
    return isValidData(data) && !(await isExsistsInDb(data)) ? true : false;
};
const isValidData = (data: Paste): data is Paste => {
    const { title, content, date, author } = data;
    return title && content && date && author ? true : false;
};
const isExsistsInDb = async (data: Paste) => {
    if (isValidData(data)&& typeof data.content === "string") {
        const paste = await prisma.paste.findFirst({
            where: {
                content:data.content,
            },
        });
        return paste ? true : false;
    }
};

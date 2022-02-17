import { PrismaClient } from "@prisma/client";
import { Paste } from "../../../types/pastes";
import { isString } from "../../../types/typeGourds";
const prisma = new PrismaClient();

export const isValidAndNew = async (data: Paste) => {
    return isValidData(data) && !(await isExsistsInDb(data)) ? true : false;
};
const isValidData = (data: Paste): data is Paste => {
    const { title, content, date, author } = data;
    if (isString(content) && content.length < 2703) {
        return title && content && date && author ? true : false;
    }
    else return false
};
const isExsistsInDb = async (data: Paste) => {
    if (isValidData(data) && typeof data.content === "string") {
        const paste = await prisma.paste.findFirst({
            where: {
                content: data.content,
            },
        });
        return paste ? true : false;
    }
};

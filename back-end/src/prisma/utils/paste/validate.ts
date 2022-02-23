import { PrismaClient } from "@prisma/client";
import { ServerError } from "../../../errors/types";
import { Paste } from "../../../types/pastes";
import { isString } from "../../../types/typeGourds";
const prisma = new PrismaClient();

export const isValidAndNew = async (data: Paste) => {
    try {
        return isValidData(data) && !(await isExsistsInDb(data)) ? true : false;
    } catch (error) {
        throw error;
    }
};
const isValidData = (data: Paste): data is Paste => {
    const { title, content, date, author } = data;
    if (isString(content) && content.length < 2703) {
        return title && content && date && author ? true : false;
    } else return false;
};
const isExsistsInDb = async (data: Paste) => {
    try {
        if (isValidData(data) && typeof data.content === "string") {
            const paste = await prisma.paste.findFirst({
                where: {
                    content: data.content,
                },
            });
            return paste ? true : false;
        }
    } catch (error: any) {
        const err: ServerError = {
            message: "db find error",
            code: "SERVER_ERROR",
        };
        throw err;
    }
};

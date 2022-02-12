import { PrismaClient } from "@prisma/client";
import { Paste } from "../../../types/pastes";
import { isValidAndNew } from "./validate";
const prisma = new PrismaClient();

export const saveToDb = async (data: Paste) => {
    try {
        await prisma.paste.create({
            data,
        });
        console.log("saved!");
    } catch (error) {
        throw new Error("error");
    }
};
export const deleteAllPastesFromDb = async () => {
    return await prisma.paste.deleteMany({});
};
export const getAllPastesFromDb = async () => {
    return await prisma.paste.findMany({
        select: {
            title: true,
            author: true,
            labels: true,
            date: true,
        },
        orderBy: {
            date: "asc",
        },
    });
};
const getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export const getLabelsStatisticsFromDb = async () => {
    const groups = await prisma.paste.groupBy({
        by: ["labels"],
        _count: {
            id: true,
        },
        where: {
            labels: {
                isEmpty: false,
            },
        },
    });
    const labels = groups.map((item) => item.labels.join(","));
    const sum = groups
        .map((group) => group._count.id)
        .reduce((a, b) => a + b, 0);
    const series = groups.map((item) => (item._count.id / sum) * 100);

    const itemToSend = labels.map((label, index) => {
        return { title: label, color: getRandomColor(), value: series[index] };
    });
    return itemToSend;
};

export const getPastesByQueryFromDb = async (query: string) => {
    return await prisma.paste.findMany({
        where: {
            OR: [
                {
                    content: {
                        contains: query,
                        mode: "insensitive",
                    },
                },
                {
                    title: {
                        contains: query,
                        mode: "insensitive",
                    },
                },
                {
                    author: {
                        contains: query,
                        mode: "insensitive",
                    },
                },
                {
                    date: {
                        contains: query,
                        mode: "insensitive",
                    },
                },
            ],
        },
        orderBy: {
            santimate: "asc",
        },
    });
};

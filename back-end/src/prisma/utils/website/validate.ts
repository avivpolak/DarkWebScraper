// import { PrismaClient } from "@prisma/client";
// import {  isWebsite } from "../../../types/typeGourds";
// import { Website } from "../../../types/website";
// const prisma = new PrismaClient();

// export const isValidAndNew = async (data: Website) => {
//     return isWebsite(data) && !(await isExsistsInDb(data)) ? true : false;
// };

// const isExsistsInDb = async (data: Website) => {
//     const Website = await prisma.website.findFirst({
//         where: {
//             enrtyUrl: data.enrtyUrl,
//         },
//     });
//     return !!Website
// };

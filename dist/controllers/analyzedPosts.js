"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalyzedPosts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAnalyzedPosts = async (req, res) => {
    try {
        const analyzedPosts = await prisma.paste.findMany({});
        if (analyzedPosts) {
            return res.status(200).send(analyzedPosts);
        }
        else {
            return res.status(404).send("No posts found");
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal server Error");
    }
};
exports.getAnalyzedPosts = getAnalyzedPosts;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
console.log("connecting to mongo..");
prisma
    .$connect()
    .then((result) => {
    console.log("connected to MongoDB");
})
    .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
});
//# sourceMappingURL=index.js.map
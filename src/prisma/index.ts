import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
console.log("connecting to mongo..")
prisma
  .$connect()
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
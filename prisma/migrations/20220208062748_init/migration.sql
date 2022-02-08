-- CreateTable
CREATE TABLE "Paste" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255),
    "content" VARCHAR(255),
    "date" VARCHAR(255),
    "author" VARCHAR(255),

    CONSTRAINT "Paste_pkey" PRIMARY KEY ("id")
);

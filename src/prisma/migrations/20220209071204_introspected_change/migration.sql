-- CreateTable
CREATE TABLE "Paste" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255),
    "content" TEXT,
    "date" VARCHAR(255),
    "author" VARCHAR(255),
    "santimate" DOUBLE PRECISION,

    CONSTRAINT "Paste_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Website" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enrtyUrl" TEXT,
    "urls" TEXT,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Paste_content_key" ON "Paste"("content");

-- CreateIndex
CREATE UNIQUE INDEX "Website_enrtyUrl_key" ON "Website"("enrtyUrl");

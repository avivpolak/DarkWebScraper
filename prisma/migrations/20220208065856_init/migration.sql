/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Paste` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[date]` on the table `Paste` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[author]` on the table `Paste` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Paste_title_key" ON "Paste"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Paste_date_key" ON "Paste"("date");

-- CreateIndex
CREATE UNIQUE INDEX "Paste_author_key" ON "Paste"("author");

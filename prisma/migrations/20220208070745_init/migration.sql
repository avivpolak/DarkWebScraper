/*
  Warnings:

  - A unique constraint covering the columns `[content]` on the table `Paste` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Paste_content_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "Paste_content_key" ON "Paste"("content");

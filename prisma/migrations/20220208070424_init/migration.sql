/*
  Warnings:

  - A unique constraint covering the columns `[title,content,date,author]` on the table `Paste` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Paste_author_key";

-- DropIndex
DROP INDEX "Paste_content_key";

-- DropIndex
DROP INDEX "Paste_date_key";

-- DropIndex
DROP INDEX "Paste_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "Paste_title_content_date_author_key" ON "Paste"("title", "content", "date", "author");

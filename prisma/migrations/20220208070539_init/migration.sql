/*
  Warnings:

  - A unique constraint covering the columns `[content,title]` on the table `Paste` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Paste_title_content_date_author_key";

-- CreateIndex
CREATE UNIQUE INDEX "Paste_content_title_key" ON "Paste"("content", "title");

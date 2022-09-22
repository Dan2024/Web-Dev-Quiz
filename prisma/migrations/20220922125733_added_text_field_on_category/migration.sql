/*
  Warnings:

  - Added the required column `text` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "text" VARCHAR(100) NOT NULL;

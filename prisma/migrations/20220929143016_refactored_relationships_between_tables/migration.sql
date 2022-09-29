/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `optionId` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Answer` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the `_CategoryToOption` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Answer" DROP CONSTRAINT "Answer_optionId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToOption" DROP CONSTRAINT "_CategoryToOption_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToOption" DROP CONSTRAINT "_CategoryToOption_B_fkey";

-- DropIndex
DROP INDEX "Answer_optionId_key";

-- AlterTable
ALTER TABLE "Answer" DROP COLUMN "createdAt",
DROP COLUMN "optionId",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Option" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "questionId" INTEGER;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "_CategoryToOption";

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

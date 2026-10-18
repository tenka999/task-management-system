/*
  Warnings:

  - You are about to drop the column `priotity` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "priotity",
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'NO_PRIORITY';

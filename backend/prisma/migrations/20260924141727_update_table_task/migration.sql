/*
  Warnings:

  - You are about to drop the column `priority_id` on the `tasks` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "tasks_priority_id_idx";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "priority_id",
ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'NO_PRIORITY';

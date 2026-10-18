/*
  Warnings:

  - You are about to drop the column `status_id` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `status` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "tasks_project_id_status_id_idx";

-- DropIndex
DROP INDEX "tasks_workspace_id_status_id_idx";

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "status_id",
ADD COLUMN     "status" TEXT NOT NULL;

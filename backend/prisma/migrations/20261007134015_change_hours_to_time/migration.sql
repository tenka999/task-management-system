/*
  Warnings:

  - You are about to drop the column `hours_spent` on the `task_time_logs` table. All the data in the column will be lost.
  - You are about to drop the column `actual_hours` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `estimated_hours` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `time_spent` to the `task_time_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "task_time_logs" DROP COLUMN "hours_spent",
ADD COLUMN     "time_spent" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "actual_hours",
DROP COLUMN "estimated_hours",
ADD COLUMN     "actual_time" DECIMAL(10,2),
ADD COLUMN     "estimated_time" DECIMAL(10,2);

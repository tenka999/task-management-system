/*
  Warnings:

  - Changed the type of `status` on the `projects` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ProjectHealth" AS ENUM ('NO_UPDATE', 'OFF_TRACK', 'ON_TRACK', 'AT_RISK');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('NO_PRIORITY', 'LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE 'NEW_MESSAGE';

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "health" "ProjectHealth" NOT NULL DEFAULT 'ON_TRACK',
ADD COLUMN     "priotity" "Priority" NOT NULL DEFAULT 'NO_PRIORITY',
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "projects_status_idx" ON "projects"("status");

-- CreateIndex
CREATE INDEX "projects_workspace_id_status_idx" ON "projects"("workspace_id", "status");

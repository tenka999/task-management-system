/*
  Warnings:

  - You are about to drop the `task_priorities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `task_statuses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "task_priorities" DROP CONSTRAINT "task_priorities_workspace_id_fkey";

-- DropForeignKey
ALTER TABLE "task_statuses" DROP CONSTRAINT "task_statuses_project_id_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_priority_id_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_status_id_fkey";

-- DropTable
DROP TABLE "task_priorities";

-- DropTable
DROP TABLE "task_statuses";

-- CreateTable
CREATE TABLE "project_labels" (
    "task_id" TEXT NOT NULL,
    "label_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_labels_pkey" PRIMARY KEY ("task_id","label_id")
);

-- CreateIndex
CREATE INDEX "project_labels_label_id_idx" ON "project_labels"("label_id");

-- AddForeignKey
ALTER TABLE "project_labels" ADD CONSTRAINT "project_labels_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_labels" ADD CONSTRAINT "project_labels_label_id_fkey" FOREIGN KEY ("label_id") REFERENCES "labels"("id") ON DELETE CASCADE ON UPDATE CASCADE;

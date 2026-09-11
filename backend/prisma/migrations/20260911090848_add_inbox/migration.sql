-- CreateEnum
CREATE TYPE "InboxType" AS ENUM ('DIRECT_MESSAGE', 'TASK_MENTION', 'TASK_ASSIGNMENT', 'COMMENT_REPLY', 'PROJECT_INVITE', 'WORKSPACE_INVITE', 'SYSTEM');

-- CreateEnum
CREATE TYPE "InboxStatus" AS ENUM ('UNREAD', 'READ', 'ARCHIVED', 'DELETED');

-- CreateEnum
CREATE TYPE "InboxPriority" AS ENUM ('NO_PRIORITY', 'LOW', 'NORMAL', 'HIGH', 'URGENT');

-- CreateTable
CREATE TABLE "inboxes" (
    "id" TEXT NOT NULL,
    "recipient_id" TEXT NOT NULL,
    "sender_id" TEXT,
    "workspace_id" TEXT,
    "project_id" TEXT,
    "task_id" TEXT,
    "comment_id" INTEGER,
    "type" "InboxType" NOT NULL DEFAULT 'DIRECT_MESSAGE',
    "status" "InboxStatus" NOT NULL DEFAULT 'UNREAD',
    "priority" "InboxPriority" NOT NULL DEFAULT 'NORMAL',
    "subject" TEXT,
    "content" TEXT NOT NULL,
    "metadata" JSONB,
    "thread_id" TEXT,
    "parent_id" TEXT,
    "is_starred" BOOLEAN NOT NULL DEFAULT false,
    "read_at" TIMESTAMP(3),
    "archived_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "inboxes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inbox_attachments" (
    "id" TEXT NOT NULL,
    "inbox_id" TEXT NOT NULL,
    "uploaded_by_id" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "file_size" BIGINT,
    "mime_type" TEXT,
    "checksum" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "inbox_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "inboxes_recipient_id_status_idx" ON "inboxes"("recipient_id", "status");

-- CreateIndex
CREATE INDEX "inboxes_recipient_id_type_idx" ON "inboxes"("recipient_id", "type");

-- CreateIndex
CREATE INDEX "inboxes_recipient_id_is_starred_idx" ON "inboxes"("recipient_id", "is_starred");

-- CreateIndex
CREATE INDEX "inboxes_thread_id_idx" ON "inboxes"("thread_id");

-- CreateIndex
CREATE INDEX "inboxes_parent_id_idx" ON "inboxes"("parent_id");

-- CreateIndex
CREATE INDEX "inboxes_workspace_id_idx" ON "inboxes"("workspace_id");

-- CreateIndex
CREATE INDEX "inboxes_task_id_idx" ON "inboxes"("task_id");

-- CreateIndex
CREATE INDEX "inboxes_created_at_idx" ON "inboxes"("created_at");

-- CreateIndex
CREATE INDEX "inbox_attachments_inbox_id_idx" ON "inbox_attachments"("inbox_id");

-- AddForeignKey
ALTER TABLE "inboxes" ADD CONSTRAINT "inboxes_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inboxes" ADD CONSTRAINT "inboxes_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inboxes" ADD CONSTRAINT "inboxes_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inboxes" ADD CONSTRAINT "inboxes_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inboxes" ADD CONSTRAINT "inboxes_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inboxes" ADD CONSTRAINT "inboxes_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "task_comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inboxes" ADD CONSTRAINT "inboxes_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "inboxes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inboxes" ADD CONSTRAINT "inboxes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inbox_attachments" ADD CONSTRAINT "inbox_attachments_inbox_id_fkey" FOREIGN KEY ("inbox_id") REFERENCES "inboxes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inbox_attachments" ADD CONSTRAINT "inbox_attachments_uploaded_by_id_fkey" FOREIGN KEY ("uploaded_by_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

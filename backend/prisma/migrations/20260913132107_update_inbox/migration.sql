/*
  Warnings:

  - A unique constraint covering the columns `[workspace_invitation_id]` on the table `inboxes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "inboxes" ADD COLUMN     "workspace_invitation_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "inboxes_workspace_invitation_id_key" ON "inboxes"("workspace_invitation_id");

-- AddForeignKey
ALTER TABLE "inboxes" ADD CONSTRAINT "inboxes_workspace_invitation_id_fkey" FOREIGN KEY ("workspace_invitation_id") REFERENCES "workspace_invitations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

import React, { useState } from "react";
import { useInvitationApi } from "@/presentation/logics/app/useInvitation";
import {
  Mail,
  Clock,
  CheckCircle,
  XCircle,
  Trash2,
  RefreshCw,
} from "lucide-react";

const InvitationList = ({ workspaceId }) => {
  const {
    useAllInvitations,
    usePendingInvitations,
    resendInvitation,
    cancelInvitation,
  } = useInvitationApi();

  const [statusFilter, setStatusFilter] = useState("ALL");

  const { data: invitationsData, isLoading } = useAllInvitations({
    workspaceId,
    status: statusFilter !== "ALL" ? statusFilter : undefined,
  });

  const { data: pendingData } = usePendingInvitations(workspaceId);

  const handleResend = async (id) => {
    try {
      await resendInvitation.mutateAsync(id);
      alert("Invitation resent successfully");
    } catch (error) {
      alert("Failed to resend invitation");
    }
  };

  const handleCancel = async (id) => {
    if (confirm("Are you sure you want to cancel this invitation?")) {
      try {
        await cancelInvitation.mutateAsync(id);
        alert("Invitation cancelled");
      } catch (error) {
        alert("Failed to cancel invitation");
      }
    }
  };

  if (isLoading) {
    return <div>Loading invitations...</div>;
  }

  return (
    <div className="invitation-list">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          Invitations ({invitationsData?.total || 0})
        </h3>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="DECLINED">Declined</option>
          <option value="EXPIRED">Expired</option>
        </select>
      </div>

      {/* Invitation Items */}
      <div className="space-y-3">
        {invitationsData?.invitations?.map((invitation) => (
          <div
            key={invitation.id}
            className="flex items-center gap-4 p-3 border rounded-lg hover:bg-gray-50"
          >
            {/* Icon based on status */}
            <div
              className={`p-2 rounded-full ${
                invitation.status === "PENDING"
                  ? "bg-yellow-100"
                  : invitation.status === "ACCEPTED"
                    ? "bg-green-100"
                    : invitation.status === "DECLINED"
                      ? "bg-red-100"
                      : "bg-gray-100"
              }`}
            >
              <Mail
                size={20}
                className={
                  invitation.status === "PENDING"
                    ? "text-yellow-600"
                    : invitation.status === "ACCEPTED"
                      ? "text-green-600"
                      : invitation.status === "DECLINED"
                        ? "text-red-600"
                        : "text-gray-600"
                }
              />
            </div>

            {/* Invitation Details */}
            <div className="flex-1">
              <div className="font-medium">{invitation.email}</div>
              <div className="text-sm text-gray-500">
                Role: {invitation.role}
              </div>
              <div className="text-xs text-gray-400 flex items-center gap-1">
                <Clock size={12} />
                Sent: {new Date(invitation.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* Status Badge */}
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                invitation.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-700"
                  : invitation.status === "ACCEPTED"
                    ? "bg-green-100 text-green-700"
                    : invitation.status === "DECLINED"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
              }`}
            >
              {invitation.status}
            </span>

            {/* Actions */}
            {invitation.status === "PENDING" && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleResend(invitation.id)}
                  className="p-2 hover:bg-blue-50 rounded"
                  title="Resend"
                >
                  <RefreshCw size={16} className="text-blue-500" />
                </button>
                <button
                  onClick={() => handleCancel(invitation.id)}
                  className="p-2 hover:bg-red-50 rounded"
                  title="Cancel"
                >
                  <Trash2 size={16} className="text-red-500" />
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Empty State */}
        {invitationsData?.invitations?.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No invitations found
          </div>
        )}
      </div>
    </div>
  );
};

export default InvitationList;

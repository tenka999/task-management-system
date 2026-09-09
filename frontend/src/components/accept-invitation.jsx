import React from "react";
import { useInvitationApi } from "@/presentation/logics/app/useInvitation";
import { useNavigate } from "react-router-dom";

const AcceptInvitation = ({ token }) => {
  const navigate = useNavigate();
  const { useInvitationByToken, acceptInvitation, declineInvitation } =
    useInvitationApi();

  const { data: invitation, isLoading, isError } = useInvitationByToken(token);

  const handleAccept = async () => {
    try {
      await acceptInvitation.mutateAsync(token);
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to accept invitation: " + error.message);
    }
  };

  const handleDecline = async () => {
    try {
      await declineInvitation.mutateAsync(token);
      navigate("/");
    } catch (error) {
      alert("Failed to decline invitation");
    }
  };

  if (isLoading) {
    return <div>Loading invitation...</div>;
  }

  if (isError || !invitation) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold mb-2">Invalid Invitation</h2>
        <p className="text-gray-500">
          This invitation link is invalid or has expired.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-lg overflow-hidden">
          {invitation.workspace.logoUrl ? (
            <img
              src={invitation.workspace.logoUrl}
              alt={invitation.workspace.name}
            />
          ) : (
            <div className="w-full h-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
              {invitation.workspace.name.charAt(0)}
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold">
          Join {invitation.workspace.name}
        </h2>
        <p className="text-gray-500 mt-1">
          You've been invited by {invitation.invitedBy.firstName}{" "}
          {invitation.invitedBy.lastName}
        </p>
        <p className="text-sm text-gray-400 mt-1">Role: {invitation.role}</p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleAccept}
          className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Accept Invitation
        </button>
        <button
          onClick={handleDecline}
          className="flex-1 border py-2 rounded-lg hover:bg-gray-50"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default AcceptInvitation;

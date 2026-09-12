import { useState } from "react";
import { format, isPast } from "date-fns";
import { CheckCircle2, Clock, Users, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IconCircleX, IconUserPlus } from "@tabler/icons-react";

/**
 * Payload shape (built server-side from the WorkspaceInvitation model +
 * its relations — the Prisma table itself has no workspace/inviter names):
 * {
 *   token: string,
 *   workspaceName: string,
 *   workspaceInitials?: string,
 *   inviterName: string,
 *   role: "OWNER" | "ADMIN" | "MEMBER",
 *   status: "PENDING" | "ACCEPTED" | "DECLINED" | "REVOKED",
 *   expiresAt: Date | string,
 *   acceptedAt?: Date | string | null,
 *   memberCount?: number,
 * }
 */

const roleLabels = {
  OWNER: "Owner",
  ADMIN: "Admin",
  MEMBER: "Member",
};

function roleBadgeVariant(role) {
  if (role === "OWNER") return "default";
  if (role === "ADMIN") return "secondary";
  return "outline";
}

export function InvitationMessageCard({ invitation }) {
  // "idle" | "accepting" | "declining" | "accepted" | "declined" | "error"
  const [action, setAction] = useState("idle");

  const expiresAt = new Date(invitation.expiresAt);
  const expired = invitation.status === "PENDING" && isPast(expiresAt);

  const resolved =
    invitation.status === "ACCEPTED" ||
    invitation.status === "DECLINED" ||
    action === "accepted" ||
    action === "declined";

  const respond = async (endpoint, nextState) => {
    setAction(endpoint === "accept" ? "accepting" : "declining");
    try {
      const res = await fetch(`/api/workspaces/invitations/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: invitation.token }),
      });
      if (!res.ok) throw new Error("Request failed");
      setAction(nextState);
    } catch {
      setAction("error");
    }
  };

  return (
    <Card
      className={cn(
        "mt-1.5 w-full p-0 max-w-full overflow-hidden rounded-2xl rounded-tl-sm",
        resolved && "opacity-80",
      )}
    >
      <CardContent className="flex min-w-0 flex-col gap-5  p-4">
        {/* Header */}
        <div className="flex min-w-0 items-center gap-3">
          <Avatar size="lg" className="shrink-0">
            <AvatarFallback className="bg-primary/10 text-xs text-primary">
              {invitation.workspaceInitials ??
                invitation.workspaceName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              {invitation.workspaceName}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Invited by {invitation.inviterName}
            </p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-col flex-wrap items-center gap-x-3 gap-y-4 text-xs text-muted-foreground">
          <span className="text-primary text-sm font-semibold">
            {invitation.content}
          </span>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs ">
            <Badge variant={roleBadgeVariant(invitation.role)}>
              {roleLabels[invitation.role] ?? invitation.role}
            </Badge>
            {invitation.memberCount != null && (
              <span className="flex items-center gap-1">
                <Users size={12} />
                {invitation.memberCount} member
                {invitation.memberCount === 1 ? "" : "s"}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {expired
                ? "Expired"
                : `Expires ${format(expiresAt, "MMM d, yyyy")}`}
            </span>
          </div>
        </div>

        {/* Actions / states */}
        {resolved || expired || invitation.status === "REVOKED" ? (
          <StateNotice
            invitation={invitation}
            action={action}
            expired={expired}
          />
        ) : (
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="flex-2"
              disabled={action === "accepting" || action === "declining"}
              onClick={() => respond("accept", "accepted")}
            >
              <IconUserPlus />
              {action === "accepting" ? "Joining…" : "Accept invitation"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1"
              disabled={action === "accepting" || action === "declining"}
              onClick={() => respond("decline", "declined")}
            >
              <IconCircleX />

              {action === "declining" ? "Declining…" : "Decline"}
            </Button>
          </div>
        )}

        {action === "error" && (
          <p className="text-xs text-destructive">
            Something went wrong.{" "}
            <button
              type="button"
              className="font-medium underline"
              onClick={() => setAction("idle")}
            >
              Try again
            </button>
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function StateNotice({ invitation, action, expired }) {
  const effective =
    action === "accepted" || action === "declined"
      ? action.toUpperCase()
      : invitation.status;

  if (expired) {
    return (
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <XCircle size={14} className="text-muted-foreground" />
        This invitation has expired. Ask {invitation.inviterName} for a new one.
      </p>
    );
  }

  if (effective === "ACCEPTED") {
    const when = invitation.acceptedAt
      ? format(new Date(invitation.acceptedAt), "MMM d, yyyy")
      : null;
    return (
      <p className="flex items-center gap-1.5 text-xs text-green-600">
        <CheckCircle2 size={14} />
        You joined {invitation.workspaceName}
        {when ? ` on ${when}` : ""}.
      </p>
    );
  }

  if (effective === "DECLINED") {
    return (
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <XCircle size={14} />
        You declined this invitation.
      </p>
    );
  }

  // REVOKED
  return (
    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <XCircle size={14} />
      This invitation is no longer valid.
    </p>
  );
}

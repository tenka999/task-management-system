// components/invitation-preview.jsx (Email preview component)
import {
  Mail,
  Building2,
  Users,
  Shield,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function InvitationPreview({ invitation }) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center border-b">
        <div className="mx-auto mb-4">
          <Avatar className="h-16 w-16 mx-auto">
            {invitation?.workspace?.logo ? (
              <AvatarImage src={invitation.workspace.logo} />
            ) : (
              <AvatarFallback className="bg-primary/10">
                <Building2 className="h-8 w-8" />
              </AvatarFallback>
            )}
          </Avatar>
        </div>
        <CardTitle className="text-xl">{invitation?.workspace?.name}</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          You've been invited to join this workspace
        </p>
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        {/* Sender Info */}
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-secondary">
              {invitation?.inviter?.name?.[0] || "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">
              {invitation?.inviter?.name || "A team member"}
            </p>
            <p className="text-xs text-muted-foreground">
              {invitation?.inviter?.email}
            </p>
          </div>
        </div>

        <Separator />

        {/* Details */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Role
            </span>
            <Badge variant="secondary" className="capitalize">
              {invitation?.role?.toLowerCase()}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4" />
              Team Size
            </span>
            <span className="text-sm font-medium">
              {invitation?.workspace?.memberCount || 0} members
            </span>
          </div>

          {invitation?.expiresAt && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Expires
              </span>
              <span className="text-sm font-medium">
                {new Date(invitation.expiresAt).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

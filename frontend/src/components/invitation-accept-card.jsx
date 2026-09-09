// components/invitation-accept-card.jsx (Alternative compact version)
import {
  Mail,
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  Users,
  Shield,
  ArrowRight,
  Loader2,
  Sparkles,
  Globe,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { toast } from "@/components/ui/toast";

export function InvitationAcceptCard({ invitation, onAccept, onDecline }) {
  const [isAccepting, setIsAccepting] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);

  const handleAccept = async () => {
    setIsAccepting(true);
    try {
      await onAccept(invitation);
      toast.add({
        title: "Welcome! 🎉",
        description: `You've joined ${invitation.workspace.name}`,
      });
    } catch (error) {
      toast.add({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsAccepting(false);
    }
  };

  const handleDecline = async () => {
    setIsDeclining(true);
    try {
      await onDecline(invitation);
      toast.add({
        title: "Invitation Declined",
        description: "You can always request a new invitation later",
      });
    } catch (error) {
      toast.add({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsDeclining(false);
    }
  };

  const getTimeRemaining = (expiresAt) => {
    if (!expiresAt) return null;
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry - now;

    if (diff < 0) return { label: "Expired", color: "text-red-600" };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
      return {
        label: `Expires in ${days} day${days > 1 ? "s" : ""}`,
        color: "text-yellow-600",
      };
    } else {
      return {
        label: `Expires in ${hours} hour${hours > 1 ? "s" : ""}`,
        color: "text-yellow-600",
      };
    }
  };

  const timeRemaining = getTimeRemaining(invitation?.expiresAt);

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl border-2">
      <CardHeader className="text-center relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-t-lg" />

        <div className="relative">
          <Avatar className="h-24 w-24 mx-auto mb-4 ring-4 ring-primary/10">
            {invitation?.workspace?.logo ? (
              <AvatarImage
                src={invitation.workspace.logo}
                alt={invitation.workspace.name}
              />
            ) : (
              <AvatarFallback className="bg-primary/10 text-primary">
                <Building2 className="h-12 w-12" />
              </AvatarFallback>
            )}
          </Avatar>

          <CardTitle className="text-3xl font-bold">
            {invitation?.workspace?.name}
          </CardTitle>

          <CardDescription className="text-lg mt-2 flex items-center justify-center gap-2">
            <Mail className="h-4 w-4" />
            Invitation from {invitation?.inviter?.name || "a team member"}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Role Badge */}
        <div className="flex justify-center">
          <Badge variant="secondary" className="text-sm px-4 py-1.5 capitalize">
            <Shield className="mr-2 h-4 w-4" />
            {invitation?.role?.toLowerCase() || "member"} role
          </Badge>
        </div>

        {/* Workspace Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <div className="text-2xl font-bold">
              {invitation?.workspace?.memberCount || 0}
            </div>
            <div className="text-sm text-muted-foreground">Members</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <Globe className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <div className="text-2xl font-bold">
              {invitation?.workspace?.projectCount || 0}
            </div>
            <div className="text-sm text-muted-foreground">Projects</div>
          </div>
        </div>

        {/* Expiry Warning */}
        {timeRemaining && (
          <div
            className={`flex items-center justify-center gap-2 text-sm ${timeRemaining.color}`}
          >
            <Clock className="h-4 w-4" />
            {timeRemaining.label}
          </div>
        )}

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Lock className="h-3 w-3" />
            Secure invite
          </span>
          <span className="flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            One-click join
          </span>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="flex flex-col sm:flex-row gap-3 p-6">
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={handleDecline}
          disabled={isDeclining || isAccepting}
        >
          {isDeclining ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <XCircle className="mr-2 h-4 w-4" />
          )}
          Decline
        </Button>
        <Button
          className="w-full sm:w-auto flex-1"
          onClick={handleAccept}
          disabled={isAccepting || isDeclining}
        >
          {isAccepting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Joining...
            </>
          ) : (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Accept Invitation
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

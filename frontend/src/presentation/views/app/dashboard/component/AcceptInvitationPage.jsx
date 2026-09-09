// pages/accept-invitation-page.jsx
import { useState, useEffect } from "react";
import * as React from "react";
// import { useRouter } from "next/router";
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
  AlertTriangle,
  LogIn,
  UserPlus,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/toast";
// import { useInvitationApi } from "@/presentation/logics/app/useInvitation";
import { useWorkspace } from "@/hooks/useWorkspace";

export default function AcceptInvitationPage() {
  //   const router = useRouter();
  //   const { token } = router.query;
  const [invitation, setInvitation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);
  const [error, setError] = useState(null);

  //   const { useInvitationByToken, acceptInvitation, declineInvitation } =
  //     useInvitationApi();

  // Fetch invitation details
  //   useEffect(() => {
  //     if (token) {
  //       fetchInvitation();
  //     }
  //   }, [token]);

  const fetchInvitation = async () => {
    setIsLoading(true);
    setError(null);
    // try {
    //   const { data } = useInvitationByToken();
    //   setInvitation(data);

    //   // Check if invitation is expired
    //   if (data?.expiresAt && new Date(data.expiresAt) < new Date()) {
    //     setError({
    //       type: "expired",
    //       message: "This invitation has expired",
    //     });
    //   }
    // } catch (err) {
    //   setError({
    //     type: "not_found",
    //     message: "Invitation not found or has been revoked",
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleAccept = async () => {
    setIsAccepting(true);
    // try {
    //   await acceptInvitation({
    //     token,
    //   });

    //   toast.add({
    //     title: "Welcome aboard! 🎉",
    //     description: `You have successfully joined ${invitation?.workspace?.name}`,
    //   });

    //   // Redirect to workspace
    //   setTimeout(() => {
    //     router.push(`/workspace/${invitation?.workspace?.slug}`);
    //   }, 1500);
    // } catch (err) {
    //   toast.add({
    //     variant: "destructive",
    //     title: "Failed to Accept Invitation",
    //     description:
    //       err.message || "An error occurred while accepting the invitation",
    //   });
    // } finally {
    //   setIsAccepting(false);
    // }
  };

  const handleDecline = async () => {
    setIsDeclining(true);
    // try {
    //   await declineInvitation({
    //     token,
    //   });

    //   toast.add({
    //     title: "Invitation Declined",
    //     description: "The invitation has been declined successfully",
    //   });

    //   setTimeout(() => {
    //     router.push("/");
    //   }, 1000);
    // } catch (err) {
    //   toast.add({
    //     variant: "destructive",
    //     title: "Error",
    //     description: err.message || "Failed to decline invitation",
    //   });
    // } finally {
    //   setIsDeclining(false);
    // }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-lg font-medium text-muted-foreground">
            Loading invitation details...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
              {error.type === "expired" ? (
                <Clock className="h-8 w-8 text-red-600" />
              ) : (
                <XCircle className="h-8 w-8 text-red-600" />
              )}
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {error.type === "expired"
                ? "Invitation Expired"
                : "Invalid Invitation"}
            </h2>
            <p className="text-muted-foreground mb-6">{error.message}</p>
            <Button
              // onClick={() => router.push("/")}
              className="w-full"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Go to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Success state - show invitation details
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <ScrollArea className="w-full max-w-2xl h-[300px] ">
        <Card className="w-full shadow-xl">
          <CardHeader className="text-center pb-0">
            <div className="mx-auto mb-4">
              <Avatar className="h-20 w-20 mx-auto">
                {invitation?.workspace?.logo ? (
                  <AvatarImage
                    src={invitation.workspace.logo}
                    alt={invitation.workspace.name}
                  />
                ) : (
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    <Building2 className="h-10 w-10" />
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
            <CardTitle className="text-3xl font-bold">
              Join {invitation?.workspace?.name}
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              You've been invited to collaborate
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            {/* Invitation Details */}
            <div className="bg-muted/50 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Invited by
                </span>
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">
                      {invitation?.inviter?.name?.slice(0, 2)?.toUpperCase() ||
                        "??"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">
                    {invitation?.inviter?.name ||
                      invitation?.inviter?.email ||
                      "Unknown"}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Your Role
                </span>
                <Badge variant="secondary" className="capitalize">
                  <Shield className="mr-1 h-3 w-3" />
                  {invitation?.role?.toLowerCase() || "member"}
                </Badge>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Workspace Members
                </span>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {invitation?.workspace?.memberCount || 0} members
                  </span>
                </div>
              </div>

              {invitation?.expiresAt && (
                <>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Expires
                    </span>
                    <span className="text-sm">
                      {new Date(invitation.expiresAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Workspace Description */}
            {invitation?.workspace?.description && (
              <div className="text-center">
                <p className="text-muted-foreground">
                  {invitation.workspace.description}
                </p>
              </div>
            )}

            {/* Benefits List */}
            <div className="space-y-3">
              <h3 className="font-semibold text-center">
                What you'll get access to:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                  <span className="text-sm">Team collaboration</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                  <span className="text-sm">Shared workspace</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-purple-600 shrink-0" />
                  <span className="text-sm">Project management</span>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6">
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
                  <UserPlus className="mr-2 h-4 w-4" />
                  Accept Invitation
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </ScrollArea>
    </div>
  );
}

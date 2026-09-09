// pages/invitations-page.jsx
import { useState } from "react";
import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { IconX } from "@tabler/icons-react";
import { SearchIcon, Mail, Clock, CheckCircle2, XCircle } from "lucide-react";
import { InvitationTable } from "@/components/invitation-table";
import { useInvitationApi } from "@/presentation/logics/app/useInvitation";
import { useWorkspace } from "@/hooks/useWorkspace";
import SecureStorage from "@/helpers/SecureStorage";

export default function InvitationsPage() {
  const inputRef = React.useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const user = SecureStorage.getStorage("user");

  const { activeWorkspace } = useWorkspace();
  const { useAllInvitations, useInvitationsByEmail } = useInvitationApi();
  const { data: invitations } = useInvitationsByEmail(user?.email);
  console.log(activeWorkspace?.id);
  console.log(invitations);
  function handleInputSearch(event) {
    setSearchTerm(event.target.value);
  }

  const handleClear = () => {
    setSearchTerm("");
    inputRef.current?.focus();
  };

  // Status counts for filter
  const statusCounts = {
    all: invitations?.length || 0,
    pending: invitations?.filter((inv) => inv.status === "PENDING").length || 0,
    accepted:
      invitations?.filter((inv) => inv.status === "ACCEPTED").length || 0,
    expired: invitations?.filter((inv) => inv.status === "EXPIRED").length || 0,
  };

  const invitationStatus = [
    {
      id: "all",
      label: "All Invitations",
      count: statusCounts.all,
      icon: Mail,
    },
    {
      id: "pending",
      label: "Pending",
      count: statusCounts.pending,
      icon: Clock,
      variant: "warning",
    },
    {
      id: "accepted",
      label: "Accepted",
      count: statusCounts.accepted,
      icon: CheckCircle2,
      variant: "success",
    },
    {
      id: "expired",
      label: "Expired",
      count: statusCounts.expired,
      icon: XCircle,
      variant: "destructive",
    },
  ];

  return (
    <ScrollArea className="w-full h-[calc(100vh)]">
      <div className="w-full p-[2rem] pt-[3rem]">
        <div className="flex flex-col gap-4">
          <div className="">
            <h1 className="font-bold text-4xl">Invitations</h1>
            <p className="text-muted-foreground mt-2">
              Manage and track all workspace invitations
            </p>
          </div>

          <div className="">
            <InvitationTable
              searchTerm={searchTerm}
              statusFilter={statusFilter}
              data={invitations}
            />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Pending Invitations</span>
              </div>
              <p className="text-2xl font-bold mt-2">{statusCounts.pending}</p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">Accepted</span>
              </div>
              <p className="text-2xl font-bold mt-2">{statusCounts.accepted}</p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm font-medium">Expired</span>
              </div>
              <p className="text-2xl font-bold mt-2">{statusCounts.expired}</p>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

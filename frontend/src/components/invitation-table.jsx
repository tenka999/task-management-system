// components/invitation-table.jsx
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
  Mail,
  Clock,
  CheckCircle2,
  XCircle,
  Send,
  Trash2,
  Copy,
  RefreshCw,
  SearchIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/toast";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
import DialogInviteMember from "./dialog-invite-member";

/**
 * Status configuration for invitations
 */
const invitationStatusConfig = {
  PENDING: {
    label: "Pending",
    variant: "warning",
    icon: <Clock className="h-3 w-3 mr-1" />,
    badgeClass: "bg-yellow-100 text-yellow-800",
  },
  ACCEPTED: {
    label: "Accepted",
    variant: "success",
    icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
    badgeClass: "bg-green-100 text-green-800",
  },
  EXPIRED: {
    label: "Expired",
    variant: "destructive",
    icon: <XCircle className="h-3 w-3 mr-1" />,
    badgeClass: "bg-red-100 text-red-800",
  },
  REVOKED: {
    label: "Revoked",
    variant: "secondary",
    icon: <XCircle className="h-3 w-3 mr-1" />,
    badgeClass: "bg-gray-100 text-gray-800",
  },
};

/**
 * Format date
 */
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Get initials from name or email
 */
const getInitials = (name) => {
  if (!name) return "??";
  return name.slice(0, 2).toUpperCase();
};

/**
 * Format expiry time
 */
const getExpiryStatus = (expiresAt) => {
  if (!expiresAt) return null;
  const now = new Date();
  const expiry = new Date(expiresAt);
  const diffHours = Math.floor((expiry - now) / (1000 * 60 * 60));

  if (diffHours < 0) {
    return { label: "Expired", color: "text-red-500" };
  } else if (diffHours < 24) {
    return { label: `Expires in ${diffHours}h`, color: "text-yellow-500" };
  } else {
    const days = Math.floor(diffHours / 24);
    return { label: `Expires in ${days}d`, color: "text-green-500" };
  }
};

/** @type {import("@tanstack/react-table").ColumnDef<any>[]} */
export const invitationColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "email",
    accessorFn: (row) => row.email || row.inviteeEmail || "",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 hover:bg-muted -ml-3"
      >
        Invited Email
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const email = row.getValue("email");
      const name = row.original.inviteeName || row.original.name || email;

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            {row.original.avatar && (
              <AvatarImage src={row.original.avatar} alt={name} />
            )}
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{name}</span>
            <span className="text-xs text-muted-foreground">{email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") || "MEMBER";
      return (
        <Badge variant="outline" className="capitalize">
          {role.toLowerCase()}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") || "PENDING";
      const config =
        invitationStatusConfig[status] || invitationStatusConfig.PENDING;

      return (
        <Badge variant={config.variant} className="flex items-center">
          {config.icon}
          {config.label}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      if (value === "all") return true;
      return value === row.getValue(id);
    },
  },
  {
    id: "invitedAt",
    accessorFn: (row) => row.createdAt || row.invitedAt,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 hover:bg-muted -ml-3"
      >
        Invited Date
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = row.getValue("invitedAt");
      return <div className="text-muted-foreground">{formatDate(date)}</div>;
    },
  },
  {
    id: "expiresAt",
    accessorFn: (row) => row.expiresAt,
    header: "Expiration",
    cell: ({ row }) => {
      const expiresAt = row.getValue("expiresAt");
      if (!expiresAt)
        return <div className="text-muted-foreground">No expiry</div>;

      const expiryStatus = getExpiryStatus(expiresAt);
      return (
        <div className="flex flex-col">
          <span className="text-muted-foreground text-sm">
            {formatDate(expiresAt)}
          </span>
          {expiryStatus && (
            <span className={`text-xs ${expiryStatus.color}`}>
              {expiryStatus.label}
            </span>
          )}
        </div>
      );
    },
  },
  {
    id: "invitedBy",
    accessorFn: (row) => row.invitedBy?.username ?? "",
    header: "Invited By",
    cell: ({ row }) => {
      console.log(row.getValue("invitedBy"));
      return (
        <div className="text-muted-foreground">{row.getValue("invitedBy")}</div>
        // <div className="text-muted-foreground"></div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const invitation = row.original;
      const [openAlert, setOpenAlert] = React.useState(false);

      const handleCopyLink = () => {
        const inviteLink =
          invitation.inviteLink ||
          `${window.location.origin}/invite/${invitation.token}`;
        navigator.clipboard.writeText(inviteLink);
        toast.add({
          title: "Invitation Link Copied!",
          description: "The invitation link has been copied to clipboard.",
        });
      };

      const handleResend = () => {
        toast.add({
          title: "Invitation Resent",
          description: `Invitation resent to ${invitation.email}`,
        });
      };

      const handleRevoke = () => {
        setOpenAlert(false);
        toast.add({
          variant: "destructive",
          title: "Invitation Revoked",
          description: `Invitation to ${invitation.email} has been revoked.`,
        });
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleCopyLink}>
                <Copy className="mr-2 h-4 w-4" />
                Copy Invite Link
              </DropdownMenuItem>
            </DropdownMenuGroup>

            {invitation.status === "PENDING" && (
              <>
                <DropdownMenuItem onClick={handleResend}>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Resend Invitation
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}

            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
              <AlertDialogTrigger
                render={
                  <Button
                    variant="ghost"
                    onSelect={(e) => e.preventDefault()}
                    className="text-red-600 w-full justify-start"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Revoke Invitation
                  </Button>
                }
              />
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Revoke this invitation?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will revoke the invitation to {invitation.email}. They
                    will no longer be able to join the workspace using this
                    invitation.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleRevoke}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Revoke
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

/**
 * InvitationTable component
 */
export function InvitationTable({
  data = [],
  searchTerm = "",
  statusFilter = "all",
  showToolbar = true,
  showPagination = true,
  defaultPageSize = 5,
}) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });
  const inputRef = React.useRef(null);

  const table = useReactTable({
    data,
    columns: invitationColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    globalFilterFn: (row, columnId, filterValue) => {
      const search = filterValue.toLowerCase();
      const email = (row.getValue("email") || "").toString().toLowerCase();
      const name = (
        row.original.inviteeName ||
        row.original.name ||
        ""
      ).toLowerCase();
      return email.includes(search) || name.includes(search);
    },
  });

  // Apply global search
  React.useEffect(() => {
    table.setGlobalFilter(searchTerm);
  }, [searchTerm, table]);

  // Apply status filter
  React.useEffect(() => {
    if (statusFilter !== "all") {
      table.getColumn("status")?.setFilterValue(statusFilter);
    } else {
      table.getColumn("status")?.setFilterValue(undefined);
    }
  }, [statusFilter, table]);

  const handleClearSearch = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="w-full space-y-4">
      {showToolbar && (
        <div className="space-y-4">
          <div className="w-full">
            <InputGroup className="h-13">
              <InputGroupInput
                ref={inputRef}
                className="text-base!"
                value={searchTerm}
                onChange={(e) => table.setGlobalFilter(e.target.value)}
                placeholder="Search invitations by email or name..."
              />
              <InputGroupAddon>
                <SearchIcon className="size-4 shrink-0 opacity-50" />
              </InputGroupAddon>
              <div className="flex pr-2 gap-2">
                {searchTerm && (
                  <InputGroupButton
                    onClick={handleClearSearch}
                    variant="outline"
                    size="icon"
                  >
                    <IconX />
                  </InputGroupButton>
                )}
                <DialogInviteMember />
              </div>
            </InputGroup>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex gap-2">
            {["all", "PENDING", "ACCEPTED", "EXPIRED"].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  if (status === "all") {
                    table.getColumn("status")?.setFilterValue(undefined);
                  } else {
                    table.getColumn("status")?.setFilterValue(status);
                  }
                }}
              >
                {status === "all"
                  ? "All"
                  : invitationStatusConfig[status]?.label || status}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-semibold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-muted/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={invitationColumns.length}
                  className="h-24 text-center"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Mail className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      No invitations found.
                    </p>
                    <DialogInviteMember />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {showPagination && (
        <div className="flex items-center justify-between px-2">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing{" "}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{" "}
            to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length,
            )}{" "}
            of {table.getFilteredRowModel().rows.length} invitations
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvitationTable;

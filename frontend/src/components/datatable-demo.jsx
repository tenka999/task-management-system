// components/data-table/data-table.jsx
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
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
  Settings2,
  Download,
  Plus,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  SearchIcon,
  PlusIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
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
import { PopoverMembers } from "./popover-members";
import DialogInviteMember from "./dialog-invite-member";
import { IconUserCog, IconUserEdit, IconUserSearch } from "@tabler/icons-react";
import { useState } from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "./ui/item";

/**
 * @typedef {Object} Payment
 * @property {string} id - Unique identifier for the payment
 * @property {number} amount - Payment amount in USD
 * @property {"pending" | "processing" | "success" | "failed"} status - Payment status
 * @property {string} email - Customer email address
 * @property {string} name - Customer name
 * @property {string} date - Payment date
 * @property {"guest" | "member" | "admin" | "owner"} role - Payment role level
 * @property {string} [avatar] - Optional avatar URL
 */

/**
 * @typedef {Object} StatusConfig
 * @property {string} label - Display label for status
 * @property {string} variant - Badge variant for status
 * @property {JSX.Element} icon - Icon component for status
 */

/**
 * @typedef {Object} RoleConfig
 * @property {string} label - Display label for role
 * @property {string} className - CSS classes for role
 * @property {string} badgeVariant - Badge variant for role
 */

// Status configuration with icons
/** @type {Record<string, StatusConfig>} */
const statusConfig = {
  pending: {
    label: "Pending",
    variant: "secondary",
    icon: <Clock className="h-3 w-3 mr-1" />,
  },
  processing: {
    label: "Processing",
    variant: "warning",
    icon: <Loader2 className="h-3 w-3 mr-1 animate-spin" />,
  },
  success: {
    label: "Success",
    variant: "success",
    icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
  },
  failed: {
    label: "Failed",
    variant: "destructive",
    icon: <XCircle className="h-3 w-3 mr-1" />,
  },
};

// Role configuration
/** @type {Record<string, RoleConfig>} */
const roleConfig = {
  guest: {
    label: "Guest",
    className: "text-muted-foreground",
    badgeVariant: "outline",
  },
  member: {
    label: "Member",
    className: "text-blue-600",
    badgeVariant: "secondary",
  },
  admin: {
    label: "Admin",
    className: "text-red-600 font-semibold",
    badgeVariant: "destructive",
  },
  owner: {
    label: "Owner",
    className: "text-red-600 font-semibold",
    badgeVariant: "destructive",
  },
};

// Sample data
/** @type {Payment[]} */
const initialData = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
    name: "Ken Smith",
    date: "2024-01-15",
    role: "owner",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
    name: "Abe Johnson",
    date: "2024-01-14",
    role: "member",
    invitedBy: "Ken Smith",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
    name: "Monserrat Garcia",
    date: "2024-01-13",
    role: "guest",
    invitedBy: "Ken Smith",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
    name: "Silas Brown",
    date: "2024-01-12",
    role: "admin",
    invitedBy: "Ken Smith",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
    name: "Carmella Wilson",
    date: "2024-01-11",
    role: "guest",
    invitedBy: "Ken Smith",
  },
  {
    id: "x1y2z3a4",
    amount: 150,
    status: "pending",
    email: "john.doe@example.com",
    name: "John Doe",
    date: "2024-01-10",
    role: "member",
    invitedBy: "Ken Smith",
  },
  {
    id: "b5c6d7e8",
    amount: 925,
    status: "success",
    email: "jane.smith@example.com",
    name: "Jane Smith",
    date: "2024-01-09",
    role: "member",
    invitedBy: "Ken Smith",
  },
  {
    id: "f9g0h1i2",
    amount: 450,
    status: "processing",
    email: "mike.wilson@example.com",
    name: "Mike Wilson",
    date: "2024-01-08",
    role: "member",
    invitedBy: "Ken Smith",
  },
  {
    id: "j3k4l5m6",
    amount: 675,
    status: "failed",
    email: "sarah.brown@example.com",
    name: "Sarah Brown",
    date: "2024-01-07",
    role: "guest",
    invitedBy: "Ken Smith",
  },
  {
    id: "n7o8p9q0",
    amount: 300,
    status: "success",
    email: "tom.johnson@example.com",
    name: "Tom Johnson",
    date: "2024-01-06",
    role: "guest",
    invitedBy: "Ken Smith",
  },
  {
    id: "r1s2t3u4",
    amount: 550,
    status: "pending",
    email: "emma.davis@example.com",
    name: "Emma Davis",
    date: "2024-01-05",
    role: "member",
    invitedBy: "Ken Smith",
  },
  {
    id: "v5w6x7y8",
    amount: 800,
    status: "success",
    email: "alex.miller@example.com",
    name: "Alex Miller",
    date: "2024-01-04",
    role: "member",
    invitedBy: "Ken Smith",
  },
];

const roleCount = initialData.reduce((acc, user) => {
  if (user.role === "owner") {
    acc["admin"] = (acc["admin"] || 0) + 1;
  } else {
    acc[user.role] = (acc[user.role] || 0) + 1;
  }
  return acc;
}, {});

const memberStatus = [
  {
    id: "all-users",
    label: "All User",
    count: initialData.length,
  },
  {
    id: "admin",
    label: "Admins",
    count: roleCount.admin || 0,
  },
  {
    id: "member",
    label: "Members",
    count: roleCount.member || 0,
  },
  {
    id: "guest",
    label: "Guests",
    count: roleCount.guest || 0,
  },
];

const items = [
  {
    label: "Member",
    value: "member",
    description: "Can access all public item in your workspace",
    icon: IconUserEdit,
  },
  {
    label: "Guest",
    value: "guest",
    description:
      "Can't use all features or be added to Spaces. Can only access items shared with them.",
    icon: IconUserSearch,
  },
  {
    label: "Admin",
    value: "admin",
    description:
      "Can manage Spaces, People,Billing and other Workspace settings.",
    icon: IconUserCog,
  },
];

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

/**
 * Format date
 * @param {string} dateString - Date string to format
 * @returns {string} Formatted date string
 */
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

/** @type {import("@tanstack/react-table").ColumnDef<Payment>[]} */
export const columns = [
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
  //   {
  //     accessorKey: "email",
  //     header: "Email",
  //     cell: ({ row }) => {
  //       const email = row.getValue("email"); // Sekarang ini akan berfungsi
  //       return <div>{email}</div>;
  //     },
  //   },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 hover:bg-muted -ml-3"
      >
        Customer
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const name = row.getValue("name");
      const email = row.original.email;

      const avatar = row.original.avatar;

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            {avatar && <AvatarImage src={avatar} alt={name} />}
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const config = statusConfig[status] || statusConfig.pending;

      return (
        <Badge variant={config.variant} className="flex items-center">
          {config.icon}
          {config.label}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role");
      const config = roleConfig[role] || roleConfig.low;
      const [EditRole, setEditRole] = useState("member");
      const EditRoleMember = items.find((item) => item.value === EditRole);

      return (
        // <Badge variant={config.badgeVariant} className={config.className}>
        //   {config.label}
        // </Badge>
        <Select
          value={EditRole}
          onValueChange={setEditRole}
          defaultValue={items[0].value}
          items={items}
        >
          <SelectTrigger className="bg-transparent w-full h-full! ">
            <SelectValue className="">
              <Item size="xs" className="p-0  ">
                <ItemContent>
                  <ItemTitle className="whitespace-nowrap">
                    {EditRoleMember.label}
                  </ItemTitle>
                </ItemContent>
              </Item>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="w-[350px]" alignItemWithTrigger={false}>
            <SelectGroup>
              {/* <SelectLabel>Fruits</SelectLabel> */}
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  <Item size="xs" className="p-0 ">
                    <ItemMedia className="border p-3 bg-secondary rounded-lg">
                      <item.icon />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle className="whitespace-nowrap">
                        {item.label}
                      </ItemTitle>
                      <ItemDescription className="whitespace-normal text-xs">
                        {item.description}
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 hover:bg-muted -ml-3"
      >
        Last active
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = row.getValue("date");
      return <div className="text-muted-foreground">{formatDate(date)}</div>;
    },
  },

  {
    accessorKey: "invitedBy",
    header: "Invited by",
    cell: ({ row }) => {
      // const status = row.getValue("status");
      // const config = statusConfig[status] || statusConfig.pending;

      return (
        <div className="text-muted-foreground">{row.getValue("invitedBy")}</div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      //   const { toast } = useToast();

      const handleCopyId = () => {
        navigator.clipboard.writeText(payment.id);
        // toast.add({
        //   type: "Copied!",
        //   description: "Event has been created.",
        // });
        toast.add({
          title: "Copied!",
          description: `Payment ID ${payment.id} copied to clipboard.`,
        });
      };

      const handleDelete = () => {
        // toast.add({
        //   type: "Copied!",
        //   description: "Event has been created.",
        // });
        setOpenAlert(false);
        const id = toast.add({
          variant: "destructive",
          title: "Payment Deleted",
          description: `Payment ${payment.id} has been deleted.`,
          actionProps: {
            children: "Undo",
            onClick() {
              toast.close(id);
            },
          },
        });
      };
      const [openAlert, setOpenAlert] = React.useState(false);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            }
          ></DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleCopyId}>
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuGroup>

            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
              <AlertDialogTrigger
                render={
                  <Button
                    variant="ghost"
                    onSelect={(e) => e.preventDefault()}
                    className="text-red-600 w-full justify-start"
                  >
                    Delete payment
                  </Button>
                }
              ></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the payment and remove the data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
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
 * DataTableDemo component with full functionality
 * @param {Object} props - Component props
 * @param {Payment[]} [props.data] - Array of payment data
 * @param {boolean} [props.showToolbar] - Show/hide toolbar
 * @param {boolean} [props.showPagination] - Show/hide pagination
 * @param {number} [props.defaultPageSize] - Default page size
 */
export function DataTableDemo({
  data = initialData,
  showToolbar = true,
  showPagination = true,
  defaultPageSize = 5,
}) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [roleFilter, setRoleFilter] = React.useState("all-users");
  // const [inputMember, setInputMember] = React.useState("");
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });
  //   const { toast } = useToast();

  const table = useReactTable({
    data,
    columns,
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
      globalFilter,
      // inputMember,
      pagination,
    },
    globalFilterFn: (row, columnId, filterValue) => {
      const search = filterValue.toLowerCase();
      const name = row.getValue("name")?.toString().toLowerCase() ?? "";
      const email = row.getValue("email")?.toString().toLowerCase() ?? "";
      const id = row.original.id?.toLowerCase() ?? "";
      return (
        name.includes(search) || email.includes(search) || id.includes(search)
      );
    },
  });

  // Apply status filter
  React.useEffect(() => {
    if (statusFilter !== "all") {
      table.getColumn("status")?.setFilterValue([statusFilter]);
    } else {
      table.getColumn("status")?.setFilterValue(undefined);
    }
  }, [statusFilter, table]);

  // Apply role filter
  React.useEffect(() => {
    if (roleFilter !== "all-users") {
      if (roleFilter === "admin") {
        table.getColumn("role")?.setFilterValue(["admin", "owner"]);
      } else {
        table.getColumn("role")?.setFilterValue([roleFilter]);
      }
    } else {
      table.getColumn("role")?.setFilterValue(undefined);
    }
  }, [roleFilter, table]);

  /**
   * Export data to CSV
   */
  const exportData = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const exportRows =
      selectedRows.length > 0 ? selectedRows : table.getFilteredRowModel().rows;

    if (exportRows.length === 0) {
      toast.add({
        title: "No data to export",
        description: "There are no rows to export.",
        variant: "destructive",
      });
      return;
    }

    const csvData = exportRows.map((row) => ({
      ID: row.original.id,
      Name: row.getValue("name"),
      Email: row.getValue("email"),
      Status: row.getValue("status"),
      Role: row.getValue("role"),
      Amount: row.getValue("amount"),
      Date: row.getValue("date"),
    }));

    const csv = [
      Object.keys(csvData[0]).join(","),
      ...csvData.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `data-export-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast.add({
      title: "Export Successful",
      description: `${exportRows.length} rows exported to CSV.`,
    });
  };

  /**
   * Clear all filters
   */
  const clearFilters = () => {
    setGlobalFilter("");
    setStatusFilter("all");
    setRoleFilter("all-users");
    table.resetColumnFilters();
    toast.add({
      title: "Filters Cleared",
      description: "All filters have been reset.",
    });
  };

  const inputRef = React.useRef(null);

  function handleInputMember(event) {
    setGlobalFilter(event.target.value);
  }
  const handleClear = () => {
    setGlobalFilter("");
    inputRef.current?.focus();
  };

  return (
    <div className="w-full space-y-4">
      {showToolbar && (
        <div className=" space-y-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full">
            <InputGroup className="h-13">
              <InputGroupInput
                ref={inputRef}
                className="text-base!"
                value={globalFilter}
                onChange={(e) => handleInputMember(e)}
                placeholder="Search or invite by email"
              />
              <InputGroupAddon>
                <SearchIcon className="size-4 shrink-0 opacity-50" />
              </InputGroupAddon>
              <div className="flex pr-2 gap-2">
                <InputGroupButton
                  onClick={handleClear}
                  variant="outline"
                  size="icon"
                >
                  <IconX />
                </InputGroupButton>
                <DialogInviteMember />
              </div>
            </InputGroup>
          </div>
          <div className="">
            <PopoverMembers
              roleFilter={roleFilter}
              setRoleFilter={setRoleFilter}
              memberStatus={memberStatus}
            />
          </div>
        </div>
      )}

      {/* Selection info */}
      {/* {table.getFilteredSelectedRowModel().rows.length > 0 && (
        <div className="flex items-center justify-between rounded-lg bg-muted px-4 py-2">
          <span className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </span>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const selectedIds = table
                  .getFilteredSelectedRowModel()
                  .rows.map((row) => row.original.id);
                toast({
                  title: "Selected Rows",
                  description: `IDs: ${selectedIds.join(", ")}`,
                });
              }}
            >
              View Selected
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => table.toggleAllPageRowsSelected(false)}
            >
              Clear selection
            </Button>
          </div>
        </div>
      )} */}

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
                  className="hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => row.toggleSelected()}
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Search className="h-8 w-8 text-muted-foreground" />
                    <p className="text-muted-foreground">No results found.</p>
                    <Button variant="outline" size="sm" onClick={clearFilters}>
                      Clear filters
                    </Button>
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
            of {table.getFilteredRowModel().rows.length} entries
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

export default DataTableDemo;

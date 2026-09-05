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

/**
 * @typedef {Object} Payment
 * @property {string} id - Unique identifier for the payment
 * @property {number} amount - Payment amount in USD
 * @property {"pending" | "processing" | "success" | "failed"} status - Payment status
 * @property {string} email - Customer email address
 * @property {string} name - Customer name
 * @property {string} date - Payment date
 * @property {"low" | "medium" | "high"} priority - Payment priority level
 * @property {string} [avatar] - Optional avatar URL
 */

/**
 * @typedef {Object} StatusConfig
 * @property {string} label - Display label for status
 * @property {string} variant - Badge variant for status
 * @property {JSX.Element} icon - Icon component for status
 */

/**
 * @typedef {Object} PriorityConfig
 * @property {string} label - Display label for priority
 * @property {string} className - CSS classes for priority
 * @property {string} badgeVariant - Badge variant for priority
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

// Priority configuration
/** @type {Record<string, PriorityConfig>} */
const priorityConfig = {
  low: {
    label: "Low",
    className: "text-muted-foreground",
    badgeVariant: "outline",
  },
  medium: {
    label: "Medium",
    className: "text-blue-600",
    badgeVariant: "secondary",
  },
  high: {
    label: "High",
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
    priority: "high",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
    name: "Abe Johnson",
    date: "2024-01-14",
    priority: "medium",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
    name: "Monserrat Garcia",
    date: "2024-01-13",
    priority: "low",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
    name: "Silas Brown",
    date: "2024-01-12",
    priority: "high",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
    name: "Carmella Wilson",
    date: "2024-01-11",
    priority: "medium",
  },
  {
    id: "x1y2z3a4",
    amount: 150,
    status: "pending",
    email: "john.doe@example.com",
    name: "John Doe",
    date: "2024-01-10",
    priority: "low",
  },
  {
    id: "b5c6d7e8",
    amount: 925,
    status: "success",
    email: "jane.smith@example.com",
    name: "Jane Smith",
    date: "2024-01-09",
    priority: "high",
  },
  {
    id: "f9g0h1i2",
    amount: 450,
    status: "processing",
    email: "mike.wilson@example.com",
    name: "Mike Wilson",
    date: "2024-01-08",
    priority: "medium",
  },
  {
    id: "j3k4l5m6",
    amount: 675,
    status: "failed",
    email: "sarah.brown@example.com",
    name: "Sarah Brown",
    date: "2024-01-07",
    priority: "high",
  },
  {
    id: "n7o8p9q0",
    amount: 300,
    status: "success",
    email: "tom.johnson@example.com",
    name: "Tom Johnson",
    date: "2024-01-06",
    priority: "low",
  },
  {
    id: "r1s2t3u4",
    amount: 550,
    status: "pending",
    email: "emma.davis@example.com",
    name: "Emma Davis",
    date: "2024-01-05",
    priority: "medium",
  },
  {
    id: "v5w6x7y8",
    amount: 800,
    status: "success",
    email: "alex.miller@example.com",
    name: "Alex Miller",
    date: "2024-01-04",
    priority: "high",
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
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority");
      const config = priorityConfig[priority] || priorityConfig.low;

      return (
        <Badge variant={config.badgeVariant} className={config.className}>
          {config.label}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex items-center gap-2 hover:bg-muted -ml-3"
      >
        Amount
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return <div className="font-medium">{formatCurrency(amount)}</div>;
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
        Date
        <ArrowUpDown className="h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = row.getValue("date");
      return <div className="text-muted-foreground">{formatDate(date)}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      //   const { toast } = useToast();

      const handleCopyId = () => {
        console.log(payment.id);
        navigator.clipboard.writeText(payment.id);
        toast.add({
          type: "Copied!",
          description: "Event has been created.",
        });
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
  inputMember,
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
  const [priorityFilter, setPriorityFilter] = React.useState("all");
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
      // globalFilter,
      inputMember,
      pagination,
    },
    // globalFilterFn: (row, columnId, filterValue) => {
    //   const search = filterValue.toLowerCase();
    //   const name = row.getValue("name")?.toString().toLowerCase() ?? "";
    //   const email = row.getValue("email")?.toString().toLowerCase() ?? "";
    //   const id = row.original.id?.toLowerCase() ?? "";
    //   return (
    //     name.includes(search) || email.includes(search) || id.includes(search)
    //   );
    // },
    inputMemberFn: (row, columnId, filterValue) => {
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

  // Apply priority filter
  React.useEffect(() => {
    if (priorityFilter !== "all") {
      table.getColumn("priority")?.setFilterValue([priorityFilter]);
    } else {
      table.getColumn("priority")?.setFilterValue(undefined);
    }
  }, [priorityFilter, table]);

  /**
   * Export data to CSV
   */
  const exportData = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const exportRows =
      selectedRows.length > 0 ? selectedRows : table.getFilteredRowModel().rows;

    if (exportRows.length === 0) {
      toast({
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
      Priority: row.getValue("priority"),
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

    toast({
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
    setPriorityFilter("all");
    table.resetColumnFilters();
    toast({
      title: "Filters Cleared",
      description: "All filters have been reset.",
    });
  };

  return (
    <div className="w-full space-y-4">
      {showToolbar && (
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
            <div className="relative flex-1 sm:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                value={globalFilter}
                onChange={(event) => setGlobalFilter(event.target.value)}
                className="pl-8"
              />
            </div>
            <div className="flex space-x-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {(globalFilter ||
              statusFilter !== "all" ||
              priorityFilter !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground"
              >
                Clear Filters
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button variant="outline" size="sm" onClick={exportData}>
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  }
                ></TooltipTrigger>
                <TooltipContent>Export as CSV</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" size="sm">
                    <Settings2 className="mr-2 h-4 w-4" />
                    Columns
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                }
              ></DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add New
            </Button>
          </div>
        </div>
      )}

      {/* Selection info */}
      {table.getFilteredSelectedRowModel().rows.length > 0 && (
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

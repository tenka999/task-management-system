import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  IconAlertTriangle,
  IconPencil,
  IconX,
  IconTrash,
} from "@tabler/icons-react";

import { toast } from "@/components/ui/toast";

import { MemberFilterProvider } from "@/context/MemberFilterProvider";
import { PopoverMembers } from "@/components/popover-members";
import { PopoverIcon } from "@/components/popover-icon";
import LogoUploader from "@/components/logo-uploader";
import { PopoverAvatar } from "@/components/popover-avatar";
import { useWorkspaceApi } from "@/presentation/logics/app/useWorkspaceApi";
import { useWorkspace } from "@/hooks/useWorkspace";

// Schema validasi
const workspaceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),

  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters.")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message:
        "Slug must contain only lowercase letters, numbers, and hyphens.",
    }),

  description: z.string().optional(),

  logo: z
    .union([z.instanceof(File), z.string()])
    .nullable()
    .optional(),

  icon: z.string().optional().or(z.literal("")),

  type: z.enum(["PERSONAL", "TEAM", "ENTERPRISE"]),

  settings: z.object({
    allowGuest: z.boolean().optional(),
  }),
});
// Component Utama
export default function WorkspaceSettingsPage({ workspaceId, onSuccess }) {
  const { activeWorkspace, workspaces, switchWorkspace, isSwitching } =
    useWorkspace();

  // const [activeWorkspace, setactiveWorkspace] = useState(activeWorkspace);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState("ACTIVE");
  const [owner, setOwner] = useState(activeWorkspace?.owner || "jane.doe");
  const settings =
    typeof activeWorkspace?.settings === "string"
      ? JSON.parse(activeWorkspace?.settings)
      : activeWorkspace?.settings;

  const {
    useAllWorkspace,
    createWorkspace,
    updateWorkspace,
    useWorkspaceBySlug,
    deleteWorkspace,
    deleteWorkspaces,
  } = useWorkspaceApi();

  const form = useForm({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      logo: null,
      icon: "",
      type: "TEAM",
      settings: {
        allowGuest: false,
      },
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await updateWorkspace.mutateAsync({
        id: activeWorkspace?.id,
        payload: values,
      });
      toast.add({
        title: "Success",
        description: "Workspace update successfully",
      });
      // fetchData();
    } catch (error) {
      toast.add({
        title: "Error",
        description: "Failed to update workspace",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      // setShowModal(false);
    }
  };

  const handleDeactivate = async () => {
    try {
      setLoading(true);
      await updateWorkspace.mutateAsync({
        id: activeWorkspace?.id,
        payload: { ...activeWorkspace, status: "SUSPENDED" },
      });
      setIsActive("SUSPENDED");
      toast.add({
        title: "Success",
        description: "Workspace deactivated successfully",
      });
      setOpen(false);
    } catch (error) {
      console.error("Error:", error);
      toast.add({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReactivate = async () => {
    try {
      setLoading(true);
      await updateWorkspace.mutateAsync({
        id: activeWorkspace?.id,
        payload: { ...activeWorkspace, status: "ACTIVE" },
      });
      setIsActive("ACTIVE");
      toast.add({
        title: "Success",
        description: "Workspace reactivated successfully",
      });
      setOpen(false);
    } catch (error) {
      console.error("Error:", error);
      toast.add({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    try {
      if (isActive) {
        await handleDeactivate();
      } else {
        await handleReactivate();
      }

      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTransferOwnership = () => {
    console.log("Transferring ownership to:", owner);
  };

  const handleDeleteWorkspace = () => {
    console.log("Deleting workspace...");
  };

  useEffect(() => {
    if (activeWorkspace) {
      setIsActive(activeWorkspace.status);
      form.reset({
        name: activeWorkspace?.name || "",
        slug: activeWorkspace?.slug || "",
        description: activeWorkspace?.description || "",

        // URL lama dari server
        logo: activeWorkspace?.logoUrl || "",

        icon: activeWorkspace?.icon || "",

        type: activeWorkspace?.type || "TEAM",

        settings: {
          allowGuest: settings.allowGuest || false,
        },
      });
    }
  }, [activeWorkspace]);
  return (
    <MemberFilterProvider>
      <ScrollArea className="w-full h-[calc(100vh-60px)]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full px-[10rem] py-[5rem]"
          >
            <div className="flex flex-col gap-8 h-full">
              {/* Header */}
              <div>
                <h1 className="font-bold text-4xl">Workspace Settings</h1>
                <p className="text-muted-foreground mt-2">
                  Manage your workspace settings and preferences.
                </p>
              </div>

              {/* General Settings */}
              <div className="flex flex-col gap-4">
                <h2 className="font-semibold text-2xl">General</h2>
                <div className="h-full border rounded-xl flex">
                  <div className="w-full h-full">
                    <div className="w-full h-full gap-0">
                      {/* Workspace Name */}
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="flex-1 flex flex-row items-center p-5 border-b">
                            <FormLabel className="w-1/3">
                              Workspace Name
                            </FormLabel>
                            <FormControl className="w-2/3">
                              <Input
                                id="workspace-name"
                                type="text"
                                placeholder="Enter workspace name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Workspace Slug */}
                      <FormField
                        control={form.control}
                        name="slug"
                        render={({ field }) => (
                          <FormItem className="flex-1 flex flex-row items-center p-5 border-b">
                            <FormLabel className="w-1/3">Custom URL</FormLabel>
                            <FormControl className="w-2/3">
                              <Input
                                id="workspace-slug"
                                type="text"
                                placeholder="Enter workspace slug"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Description */}
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className="flex-1 flex flex-row p-5 border-b">
                            <FormLabel className="w-1/3">Description</FormLabel>
                            <FormControl className="w-2/3 ">
                              <Textarea
                                id="workspace-description"
                                placeholder="Enter workspace description"
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Logo */}
                      <FormField
                        control={form.control}
                        name="logo"
                        render={({ field }) => (
                          <FormItem className="flex-1 flex flex-row items-center p-5 border-b">
                            <FormLabel className="w-1/3">Logo</FormLabel>

                            <FormControl className="w-2/3">
                              <div className="flex items-center justify-end gap-4">
                                <div className="flex flex-col gap-2">
                                  <LogoUploader title={false} field={field} />
                                </div>
                              </div>
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Icon */}
                      <FormField
                        control={form.control}
                        name="icon"
                        render={({ field }) => (
                          <FormItem className="flex-1 flex flex-row items-center p-5 border-b">
                            <FormLabel className="w-1/3">Icon</FormLabel>
                            <FormControl className="w-2/3 ">
                              <div className="flex items-center justify-end gap-4  ">
                                <div className="flex flex-col gap-2 ">
                                  <PopoverIcon
                                    showLabel={true}
                                    showPercent={false}
                                    field={field}
                                  />
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Workspace Type */}
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem className="flex-1 flex flex-row items-center p-5 border-b">
                            <FormLabel className="w-1/3">Type</FormLabel>
                            <FormControl className="w-2/3">
                              <div className="flex items-center justify-end gap-4  ">
                                <div className="flex flex-col gap-2 ">
                                  <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                  >
                                    <SelectTrigger>
                                      {field.value.slice(0, 1).toUpperCase() +
                                        field.value.slice(1).toLowerCase()}
                                      {/* <SelectValue placeholder="Select workspace type" /> */}
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="PERSONAL">
                                        Personal
                                      </SelectItem>
                                      <SelectItem value="TEAM">Team</SelectItem>
                                      <SelectItem value="ENTERPRISE">
                                        Enterprise
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Allow Guest */}
                      <FormField
                        control={form.control}
                        name="settings.allowGuest"
                        render={({ field }) => (
                          <FormItem className="flex-1 flex flex-row items-center p-5">
                            <FormLabel className="w-1/3">Allow Guest</FormLabel>
                            <FormControl className="w-2/3">
                              <div className="flex items-center justify-end gap-4  ">
                                <div className="flex flex-col gap-2 ">
                                  <div className="flex items-center gap-2">
                                    <Switch
                                      id="allow-guest"
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                    <Label htmlFor="allow-guest">
                                      {field.value ? "Enabled" : "Disabled"}
                                    </Label>
                                  </div>
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Ownership */}
              <div className="flex flex-col gap-4">
                <h2 className="font-semibold text-2xl">Ownership</h2>
                <div className="border rounded-xl">
                  <div className=" p-5 w-full h-full">
                    <div className="w-full h-full gap-0">
                      <div className="flex-1 flex flex-row items-center ">
                        <div className="w-1/3">
                          <Label htmlFor="workspace-owner">
                            Transfer ownership to another user
                          </Label>
                        </div>
                        <div className="w-2/3 flex items-center gap-4">
                          <div className="flex items-center justify-end gap-2 flex-1">
                            <PopoverAvatar
                              create={false}
                              unassigned={false}
                              variant={"ghost"}
                              useCommandOwnerWorkspace={true}
                            />
                          </div>
                          {/* <Button variant="outline" size="sm">
                              Transfer Ownership
                            </Button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="flex flex-col gap-4">
                <h2 className="font-semibold text-2xl text-destructive">
                  Danger Zone
                </h2>
                <div className="border border-destructive/50 rounded-xl bg-destructive/5">
                  <div className="w-full h-full">
                    <div className="w-full h-full gap-0">
                      <div className="flex-1 flex flex-row items-center px-5 py-4">
                        <div className="flex-1">
                          <Label
                            htmlFor="workspace-status"
                            className="text-destructive"
                          >
                            {isActive === "ACTIVE"
                              ? "Deactivate Workspace"
                              : "Reactivate Workspace"}
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            {isActive === "ACTIVE"
                              ? "Deactivating will prevent all members from accessing the workspace."
                              : "Reactivate to restore access for all members."}
                          </p>
                        </div>
                        <AlertDialog open={open} onOpenChange={setOpen}>
                          <AlertDialogTrigger
                            render={
                              <Button
                                variant={
                                  isActive === "ACTIVE"
                                    ? "destructive"
                                    : "default"
                                }
                                size="sm"
                                disabled={loading}
                                type="button"
                              >
                                <IconAlertTriangle className="w-4 h-4 mr-2" />
                                {isActive === "ACTIVE"
                                  ? "Deactivate"
                                  : "Reactivate"}
                              </Button>
                            }
                          ></AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                {isActive === "ACTIVE"
                                  ? "Deactivate Workspace?"
                                  : "Reactivate Workspace?"}
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                {isActive === "ACTIVE"
                                  ? "This action will temporarily disable all workspace access. You can reactivate at any time."
                                  : "This will restore access to all workspace members."}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={
                                  isActive === "ACTIVE"
                                    ? handleDeactivate
                                    : handleReactivate
                                }
                                className={
                                  isActive === "ACTIVE"
                                    ? "bg-destructive hover:bg-destructive/90"
                                    : ""
                                }
                                disabled={loading}
                              >
                                {isActive === "ACTIVE"
                                  ? "Deactivate"
                                  : "Reactivate"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                      <div className="flex-1 flex flex-row items-center px-5 py-4">
                        <div className="flex-1">
                          <Label
                            htmlFor="workspace-status"
                            className="text-destructive"
                          >
                            Delete this workspace forever
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Deleting will permanently remove this workspace.
                          </p>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger
                            render={
                              <Button
                                variant={"destructive"}
                                size="sm"
                                disabled={loading}
                                type="button"
                              >
                                <IconTrash className="w-4 h-4 mr-2" />
                                {"Delete"}
                              </Button>
                            }
                          ></AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Workspace
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action will permanently delete this
                                workspace. This action cannot be undone..
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={handleDeleteWorkspace}
                                className={
                                  "bg-destructive hover:bg-destructive/90"
                                }
                                disabled={loading}
                              >
                                {"Delete"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => form.reset()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save Changes
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </ScrollArea>
    </MemberFilterProvider>
  );
}

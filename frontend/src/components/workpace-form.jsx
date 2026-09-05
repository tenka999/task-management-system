// src/components/workspace/workspace-form.jsx
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import LogoUploader from "@/components/logo-uploader";
import { Label } from "./ui/label";
import { useWorkspaceApi } from "@/presentation/logics/app/useWorkspaceApi";
import { toast } from "./ui/toast";
import { PopoverIcon } from "./popover-icon";

export function WorkspaceForm({ initialData, onSubmit, isLoading }) {
  const {
    useAllWorkspaces,

    createWorkspace,
    useWorkspaceBySlug,
    deleteWorkspace,
    deleteWorkspaces,
  } = useWorkspaceApi();

  const { data: workspaces } = useAllWorkspaces();
  const [logoActive, setLogoActive] = React.useState(false);

  const workspaceSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    slug: z
      .string()
      .min(2, {
        message: "Slug must be at least 2 characters.",
      })
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message:
          "Slug must contain only lowercase letters, numbers, and hyphens.",
      })
      .refine(() => !data, {
        message: "Slug already exists.",
      }),
    description: z.string().optional(),
    logoUrl: z.string().url().optional().or(z.literal("")),
    icon: z.string().optional().or(z.literal("")),
    type: z.enum(["PERSONAL", "TEAM", "ENTERPRISE"]),
    settings: z.object({
      allowGuest: z.boolean().optional(),
    }),
  });

  const form = useForm({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
      logoUrl: initialData?.logoUrl || "",
      icon: initialData?.icon || "",
      type: initialData?.type || "TEAM",
      settings: {
        allowGuest: initialData?.settings?.allowGuest || false,
      },
    },
  });

  const { data, isPending, isError, error, refetch } = useWorkspaceBySlug(
    form.getValues("slug"),
  );

  const handleSubmit = async (values) => {
    console.log(values);
    // if (!data) {
    //   return await onSubmit(values);
    // }
    // return;
  };

  // Auto-generate slug from name
  const handleNameChange = (e) => {
    const name = e.target.value;
    const generateSlug = (value) => {
      return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-");
    };
    // Only auto-generate slug if user hasn't manually edited it
    if (form.getValues("slug") === generateSlug(form.getValues("name"))) {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      form.setValue("slug", slug);
    }
    form.setValue("name", name);
  };

  return (
    <div className="h-full mt-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col justify-evenly space-y-4  h-full"
        >
          <div className="flex  justify-between gap-5 ">
            <div className="flex-1 flex flex-col justify-between">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter workspace name"
                        {...field}
                        onChange={handleNameChange}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your workspace display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="workspace-slug" {...field} />
                    </FormControl>
                    <FormDescription>
                      Unique identifier for your workspace URL.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter workspace description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex-1 flex flex-col  gap-3">
              <div className="">
                {!logoActive && (
                  <div className="">
                    <FormField
                      control={form.control}
                      name="icon"
                      render={({ field }) => (
                        <>
                          <div className="flex  flex-col gap-3 ">
                            <FormLabel>Icon</FormLabel>
                            <div className="flex items-center justify-between ">
                              <PopoverIcon
                                showLabel={true}
                                showPercent={false}
                                item={field}
                                field={field}
                              />
                              <p>Or</p>
                              <Button onClick={() => setLogoActive(true)}>
                                Upload Logo
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    />
                  </div>
                )}
                {logoActive && (
                  <div className="">
                    <FormField
                      control={form.control}
                      name="logoUrl"
                      render={({ field }) => (
                        <div className="flex flex-col gap-2 ">
                          <LogoUploader field={field} />
                          <Button
                            className={"self-end"}
                            onClick={() => setLogoActive(false)}
                          >
                            Use Icon
                          </Button>
                        </div>
                      )}
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-2 ">
                <div className=" flex-1 gap-4">
                  <FormField
                    className="w-full"
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select
                          className="w-full"
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="PERSONAL">Personal</SelectItem>
                            <SelectItem value="TEAM">Team</SelectItem>
                            <SelectItem value="ENTERPRISE">
                              Enterprise
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="settings.allowGuest"
                    render={({ field }) => (
                      <FormItem className="flex gap-1 flex-col">
                        <label htmlFor="allow-guest">Setting</label>
                        <div className="flex justify-end items-center space-x-2">
                          <FormLabel>Allow guest</FormLabel>
                          <Switch
                            id="allow-guest"
                            {...field}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initialData ? "Update" : "Create"} Workspace
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

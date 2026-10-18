import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import {
  CalendarIcon,
  Loader2,
  Plus,
  Pencil,
  Trash2,
  Clock3,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import LogoUploader from "./logo-uploader";
import { PopoverStatus } from "./popover-status";
import { PopoverPriority } from "./popover-priority";
import { PopoverIcon } from "./popover-icon";
import { PopoverLabel } from "./popover-label";
import { PopoverAvatar } from "./popover-avatar";
import { PopoverProject } from "./popover-project";
import { useTaskApi } from "@/presentation/logics/app/useTask";
import { toast } from "./ui/toast";

// Enum status
const ProjectStatus = {
  inProgress: "In Progress",
  technicalReview: "Technical Review",
  done: "Done",
  paused: "Paused",
  todo: "Todo",
  backlog: "Backlog",
  triage: "Triage",
  idea: "Idea",
  "product-feedback": "Product Feedback",
  blocked: "Blocked",
  shipped: "Shipped",
};

// Schema validasi
const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Nama task wajib diisi")
    .max(100, "Maksimal 100 karakter"),
  description: z.string().max(500, "Maksimal 500 karakter").optional(),
  dueDate: z.date().optional(),
  estimatedTime: z.coerce.number().optional(),
  status: z.string(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT", "NO_PRIORITY"]),
  sprintId: z.string().optional(),
  assigneeId: z.string().optional(),
  labels: z.optional(z.array(z.object({ labelId: z.int() }))),
  projectId: z.string(),
});

// Enum status
// const taskStatus = {
//   ACTIVE: "Active",
//   INACTIVE: "Inactive",
//   COMPLETED: "Completed",
//   ARCHIVED: "Archived",
// };

// Component Dialog Utama
export function TaskDialog({
  mode = "create",
  task = null,
  trigger,
  onSuccess,
  workspaceId,
  createdById,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { createTask, updateTask, deleteTask } = useTaskApi();

  const isEdit = mode === "edit";
  const isDelete = mode === "delete";
  const isView = mode === "view";

  const form = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      dueDate: task?.dueDate ? new Date(task.dueDate) : undefined,
      estimatedTime: task?.estimatedTime || 0,
      status: task?.status || "todo",
      priority: task?.priority || "NO_PRIORITY",
      sprintId: task?.sprintId || "",
      assigneeId: task?.assigneeId || "",
      projectId: task?.projectId || "",
      labels: task?.labels || [],
    },
  });

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const payload = {
        ...values,
        workspaceId,
        dueDate: values.dueDate?.toISOString(),
      };

      if (isEdit) {
        await updateTask.mutateAsync({
          ...payload,
          taskId: task.id,
        });

        toast.add({
          title: "Success",
          description: "Task updated successfully",
        });
      } else {
        console.log("payload", payload);
        await createTask.mutateAsync({
          ...payload,
        });
        toast.add({
          title: "Success",
          description: "Task created successfully",
        });
        // console.log("payload", payload);

        // if (!response.ok) throw new Error("Failed to create project");
      }

      setOpen(false);
      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/projects/${project.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete project");

      console.log("Project deleted successfully");
      setDeleteDialogOpen(false);
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const projectId = useWatch({
    control: form.control,
    name: "projectId",
  });

  useEffect(() => {
    form.setValue("assigneeId", "");
  }, [projectId]);

  const renderTrigger = () => {
    if (trigger) return trigger;

    if (isDelete) {
      return (
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      );
    }

    if (isEdit) {
      return (
        <Button variant="ghost" size="sm">
          <Pencil className="h-4 w-4 mr-2" />
          Edit
        </Button>
      );
    }

    return (
      <Button variant="secondary">
        <Plus className="h-4 w-4 mr-2" />
        New Task
      </Button>
    );
  };

  if (isDelete) {
    return (
      <>
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogTrigger render={renderTrigger()}></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Task</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{task?.name}"? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={loading}
                className="bg-red-500 hover:bg-red-600"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={renderTrigger()}></DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-h-[70vh] bg-background  ">
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold">
            {isEdit ? "Edit task" : isView ? "task Details" : "Create New Task"}
          </DialogTitle>
        </DialogHeader>
        {isView ? (
          // View Mode
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              {task?.icon && (
                <img
                  src={task.icon}
                  alt="task icon"
                  className="w-12 h-12 rounded-lg"
                />
              )}
              {/* <div>
                <h3 className="text-lg font-semibold">{task?.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {task?.taskKey}
                </p>
              </div> */}
            </div>

            {task?.description && (
              <div>
                <h4 className="text-sm font-medium mb-1">Description</h4>
                <p className="text-sm text-muted-foreground">
                  {task.description}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Status</h4>
                <p className="text-sm">{ProjectStatus[task?.status]}</p>
              </div>
              {/* <div>
                <h4 className="text-sm font-medium mb-1">Visibility</h4>
                <p className="text-sm">
                  {task?.isPublic ? "Public" : "Private"}
                </p>
              </div> */}
              {/* <div>
                <h4 className="text-sm font-medium mb-1">Start Date</h4>
                <p className="text-sm">
                  {task?.startDate
                    ? format(new Date(project.startDate), "PPP")
                    : "Not set"}
                </p>
              </div> */}
              {/* <div>
                <h4 className="text-sm font-medium mb-1">End Date</h4>
                <p className="text-sm">
                  {project?.endDate
                    ? format(new Date(project.endDate), "PPP")
                    : "Not set"}
                </p>
              </div> */}
            </div>
          </div>
        ) : (
          // Create/Edit Mode
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className=" space-y-4 flex flex-col justify-between  h-full"
            >
              <div className="flex justify-between flex-col gap-5">
                <div className="flex-1 flex flex-col gap-3">
                  {/* Nama task */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter task title" {...field} />
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
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter task description"
                            className="min-h-[90px] "
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Status */}
                </div>
                <div className=" flex items-end justify-start gap-3">
                  <FormField
                    control={form.control}
                    name="dueDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm ">Due date</label>
                          <Popover>
                            <PopoverTrigger
                              render={
                                <FormControl>
                                  <Button
                                    variant="secondary"
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                    )}
                                  >
                                    <CalendarIcon className="ml-auto h-4 w-4 " />

                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Select date</span>
                                    )}
                                  </Button>
                                </FormControl>
                              }
                            ></PopoverTrigger>
                            <PopoverContent
                              className=" w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date("2020-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="estimatedTime"
                    render={({ field }) => (
                      <FormItem className="  ">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm ">Estimated Time</label>

                          <div className="relative">
                            <Input
                              type="number"
                              min="0"
                              step="0.5"
                              placeholder="0"
                              className="pr-12"
                              {...field}
                            />

                            <span
                              className="
                              pointer-events-none
                              absolute
                              right-3
                              top-1/2
                              -translate-y-1/2
                              text-sm
                              text-muted-foreground
                            "
                            >
                              hrs
                            </span>
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="gap-2 flex flex-wrap items-center justify-start">
                  {/* Dates */}

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="  ">
                        <PopoverStatus
                          variant="secondary"
                          showLabel={true}
                          showPercent={false}
                          field={field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem className=" ">
                        <PopoverPriority
                          variant="secondary"
                          showLabel={true}
                          field={field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="projectId"
                    render={({ field }) => (
                      <FormItem className="  ">
                        <PopoverProject
                          variant="secondary"
                          showLabel={true}
                          showPercent={false}
                          field={field}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="assigneeId"
                    render={({ field }) => (
                      <FormItem className="  ">
                        <PopoverAvatar
                          variant="secondary"
                          showLabel={true}
                          showPercent={false}
                          field={field}
                          projectId={projectId}
                        />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="labels"
                    render={({ field }) => (
                      <FormItem className="  ">
                        <PopoverLabel
                          variant="secondary"
                          showLabel={true}
                          showPercent={false}
                          field={field}
                        />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isEdit ? "Update Task" : "Create Task"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Export untuk penggunaan
export default TaskDialog;

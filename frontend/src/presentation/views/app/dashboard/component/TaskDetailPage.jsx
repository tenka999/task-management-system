import React, { useState } from "react";
import {
  Calendar,
  Users,
  Lock,
  Globe,
  FolderOpen,
  Settings,
  MoreVertical,
  Edit,
  Trash2,
  Archive,
  Copy,
  ExternalLink,
  Clock,
  User,
  Hash,
  FileText,
  CheckCircle2,
  AlertCircle,
  Box,
  MoreHorizontal,
  Car,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";

import {
  IconAlertSquareFilled,
  IconAntennaBars5,
  IconCircle,
  IconCircleFilled,
  IconMoodPlus,
  IconPaperclip,
  IconPencil,
  IconPlus,
  IconRunSprint,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { SectionCards } from "@/components/section-cards";
import { ItemAvatar } from "@/components/item-avatar";
import { SelectDemo } from "@/components/select-item";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { ButtonLink } from "@/components/button-link";
import { ItemTask } from "@/components/item-task";
import { ButtonGroupProject } from "@/components/button-group-project";
import { ToggleGroupOutline } from "@/components/toggle-group";
import { ProjectFilterProvider } from "@/context/FilterProvider";
import DataTableDemo from "@/components/datatable-demo";
import { MemberFilterProvider } from "@/context/MemberFilterProvider";
import DataTableMemberProject from "@/components/datatable-member-project";
import ProjectUpdateActivity from "@/components/project-update-activity";
import ProjectUpdates from "@/components/project-update-activity";
import ProjectDateCard from "@/components/date-card";
import { PopoverStatus } from "@/components/popover-status";
import { PopoverPriority } from "@/components/popover-priority";
import { PopoverAvatar } from "@/components/popover-avatar";
import { PopoverLabelTask } from "@/components/popover-label-task";
import { PopoverStatusTask } from "@/components/popover-status-task";

const summary = {
  dueToday: 12,
  overdue: 5,
  completedToday: 10,
  totalHoursThisWeek: 10,
};

// Mock data based on your Prisma model
const mockProject = {
  id: "clh1234567890abcdef",
  workspaceId: "ws1234567890",
  order: 1,
  name: "Foundation",
  description:
    "Complete redesign of our company website with modern UI/UX principles, improved performance, and better conversion optimization. This project includes planning, design, development, and deployment phases.",
  projectName: "Core Component",
  status: "ACTIVE",
  startDate: "2024-01-15T00:00:00Z",
  endDate: "2024-06-30T00:00:00Z",
  createdById: "user123",
  isPublic: true,
  icon: "🚀",
  createdAt: "2024-01-10T08:00:00Z",
  updatedAt: "2024-01-20T14:30:00Z",
};

const webMember = [
  {
    name: "Lindsay Walton",
    username: "@lindsaywalton",
    role: "Front-end Developer",
    avatarFallback: "LR",
    status: "offline",
    imageUrl:
      "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Evil Rabbit",
    username: "@evilrabbit",
    role: "Member",
    avatarFallback: "ER",
    status: "online",
    imageUrl:
      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Courtney Henry",
    username: "@courtneyhenry",
    role: "Designer",
    avatarFallback: "CH",
    status: "afk",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const taskDetail = {
  id: "task123",
  title: "Implement User Authentication",
  description:
    "Implement user authentication using JWT tokens, including login, registration, and password reset functionalities. Ensure secure storage of user credentials and proper validation.",
  status: "In Progress",
  priority: "High",
  dueDate: "2024-06-15T00:00:00Z",
  sprintId: "sprint123",
  createdById: "user123",
  label: "Backend",
  assignedTo: {
    name: "Lindsay Walton",
    username: "@lindsaywalton",
    role: "Front-end Developer",
    avatarFallback: "LR",
    status: "offline",
    imageUrl:
      "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  activityLog: [
    {
      id: "activity1",
      timestamp: "2024-01-15T00:00:00Z",
      user: {
        name: "Lindsay Walton",
        username: "@lindsaywalton",
        role: "Front-end Developer",
        avatarFallback: "LR",
        status: "offline",
        imageUrl:
          "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      action: "Updated task description",
      details:
        "Changed the task description to include JWT implementation details.",
    },
  ],
};
const TaskDetailPage = () => {
  return (
    <div className="flex  w-full h-full ">
      <div className=" flex-2 flex ">
        <ScrollArea className="w-full z-20 h-[calc(100vh-60px)]">
          <div className="flex  flex-col">
            <div className="flex flex-col gap-5 px-10 pt-10 pb-5 ">
              <h1 className="text-5xl font-bold">{taskDetail.title}</h1>
              <p className="text-lg">{taskDetail.description}</p>
              <div className="">
                <Button variant="secondary" size="icon" className="mr-2">
                  <IconMoodPlus size={16} />
                </Button>
                <Button variant="secondary" size="icon" className="mr-2">
                  <IconPaperclip size={16} />
                </Button>
              </div>
              <div className="flex opacity-50 hover:opacity-100  items-center">
                <IconPlus size={16} />
                <span className="ml-2">Add sub-issues</span>
              </div>
            </div>
            <Separator className="bg-secondary-foreground opacity-20" />
            <div className="pt-10 pb-5 px-10 flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Activity</h2>
                <Button
                  variant="link"
                  size="icon"
                  className="mr-2 opacity-50 hover:opacity-100"
                >
                  Subcribe
                </Button>
              </div>
              <div className="flex flex-col gap-5 mb-5">
                {taskDetail.activityLog.map((activity) => (
                  <div className="flex items-start gap-2" key={activity.id}>
                    <div className=" rounded-full p-2 border bg-secondary">
                      <IconPencil size={16} />
                    </div>
                    <div className=" flex flex-col    rounded-md w-fit">
                      <p className="font-bold">{activity.user.name}</p>
                      <span className="opacity-50">{activity.details}</span>
                      <span className="opacity-50 ">{activity.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Card className="p-3 border rounded-xl  flex min-w-0 w-full flex-col gap-4">
                <CardContent className="p-0 min-w-0">
                  {/* <div className="opacity-50">Leave a comment...</div> */}
                  <Textarea
                    placeholder="Leave a comment."
                    className="
                    w-full
                    bg-transparent
                    min-w-0
                    h-[0px]
                    max-w-full
                    overflow-y-auto
                    whitespace-normal
                    break-all
                    p-0
                    pl-2
                    rounded-none
                    border-none
                    focus:outline-none
                    focus-visible:ring-0
                    text-base!
                "
                  />
                  {/* <Textarea
                placeholder="Leave a comment."
                className="  w-full 
                 whitespace-normal
    break-words
                overflow-y-scroll max-w-full p-0 rounded-none focus-within:ring-0 focus-visible:ring-0 focus:outline-none border-none resize-y "
              /> */}
                  <div className="flex justify-between items-center mt-2 ">
                    {/* <Button
                      variant="outline"
                      size="ss"
                      className=" flex  p-1  mr-2 "
                    > */}
                    <IconPlus
                      size={23}
                      className="opacity-50 p-0.5 hover:opacity-100 border rounded-lg"
                    />
                    {/* </Button> */}
                    <Button size="" className="mr-2 " disabled>
                      Comment
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="p-3 border rounded-xl  flex min-w-0 w-full flex-col gap-4">
                <CardHeader className="p-1 min-w-0">
                  <CardTitle className=" flex gap-3 items-center">
                    <Avatar size="sm">
                      <AvatarImage src={taskDetail.assignedTo.imageUrl} />
                      <AvatarFallback>
                        {taskDetail.assignedTo.avatarFallback}
                      </AvatarFallback>
                    </Avatar>
                    Alex Thompson{" "}
                    <span className="font-normal opacity-50">3d ago</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className=" px-2 min-w-0">
                  <div className="flex flex-col gap-2">
                    <p
                      className="
                     w-full
                     text-base
                    bg-transparent
                    min-w-0
                    max-w-full
                    overflow-y-auto
                    whitespace-normal
                    break-all
                    p-0
                    rounded-none
                    border-none
                    focus:outline-none
                    focus-visible:ring-0
                    "
                    >
                      taking a breaktaking a breaktaking a breaktaking a
                      breaktaking a break
                      breaktakingbreaktakingbreaktakingbreaktakingbreaktakingbreaktakingbreaktakingbreaktakingbreaktakingbreaktakingbreaktakingbreaktakingbreaktakingbreaktakingbreaktakingbreaktakingbreaktaking
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="p-0 min-w-0">
                  <div className="flex justify-between items-center ">
                    <Button
                      variant="outline"
                      size="ss"
                      className=" flex  p-1  mr-2 "
                    >
                      <IconMoodPlus size={40} />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className=" flex-1 flex">
        <div className=" w-full px-6 py-4 gap-10 flex flex-col">
          <div className="mt-5 flex flex-col  gap-3  ">
            <p className=" opacity-50">Properties</p>
            <span className="flex gap-2  items-center">
              <PopoverStatusTask
                variant="outline"
                size="icon"
                showLabel={false}
                showPercent={false}
              />
              {taskDetail.status}
            </span>

            <span className="flex gap-2  items-center">
              {/* <IconAntennaBars5 size={20} className="mr-2" /> */}
              <PopoverPriority
                variant="outline"
                size="icon"
                showLabel={false}
              />
              {taskDetail.priority}
            </span>
            <span className="flex   items-center gap-2">
              <PopoverAvatar
                variant="ghost"
                showLabel={false}
                showPercent={false}
                size="icon"
                sizeAvatar="default"
              />
              {taskDetail.assignedTo.name}
            </span>
            <span className="flex  gap-3 items-center">
              <IconRunSprint size={20} className="ml-2" />
              {taskDetail.sprintId}
            </span>
          </div>
          <div className="flex flex-col  gap-3  ">
            <p className=" opacity-50">Labels</p>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="flex p-3 items-center">
                <IconCircleFilled size={20} className="" />
                Outline
              </Badge>
              <PopoverLabelTask
                variant="ghost"
                showLabel={false}
                showPercent={false}
                size="icon"
                sizeAvatar="default"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;

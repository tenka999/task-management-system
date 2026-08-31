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

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

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
  name: "Website Redesign Project",
  description:
    "Complete redesign of our company website with modern UI/UX principles, improved performance, and better conversion optimization. This project includes planning, design, development, and deployment phases.",
  projectKey: "WEB-REDESIGN",
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

const ProjectDetailPage = () => {
  const [project, setProject] = useState(mockProject);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState(project);

  const getStatusBadge = (status) => {
    const statusConfig = {
      ACTIVE: {
        label: "Active",
        className: "bg-green-100 text-green-800 border-green-200",
      },
      ARCHIVED: {
        label: "Archived",
        className: "bg-gray-100 text-gray-800 border-gray-200",
      },
      COMPLETED: {
        label: "Completed",
        className: "bg-blue-100 text-blue-800 border-blue-200",
      },
      ON_HOLD: {
        label: "On Hold",
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
      },
    };

    const config = statusConfig[status] || statusConfig.ACTIVE;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    try {
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return "Invalid date";
    }
  };

  const calculateProgress = () => {
    if (!project.startDate || !project.endDate) return 0;
    const start = new Date(project.startDate).getTime();
    const end = new Date(project.endDate).getTime();
    const now = new Date().getTime();

    if (now <= start) return 0;
    if (now >= end) return 80;

    return Math.round(((now - start) / (end - start)) * 100);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setProject({
      ...project,
      ...editForm,
      updatedAt: new Date().toISOString(),
    });
    setIsEditDialogOpen(false);
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const [inputMember, setInputMember] = useState("");

  const [variant, setVariant] = React.useState(null);
  const [toggleProject, setToggleProject] = useState("all");
  const [tabValue, setTabValue] = useState("overview");
  return (
    <ScrollArea className="w-full z-20 h-[calc(100vh-60px)]">
      <div className="min-h-screen ">
        {/* Header */}
        <div className="h-full  border-b">
          <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col items-stretch    justify-between">
              <div className="  flex items-start ">
                {/* Project Icon */}
                <div className="w-16 h-16  p-0  rounded-xl flex items-center justify-center text-3xl ">
                  <Box className="w-8 h-8" />
                </div>

                <div>
                  <div className="flex space-x-3 mr-5">
                    <h1 className="text-[2.5rem]  font-bold">{project.name}</h1>
                  </div>
                </div>
                <div className="flex gap-2 ">
                  {getStatusBadge(project.status)}
                  {project.isPublic ? (
                    <Badge
                      variant="outline"
                      className="border-blue-200  text-white"
                    >
                      <Globe className="w-3 h-3 mr-1" />
                      Public
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="border-gray-200 text-gray-600"
                    >
                      <Lock className="w-3 h-3 mr-1" />
                      Private
                    </Badge>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex pl-15 ">
                <div className=" flex-1 flex items-start  space-x-5 text-sm text-gray-500">
                  <span className="flex flex-1 truncate items-center">
                    <Hash className="w-4 h-4 mr-1" />
                    {project.projectKey}
                  </span>
                  <span>•</span>
                  <span className="flex shrink-0 flex-2 items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(project.startDate)} -{" "}
                    {formatDate(project.endDate)}
                  </span>
                  <span>•</span>
                  <span className="flex-2 shrink-0 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Updated {formatDate(project.updatedAt)}
                  </span>
                </div>

                <div className="">
                  <Button variant="outline" size="sm">
                    <FolderOpen className="w-4 h-4 mr-2" />
                    View Board
                  </Button>
                  <Button size="sm" onClick={() => setIsEditDialogOpen(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Project
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      }
                    ></DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Copy className="w-4 h-4 mr-2" />
                          Duplicate Project
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Archive className="w-4 h-4 mr-2" />
                          Archive Project
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Project
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className=" max-w-7xl mx-auto ">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-3 "
          >
            <div className=" bg-transparent border-b py-2">
              <TabsList className="bg-transparent px-4 sm:px-6 lg:px-8">
                <TabsTrigger
                  value="overview"
                  onClick={() => setTabValue("overview")}
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger value="tasks" onClick={() => setTabValue("tasks")}>
                  Tasks
                </TabsTrigger>
                <TabsTrigger
                  value="activity"
                  onClick={() => setTabValue("activity")}
                >
                  Activity
                </TabsTrigger>
                <TabsTrigger
                  value="members"
                  onClick={() => setTabValue("members")}
                >
                  Members
                </TabsTrigger>
              </TabsList>
            </div>
            {tabValue === "tasks" && (
              <ProjectFilterProvider>
                <div className="relative top-0  bg-background z-0   flex flex-col w-full items-center bg-background">
                  <div className="flex h-[50px]   items-center  w-full border-b px-5  ">
                    <div className="flex  w-full justify-between  ">
                      <ToggleGroupOutline setToggleProject={setToggleProject} />
                      <ButtonGroupProject />
                    </div>
                  </div>
                </div>
              </ProjectFilterProvider>
            )}

            {/* Overview Tab */}
            <TabsContent
              value="overview"
              className=" px-2 sm:px-4 lg:px-6 space-y-6"
            >
              {/* Stats Cards */}
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4   ">
                  <div className="grid grid-cols-1 gap-4  *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-0 @xl/main:grid-cols-4 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
                    <Card className="@container/card bg-[linear-gradient(135deg,color-mix(in_oklch,var(--card),black_8%),var(--card),color-mix(in_oklch,var(--card),white_12%))]!">
                      <CardHeader>
                        {/* <CardDescription> */}
                        <div className="line-clamp-1 flex gap-2 font-medium">
                          My Open Task
                        </div>
                        {/* </CardDescription> */}
                        <CardTitle className="text-4xl font-bold tabular-nums @[250px]/card:text-3xl">
                          {summary.dueToday}
                        </CardTitle>
                        <CardAction>
                          <Badge variant="outline">
                            <IconTrendingUp />
                            +2
                          </Badge>
                        </CardAction>
                      </CardHeader>
                      <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="line-clamp-1 flex gap-2 font-medium">
                          {/* Trending up this month <IconTrendingUp className="size-4" /> */}
                        </div>
                        <div className="text-muted-foreground">
                          Number of assigned tasks not completed
                        </div>
                      </CardFooter>
                    </Card>
                    <Card className="@container/card bg-[linear-gradient(135deg,color-mix(in_oklch,var(--card),black_8%),var(--card),color-mix(in_oklch,var(--card),white_12%))]!">
                      <CardHeader>
                        <div className="line-clamp-1 flex gap-2 font-medium">
                          Due This Week
                        </div>
                        <CardTitle className="text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
                          {summary.overdue}{" "}
                        </CardTitle>
                        <CardAction>
                          <Badge variant="outline">
                            <IconTrendingDown />
                            -10
                          </Badge>
                        </CardAction>
                      </CardHeader>
                      <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        {/* <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <IconTrendingDown className="size-4" />
          </div> */}
                        <div className="text-muted-foreground">
                          tasks with upcoming deadlines
                        </div>
                      </CardFooter>
                    </Card>
                    <Card className="@container/card bg-[linear-gradient(135deg,color-mix(in_oklch,var(--card),black_8%),var(--card),color-mix(in_oklch,var(--card),white_12%))]!">
                      <CardHeader>
                        <div className="line-clamp-1 flex gap-2 font-medium">
                          Completed/Month
                        </div>
                        <CardTitle className="text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
                          {summary.completedToday}
                        </CardTitle>
                        <CardAction>
                          <Badge variant="outline">
                            <IconTrendingUp />
                            +3%
                          </Badge>
                        </CardAction>
                      </CardHeader>
                      <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="text-muted-foreground">
                          Completed This Month{" "}
                        </div>
                      </CardFooter>
                    </Card>
                    <Card className="@container/card bg-[linear-gradient(135deg,color-mix(in_oklch,var(--card),black_8%),var(--card),color-mix(in_oklch,var(--card),white_12%))]!">
                      <CardHeader>
                        <div className="line-clamp-1 flex gap-2 font-medium">
                          Hours Logged
                        </div>
                        <CardTitle className="text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
                          {summary.totalHoursThisWeek}h
                        </CardTitle>
                        <CardAction>
                          <Badge variant="outline">
                            <IconTrendingUp />
                            +2h
                          </Badge>
                        </CardAction>
                      </CardHeader>
                      <CardFooter className="flex-col items-start gap-1.5 text-sm">
                        <div className="text-muted-foreground">
                          total time tracked this week
                        </div>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </div>

              {/* Project Progress */}
              <div className="flex gap-5">
                <Card className="flex-1">
                  <CardHeader className="gap-0">
                    <CardTitle className="text-2xl  ">
                      Project Progress
                    </CardTitle>
                    <CardDescription className="">
                      Based on timeline
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex  justify-end text-sm">
                        <span>{calculateProgress()}% Complete</span>
                      </div>
                      <Progress value={calculateProgress()} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Description */}
                <Card className="flex-2">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      {/* <FileText className="w-5 h-5 mr-2" /> */}
                      Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className=" leading-relaxed">
                      {project.description || "No description provided."}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Project Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="">Project ID</span>
                      <span className="font-mono text-sm opacity-50">
                        {project.id}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="">Workspace ID</span>
                      <span className="font-mono text-sm opacity-50">
                        {project.workspaceId}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="">Created By</span>
                      <span className="flex items-center opacity-50">
                        <Avatar className="h-5 w-5 mr-2 ">
                          <AvatarFallback>
                            {getInitials("John Doe")}
                          </AvatarFallback>
                        </Avatar>
                        John Doe
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="">Created At</span>
                      <span className="opacity-50">
                        {formatDate(project.createdAt)}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="">Last Updated</span>
                      <span className="opacity-50">
                        {formatDate(project.updatedAt)}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Team Members Preview */}
                {/* <Card>
                  <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>
                      People working on this project
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        {
                          name: "John Doe",
                          role: "Project Lead",
                          color: "bg-blue-500",
                        },
                        {
                          name: "Jane Smith",
                          role: "Designer",
                          color: "bg-purple-500",
                        },
                        {
                          name: "Mike Johnson",
                          role: "Developer",
                          color: "bg-green-500",
                        },
                        {
                          name: "Sarah Wilson",
                          role: "Developer",
                          color: "bg-orange-500",
                        },
                      ].map((member, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-3">
                              <AvatarFallback className={member.color}>
                                {getInitials(member.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {member.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {member.role}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Users className="w-4 h-4 mr-2" />
                      View All Members
                    </Button>
                  </CardFooter>
                </Card> */}
                <Card className="@container/card flex-3" size="sm">
                  <CardHeader>
                    <CardTitle>
                      <h2 className="text-2xl mb-1 pl-2">Team Member</h2>
                    </CardTitle>
                    {/* <SelectDemo setTeamMember={setTeamMember} /> */}
                    {/* <TabsLineTeam setTeamMember={setTeamMember} /> */}
                  </CardHeader>
                  <CardContent>
                    <div className="flex w-full max-w-lg flex-col gap-1">
                      <ScrollArea className="h-[220px]">
                        {webMember.map((member) => (
                          <Item
                            key={member.username}
                            variant={
                              variant === member.username ? "muted" : "default"
                            }
                            size="xs"
                            onMouseEnter={() => setVariant(member.username)}
                            onMouseLeave={() => setVariant(null)}
                          >
                            <ItemMedia>
                              <Avatar className="size-10">
                                <AvatarImage src={member.imageUrl} />
                                <AvatarFallback>
                                  {member.avatarFallback}
                                </AvatarFallback>
                                <AvatarBadge
                                  className={`${member.status === "online" ? "bg-green-800" : member.status === "offline" ? "bg-gray-500" : "bg-yellow-600"} `}
                                />
                              </Avatar>
                            </ItemMedia>
                            <ItemContent>
                              <ItemTitle className="flex min-w-0 items-center gap-1">
                                <span className="shrink-0">{member.name}</span>-
                                <span className="min-w-0 truncate">
                                  {member.username}
                                </span>
                              </ItemTitle>
                              <ItemDescription>{member.role}</ItemDescription>
                            </ItemContent>
                            <ItemActions>
                              <Button
                                size="icon-sm"
                                variant="outline"
                                className="rounded-full"
                                aria-label="Invite"
                              >
                                <MoreHorizontal />
                              </Button>
                            </ItemActions>
                          </Item>
                        ))}
                      </ScrollArea>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col items-end gap-1.5 text-sm">
                    <div className="text-muted-foreground">
                      <ButtonLink text={"View All Member"} />
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* Tasks Tab */}
            <TabsContent value="tasks">
              <div className="relative ">
                {/* <ScrollArea className="w-full h-[100vh]"> */}
                <ItemTask />
                {/* </ScrollArea> */}
              </div>
            </TabsContent>

            {/* Members Tab */}
            <TabsContent value="members">
              <MemberFilterProvider>
                <DataTableMemberProject inputMember={inputMember} />
              </MemberFilterProvider>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="activity">
              <div className=" flex items-center justify-center">
                <ProjectUpdates />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
              <DialogDescription>
                Update project details and settings
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={editForm.startDate?.split("T")[0]}
                    onChange={(e) =>
                      setEditForm({ ...editForm, startDate: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={editForm.endDate?.split("T")[0]}
                    onChange={(e) =>
                      setEditForm({ ...editForm, endDate: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={editForm.isPublic}
                  onChange={(e) =>
                    setEditForm({ ...editForm, isPublic: e.target.checked })
                  }
                  className="rounded border-gray-300"
                />
                <Label htmlFor="isPublic">Make project public</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </ScrollArea>
  );
};

export default ProjectDetailPage;

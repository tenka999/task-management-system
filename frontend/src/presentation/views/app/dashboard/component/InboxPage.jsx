import InboxPageList from "@/components/inbox-page-list";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";

import {
  AlertCircle,
  CheckCircle2,
  Clock,
  MoveRight,
  Tag,
  User,
  Calendar,
  Paperclip,
  MoreVertical,
  MoreHorizontal,
} from "lucide-react";
import {
  IconAdjustmentsHorizontal,
  IconChecks,
  IconCircleFilled,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { StatusIcon } from "@/components/status-icon";

const inboxItems = [
  {
    id: "LNUI-703",
    title: "Rework Dialog focus trap to support",
    description: "Heads up: Radix solves this with a DismissableLayer",
    time: "2h",
    status: "in-progress",
    priority: "high",
    isRead: false,
  },
  {
    id: "LNUI-710",
    title: "Command palette: async sources hang",
    description: "marked this issue as blocked by LNUI-707",
    time: "4h",
    status: "blocked",
    priority: "medium",
    isRead: false,
  },
  {
    id: "LNUI-704",
    title: "Add virtualization to Data Table for 10k+",
    description: "@leonel.ngoya can you sanity-check the windowing",
    time: "6h",
    status: "review",
    priority: "high",
    isRead: false,
  },
  {
    id: "LNUI-726",
    title: "Memoize Table row renderer to cut re-",
    description: "moved this issue from In Progress to Done",
    time: "9h",
    status: "done",
    priority: "low",
    isRead: false,
  },
  {
    id: "LNUI-701",
    title: "Combobox: keyboard selection skips",
    description: "Confirmed on Firefox and Safari as well — the",
    time: "12h",
    status: "in-progress",
    priority: "medium",
    isRead: true,
  },
  {
    id: "LNUI-736",
    title: "Publish v2.4 with tree-shakable exports",
    description: "created this issue and added it to Cycle 21",
    time: "1d",
    status: "todo",
    priority: "high",
    isRead: true,
  },
  {
    id: "LNUI-715",
    title: "Form: surface async validation state on",
    description: "assigned this issue to you",
    time: "1d",
    status: "assigned",
    priority: "medium",
    isRead: true,
  },
  {
    id: "LNUI-702",
    title: "Date picker: month navigation feels lagg",
    description: "Design is fine with a simple opacity crossfade on low",
    time: "2d",
    status: "in-progress",
    priority: "low",
    isRead: true,
  },
  {
    id: "LNUI-819",
    title: "Report: Combobox crashes with empty",
    description: "created this issue from docs feedback",
    time: "2d",
    status: "todo",
    priority: "high",
    isRead: true,
  },
  {
    id: "LNUI-706",
    title: "Migrate color tokens to OKLCH with",
    description: "updated the token mapping section of the description",
    time: "3d",
    status: "in-progress",
    priority: "medium",
    isRead: true,
  },
  {
    id: "LNUI-735",
    title: "Release Empty State component with",
    description: "created this issue from docs feedback",
    time: "3d",
    status: "todo",
    priority: "low",
    isRead: true,
  },
];

const statusColors = {
  "in-progress": "bg-blue-500/10 text-blue-500 border-blue-500/20",
  blocked: "bg-red-500/10 text-red-500 border-red-500/20",
  review: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  done: "bg-green-500/10 text-green-500 border-green-500/20",
  todo: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  assigned: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
};

const priorityIcons = {
  high: AlertCircle,
  medium: Clock,
  low: CheckCircle2,
};

const statusLabels = {
  "in-progress": "In Progress",
  blocked: "Blocked",
  review: "Review",
  done: "Done",
  todo: "Todo",
  assigned: "Assigned",
};
const done = "done";

export default function InboxPage() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="mx-h-[10px]  rounded-lg border"
    >
      <ResizablePanel defaultSize="50%" className="mx-h-[10px]">
        {/* <div className="flex h-full items-center justify-center "> */}
        {/* <InboxPageList /> */}
        <ScrollArea className="h-[calc(100vh-var(--header-height))]">
          <div className="divide-y">
            <div className="flex sticky top-0 bg-background z-10 items-center justify-between px-4 py-2">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold">Inbox</h1>
                <Button variant="ghost" size="icon" className="">
                  <MoreHorizontal size={20} />
                </Button>
              </div>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="">
                  <IconChecks size={20} className="text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon" className="">
                  <IconAdjustmentsHorizontal size={20} />
                </Button>
              </div>
            </div>
            {inboxItems.map((item) => {
              const PriorityIcon = priorityIcons[item.priority];
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4  px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer group"
                >
                  {/* Avatar / Icon */}
                  <div className="shrink-0 pt-0.5">
                    <Avatar size="lg">
                      <AvatarFallback className="text-xs bg-primary/10 text-primary">
                        {item.id.split("-")[1].slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-row items-center  gap-2  ">
                      {!item.isRead && (
                        <IconCircleFilled size={14} className="" />
                      )}
                      <span
                        className={`${item.isRead ? "opacity-50" : "opacity-100"} text-sm  text-muted-foreground shrink-0`}
                      >
                        {item.id}
                      </span>
                      <h3
                        className={`${item.isRead ? "opacity-50" : "opacity-100"} font-semibold text-sm  group-hover:text-primary transition-colors truncate`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p
                      className={`${item.isRead ? "opacity-50" : "opacity-100"} text-xs text-muted-foreground mt-0.5 line-clamp-1`}
                    >
                      {item.description}
                    </p>

                    {/* Footer tags */}
                  </div>

                  {/* Action indicator */}
                  <div className="shrink-0 flex flex-col items-center gap-2">
                    <StatusIcon status={"inProgress"} size={16} />
                    <p
                      className={`${item.isRead ? "opacity-50" : "opacity-100"} text-xs text-muted-foreground`}
                    >
                      2h
                    </p>
                    {/* <MoveRight className="h-4 w-4 text-muted-foreground" /> */}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* </div> */}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="50%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

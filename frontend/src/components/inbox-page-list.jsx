import React from "react";
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
} from "lucide-react";

// Sample data based on the image
const inboxItems = [
  {
    id: "LNUI-703",
    title: "Rework Dialog focus trap to support...",
    description: "Heads up: Radix solves this with a DismissableLayer...",
    time: "2h",
    status: "in-progress",
    priority: "high",
  },
  {
    id: "LNUI-710",
    title: "Command palette: async sources hang...",
    description: "marked this issue as blocked by LNUI-707",
    time: "4h",
    status: "blocked",
    priority: "medium",
  },
  {
    id: "LNUI-704",
    title: "Add virtualization to Data Table for 10k+...",
    description: "@leonel.ngoya can you sanity-check the windowing...",
    time: "6h",
    status: "review",
    priority: "high",
  },
  {
    id: "LNUI-726",
    title: "Memoize Table row renderer to cut re-...",
    description: "moved this issue from In Progress to Done",
    time: "9h",
    status: "done",
    priority: "low",
  },
  {
    id: "LNUI-701",
    title: "Combobox: keyboard selection skips...",
    description: "Confirmed on Firefox and Safari as well — the...",
    time: "12h",
    status: "in-progress",
    priority: "medium",
  },
  {
    id: "LNUI-736",
    title: "Publish v2.4 with tree-shakable exports",
    description: "created this issue and added it to Cycle 21",
    time: "1d",
    status: "todo",
    priority: "high",
  },
  {
    id: "LNUI-715",
    title: "Form: surface async validation state on...",
    description: "assigned this issue to you",
    time: "1d",
    status: "assigned",
    priority: "medium",
  },
  {
    id: "LNUI-702",
    title: "Date picker: month navigation feels lagg...",
    description: "Design is fine with a simple opacity crossfade on low...",
    time: "2d",
    status: "in-progress",
    priority: "low",
  },
  {
    id: "LNUI-819",
    title: "Report: Combobox crashes with empty...",
    description: "created this issue from docs feedback",
    time: "2d",
    status: "todo",
    priority: "high",
  },
  {
    id: "LNUI-706",
    title: "Migrate color tokens to OKLCH with...",
    description: "updated the token mapping section of the description",
    time: "3d",
    status: "in-progress",
    priority: "medium",
  },
  {
    id: "LNUI-735",
    title: "Release Empty State component with...",
    description: "created this issue from docs feedback",
    time: "3d",
    status: "todo",
    priority: "low",
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

const InboxPageList = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inbox</h1>
            <p className="text-muted-foreground mt-1">
              {inboxItems.length} items •{" "}
              {inboxItems.filter((i) => i.status === "in-progress").length} in
              progress
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="px-3 py-1">
              <Calendar className="h-3 w-3 mr-1" />
              Today
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              <Paperclip className="h-3 w-3 mr-1" />
              Filters
            </Badge>
          </div>
        </div>

        {/* Inbox List */}
        <Card className="border  ">
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]"></ScrollArea>
          </CardContent>
        </Card>

        {/* Bottom stats */}
        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Updated recently</span>
            <span>•</span>
            <span>
              {inboxItems.filter((i) => i.status === "done").length} completed
            </span>
            <span>•</span>
            <span>
              {inboxItems.filter((i) => i.status === "blocked").length} blocked
            </span>
          </div>
          <button className="hover:text-foreground transition-colors">
            View all →
          </button>
        </div>
      </div>
    </div>
  );
};

export default InboxPageList;

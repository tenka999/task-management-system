import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format, isToday, isYesterday } from "date-fns";

import { AlertCircle, CheckCircle2, Clock, X } from "lucide-react";
import {
  IconAdjustmentsHorizontal,
  IconChecks,
  IconCircleFilled,
  IconInbox,
  IconPaperclip,
  IconSend,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { StatusIcon } from "@/components/status-icon";
import { useEffect, useMemo, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { InvitationMessageCard } from "@/components/invitation-message";
import { useInboxApi } from "@/presentation/logics/app/useInbox";
import { PopoverPriority } from "@/components/popover-priority";

const inboxItems = [
  {
    id: "LNUI-703",
    title: "Rework Dialog focus trap to support",
    description: "Heads up: Radix solves this with a DismissableLayer",
    status: "in-progress",
    priority: "high",
    isRead: false,
  },
  {
    id: "LNUI-710",
    title: "Command palette: async sources hang",
    description: "marked this issue as blocked by LNUI-707",
    status: "blocked",
    priority: "medium",
    isRead: false,
  },
  {
    id: "LNUI-704",
    title: "Add virtualization to Data Table for 10k+",
    description: "@leonel.ngoya can you sanity-check the windowing",
    status: "review",
    priority: "high",
    isRead: false,
  },
  {
    id: "LNUI-726",
    title: "Memoize Table row renderer to cut re-",
    description: "moved this issue from In Progress to Done",
    status: "done",
    priority: "low",
    isRead: false,
  },
  {
    id: "LNUI-701",
    title: "Combobox: keyboard selection skips",
    description: "Confirmed on Firefox and Safari as well — the",
    status: "in-progress",
    priority: "medium",
    isRead: true,
  },
  {
    id: "LNUI-736",
    title: "Publish v2.4 with tree-shakable exports",
    description: "created this issue and added it to Cycle 21",
    status: "todo",
    priority: "high",
    isRead: true,
  },
  {
    id: "LNUI-715",
    title: "Form: surface async validation state on",
    description: "assigned this issue to you",
    status: "assigned",
    priority: "medium",
    isRead: true,
  },
  {
    id: "LNUI-702",
    title: "Date picker: month navigation feels lagg",
    description: "Design is fine with a simple opacity crossfade on low",
    status: "in-progress",
    priority: "low",
    isRead: true,
  },
  {
    id: "LNUI-819",
    title: "Report: Combobox crashes with empty",
    description: "created this issue from docs feedback",
    status: "todo",
    priority: "high",
    isRead: true,
  },
];

/* ---- Mock conversation history per notification ---- */
const now = Date.now();
const conversations = {
  "LNUI-703": [
    {
      id: "m1",
      author: "DANIGAZZZ",
      initials: "DG",
      content: "Heads up: Radix solves this with a DismissableLayer.",
      timestamp: new Date(now - 3 * 36e5),
      isSelf: false,
    },
    {
      id: "m2",
      author: "You",
      initials: "CN",
      content:
        "Good call — I'll check how DismissableLayer handles nested dialogs.",
      timestamp: new Date(now - 2 * 36e5),
      isSelf: true,
    },
    {
      id: "m3",
      author: "DANIGAZZZ",
      initials: "DG",
      content: "Main thing is restoring focus correctly on unmount.",
      timestamp: new Date(now - 1 * 36e5),
      isSelf: false,
    },
  ],
  "LNUI-710": [
    {
      id: "inv1",
      type: "invitation",
      author: "leonel.ngoya",
      initials: "LN",
      content: "Invited you to join LNDev Core",
      timestamp: new Date(now - 4 * 36e5),
      isSelf: false,
      invitation: {
        token: "mock-invite-token",
        workspaceName: "LNDev Core",
        workspaceInitials: "LN",
        inviterName: "leonel.ngoya",
        content: "Invited you to join LNDev Core workspace",
        role: "MEMBER",
        status: "PENDING",
        expiresAt: new Date(now + 2 * 864e5),
        memberCount: 12,
      },
    },
    {
      id: "m1",
      author: "DANIGAZZZ",
      initials: "DG",
      content: "This is now blocked by LNUI-707.",
      timestamp: new Date(now - 5 * 36e5),
      isSelf: false,
    },
  ],
  "LNUI-704": [
    {
      id: "m1",
      author: "leonel.ngoya",
      initials: "LN",
      content: "Can you sanity-check the windowing approach?",
      timestamp: new Date(now - 7 * 36e5),
      isSelf: false,
    },
    {
      id: "m2",
      author: "You",
      initials: "CN",
      content: "On it — benchmarking with 10k rows now.",
      timestamp: new Date(now - 6 * 36e5),
      isSelf: true,
    },
  ],
};

const priorityIcons = { high: AlertCircle, medium: Clock, low: CheckCircle2 };

const statusLabels = {
  "in-progress": "In Progress",
  blocked: "Blocked",
  review: "Review",
  done: "Done",
  todo: "Todo",
  assigned: "Assigned",
};

function dayLabel(date) {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "MMM d, yyyy");
}

function MessageContent({ msg }) {
  const [expanded, setExpanded] = useState(false);
  const [clampable, setClampable] = useState(false);
  const contentRef = useRef(null);

  // Measure once (with the clamp applied) to decide if the toggle is needed.
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    setClampable(el.scrollHeight > el.clientHeight + 1);
  }, [msg.content]);

  return (
    <>
      <div
        ref={contentRef}
        className={cn(
          " mt-1.5 rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed [overflow-wrap:anywhere]",
          !expanded && "line-clamp-6",
          msg.isSelf
            ? "rounded-tr-sm bg-primary text-primary-foreground"
            : "rounded-tl-sm bg-muted",
        )}
      >
        {msg.content}
      </div>

      {clampable && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className={cn(
            "mt-1 text-xs font-medium text-primary hover:underline",
            msg.isSelf ? "self-end" : "self-start",
          )}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </>
  );
}

export default function InboxPage() {
  const [items, setItems] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [textMessage, setTextMessage] = useState("");
  const { useAllInbox } = useInboxApi();
  const { data } = useAllInbox();
  console.log(data);
  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  const selected = useMemo(
    () => items?.find((i) => i.id === selectedId) ?? null,
    [items, selectedId],
  );

  const unreadCount = items?.filter((i) => !i.isRead).length;

  /* ---------- selection: load conversation + mark as read ---------- */
  const selectItem = (id) => {
    setSelectedId(id);
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, isRead: true } : it)),
    );
    setMessages(conversations[id] ?? []);
  };

  const closeConversation = () => {
    setSelectedId(null);
    setMessages([]);
  };

  useEffect(() => {
    setItems(data);
  }, [data]);

  /* ---------- auto-scroll to latest message ---------- */
  useEffect(() => {
    const viewport = scrollRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]",
    );
    viewport?.scrollTo({ top: viewport.scrollHeight, behavior: "smooth" });
  }, [messages, selectedId]);

  /* ---------- auto-grow textarea ---------- */
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [textMessage]);

  /* ---------- send ---------- */
  const sendMessage = () => {
    const text = textMessage.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        author: "You",
        initials: "CN",
        content: text,
        timestamp: new Date(),
        isSelf: true,
      },
    ]);
    setTextMessage("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* ---------- render messages grouped by day ---------- */
  const renderMessages = () => {
    let lastDay = null;
    console.log("messages", messages);
    return messages?.map((msg) => {
      const day = dayLabel(msg.timestamp);
      const showSeparator = day !== lastDay;
      lastDay = day;
      return (
        <div key={msg.id} className="flex min-w-0 flex-col">
          {showSeparator && (
            <div className="my-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">{day}</span>
              <div className="h-px flex-1 bg-border" />
            </div>
          )}

          <div
            className={cn(
              "flex min-w-0 gap-3",
              msg.isSelf && "flex-row-reverse",
            )}
          >
            <Avatar size="lg" className="shrink-0">
              <AvatarFallback className="bg-primary/10 text-xs text-primary">
                {msg.initials}
              </AvatarFallback>
            </Avatar>

            <div
              className={cn(
                "min-w-0 pt-0.5",
                msg.type === "invitation" ? "max-w-[90%]" : "max-w-[75%]",
                msg.isSelf && "flex flex-col items-end",
              )}
            >
              <div
                className={cn(
                  "flex flex-wrap items-baseline gap-x-2",
                  msg.isSelf && "flex-row-reverse",
                )}
              >
                <h3 className="text-sm font-semibold">{msg.author}</h3>
                <span className="text-xs text-muted-foreground">
                  {format(msg.timestamp, "MMM d, yyyy h:mm a")}
                </span>
              </div>

              {msg.type === "invitation" && msg.invitation ? (
                <InvitationMessageCard invitation={msg.invitation} />
              ) : (
                <MessageContent msg={msg} />
              )}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-[calc(100vh-var(--header-height))]! rounded-lg border"
    >
      {/* ===================== List ===================== */}
      <ResizablePanel defaultSize="50%">
        <ScrollArea className="h-[calc(100vh-var(--header-height)-2px)]">
          <div className="divide-y">
            <div className="sticky top-0 z-10 flex items-center justify-between bg-background px-4 py-2">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold">Direct Messages</h1>
                {unreadCount > 0 && (
                  <Badge variant="secondary">{unreadCount} unread</Badge>
                )}
              </div>
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  title="Mark all as read"
                  onClick={() =>
                    setItems((prev) =>
                      prev.map((it) => ({ ...it, isRead: true })),
                    )
                  }
                >
                  <IconChecks size={20} className="text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon">
                  <IconAdjustmentsHorizontal size={20} />
                </Button>
              </div>
            </div>

            {items?.map((item) => {
              // const PriorityIcon = priorityIcons[item.priority];
              return (
                <div
                  key={item.id}
                  onClick={() => selectItem(item.id)}
                  className={cn(
                    "group flex cursor-pointer items-center gap-4 px-4 py-3 transition-colors hover:bg-muted/50",
                    selectedId === item.id && "bg-muted",
                  )}
                >
                  <div className="shrink-0 pt-0.5">
                    <Avatar size="lg">
                      <AvatarFallback className="bg-primary/10 text-xs text-primary">
                        {item.sender.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="relative flex  w-full min-w-0 justify-between gap-4">
                    <div className="  w-full">
                      <div className="relative flex flex-row items-center gap-2">
                        {!item.isRead && (
                          <IconCircleFilled
                            size={14}
                            className="shrink-0 text-primary"
                          />
                        )}
                        <div
                          className={cn(
                            "shrink-0  truncate text-sm text-muted-foreground font-semibold",
                            item.isRead && "opacity-50",
                          )}
                        >
                          {item.sender.username}
                        </div>
                        <h3
                          className={cn(
                            "relative truncate text-sm font-semibold transition-colors group-hover:text-primary",
                            item.isRead && "opacity-50",
                          )}
                        >
                          {item.subject}
                        </h3>
                      </div>

                      <p
                        className={cn(
                          "mt-0.5 line-clamp-1 truncate w-full overflow-x-hidden whitespace-normal text-xs text-muted-foreground",
                          item.isRead && "opacity-50",
                        )}
                      >
                        {item.content}
                      </p>
                    </div>

                    <div className="flex shrink-0     flex-col items-center gap-2">
                      {/* <StatusIcon status="inProgress" size={16} /> */}
                      <PopoverPriority
                        variant="ghost"
                        noCommand={true}
                        size="x"
                      />
                      {/* <PriorityIcon
                        size={14}
                        className="text-muted-foreground"
                      /> */}
                      <p className="text-muted-foreground text-xs ">2h</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* ===================== Chat ===================== */}
      <ResizablePanel defaultSize="50%" className="min-h-0">
        {selected ? (
          <div className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden">
            {/* Conversation header */}
            <div className="flex shrink-0 items-center justify-between gap-4 border-b px-4 py-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="shrink-0 text-sm text-muted-foreground">
                    {selected.sender.username}
                  </span>
                  <h2 className="truncate text-sm font-semibold">
                    {selected.subject}
                  </h2>
                </div>
                <Badge variant="outline" className="mt-1.5">
                  <PopoverPriority
                    showLabel={true}
                    noCommand={true}
                    variant="ghost"
                    size="x"
                  />
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeConversation}
                className="shrink-0"
              >
                <X size={18} />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea
              ref={scrollRef}
              className="min-h-0 min-w-0 flex-1 overflow-hidden"
            >
              <div className="flex min-w-0 flex-col gap-5 p-4">
                {renderMessages()}
              </div>
            </ScrollArea>

            {/* Composer */}
            <div className="shrink-0 p-3 pt-0">
              <Card className="w-full min-w-0 rounded-xl border p-3">
                <CardContent className="min-w-0 p-0">
                  <Textarea
                    ref={textareaRef}
                    value={textMessage}
                    onChange={(e) => setTextMessage(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder={`Reply to ${selected.sender.username}...`}
                    rows={1}
                    className="max-h-[200px] min-h-0 w-full min-w-0 resize-none overflow-y-auto whitespace-pre-wrap [overflow-wrap:anywhere] rounded-none border-none bg-transparent p-0 pl-2 text-base! focus-visible:ring-0"
                  />

                  <div className="mt-2 flex items-center justify-between gap-1">
                    <span className="pl-2 text-[11px] text-muted-foreground">
                      Enter to send · Shift+Enter for new line
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        type="button"
                        className="shrink-0 rounded-lg"
                      >
                        <IconPaperclip size={22} />
                      </Button>
                      <Button
                        size="icon"
                        type="button"
                        className="shrink-0 rounded-lg"
                        onClick={sendMessage}
                        disabled={!textMessage.trim()}
                      >
                        <IconSend size={20} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          /* Empty state */
          <div className="flex h-full flex-col items-center justify-center gap-2 p-6">
            <IconInbox size={80} stroke={1} className="text-muted-foreground" />
            <span className="text-center text-3xl font-semibold opacity-70">
              {unreadCount} unread notification{unreadCount === 1 ? "" : "s"}
            </span>
            <p className="text-center font-light text-muted-foreground opacity-70">
              Select a notification from the list to view its details and take
              action.
            </p>
          </div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

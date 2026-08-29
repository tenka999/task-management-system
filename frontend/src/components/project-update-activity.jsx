import * as React from "react";
import { Paperclip, Sparkles, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { ToggleButtons } from "./toggle-buttons";

const STATUS = {
  ON_TRACK: {
    value: "on-track",
    label: "On track",
    color: "bg-emerald-400",
  },
  AT_RISK: {
    value: "at-risk",
    label: "At risk",
    color: "bg-yellow-400",
  },
  OFF_TRACK: {
    value: "off-track",
    label: "Off track",
    color: "bg-red-400",
  },
};

const statusItems = Object.values(STATUS);

const updates = [
  {
    id: 1,
    month: "August",
    author: "leonel.ngoya",
    date: "Aug 29",
    status: "off-track",
    content: "asd",
  },
  {
    id: 2,
    month: "August",
    author: "leonel.ngoya",
    date: "Aug 29",
    status: "on-track",
    content: "asd",
  },
];

function StatusDot({ status }) {
  const item = statusItems.find((item) => item.value === status);

  return (
    <span
      className={`size-2.5 shrink-0 rounded-full ${item?.color ?? "bg-muted-foreground"}`}
    />
  );
}

function StatusSelect({ value, onValueChange }) {
  return (
    <Select value={value} onValueChange={onValueChange} items={statusItems}>
      <SelectTrigger
        className="
          w-auto
          gap-2
          rounded-full
          bg-muted
          px-3
          text-sm
          font-medium
          shadow-none
          hover:bg-accent/40
          focus:ring-0
          focus:ring-offset-0
        "
      >
        <SelectValue>
          {(value) => {
            const item = statusItems.find((item) => item.value === value);

            if (!item) return null;

            return (
              <span className="flex items-center gap-2">
                <StatusDot status={value} />
                {item.label}
              </span>
            );
          }}
        </SelectValue>

        {/* <ChevronDown className="size-3.5 opacity-50" /> */}
      </SelectTrigger>

      <SelectContent
        align="start"
        className="
          rounded-xl
          border-border
          bg-background
          shadow-2xl
        "
      >
        <SelectGroup>
          {statusItems.map((item) => (
            <SelectItem
              key={item.value}
              value={item.value}
              className="
                rounded-lg
                px-3
                py-3
                text-sm
                focus:bg-accent
              "
            >
              <span className="flex items-center gap-3">
                <StatusDot status={item.value} />
                <span>{item.label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function UpdateCard({ update }) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-border/80
        bg-card
        p-4
        
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="
              flex
              size-8
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-lime-300
              to-green-400
            "
          />

          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">{update.author}</span>

            <span className="text-sm text-muted-foreground">{update.date}</span>
          </div>
        </div>

        <div
          className="
            flex
            h-9
            items-center
            gap-2
            rounded-full
            border
            border-border/80
            px-3
            text-sm
            font-medium
          "
        >
          <StatusDot status={update.status} />

          <span>
            {statusItems.find((item) => item.value === update.status)?.label}
          </span>
        </div>
      </div>

      <p className="mt-7 text-sm leading-6 text-foreground">{update.content}</p>
    </div>
  );
}

export default function ProjectUpdates() {
  const [status, setStatus] = React.useState("on-track");
  const [content, setContent] = React.useState("");
  const [toggleValue, setToggleValue] = React.useState("update");
  const handlePostUpdate = () => {
    if (!content.trim()) return;

    console.log({
      content,
      status,
    });

    updates.push({
      id: updates.length + 1,
      month: "August",
      author: "leonel.ngoya",
      date: "Aug 29",
      status,
      content,
    });

    setContent("");
  };

  return (
    <section className="w-full  text-foreground">
      <div className="mx-auto w-full  max-w-3xl px-6 py-10">
        {/* ========================= */}
        {/* UPDATE COMPOSER */}
        {/* ========================= */}

        <div
          className="
            overflow-visible
            rounded-2xl
            border
            border-border/80
            bg-card
          "
        >
          {/* Top controls */}

          <div className="flex items-center gap-2 px-6 pt-6">
            <ToggleButtons
              value={toggleValue}
              onChange={setToggleValue}
              options={[
                {
                  value: "comment",
                  label: "Comment",
                },
                {
                  value: "update",
                  label: "Update",
                },
              ]}
            />
            <StatusSelect value={status} onValueChange={setStatus} />
          </div>

          {/* Textarea */}

          <div className="px-6 pt-4">
            <Textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              placeholder="Write a project update..."
              className="
                min-h-[125px]
                max-h-[300px]
                resize-y
                border-0
                bg-transparent
                p-1
                rounded-md
                text-base
                shadow-none
                placeholder:text-muted-foreground/80
                focus-visible:ring-0
              "
            />
          </div>

          {/* Project changes */}

          <div className="px-6 pb-4">
            <div
              className="
                border-l-2
                border-border
                pl-5
                text-sm
              "
            >
              <ChangeRow
                label="Priority"
                value={
                  <>
                    No priority →{" "}
                    <strong className="font-medium text-foreground">
                      Urgent
                    </strong>
                  </>
                }
              />

              <ChangeRow
                label="Lead"
                value={
                  <>
                    <strong className="font-medium text-foreground">
                      mason.carter
                    </strong>{" "}
                    assigned
                  </>
                }
              />

              <ChangeRow
                label="Target date"
                value={
                  <>
                    set to{" "}
                    <strong className="font-medium text-foreground">
                      Apr 1st
                    </strong>
                  </>
                }
              />

              <ChangeRow
                label="Progress"
                value={
                  <>
                    0% →{" "}
                    <strong className="font-medium text-foreground">31%</strong>
                  </>
                }
              />
            </div>
          </div>

          {/* Bottom actions */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-3
              px-6
              pb-6
            "
          >
            <Button
              variant="outline"
              className="
                h-10
                gap-2
                rounded-lg
                border-border
                px-3
                font-semibold
              "
            >
              <Sparkles className="size-4" />
              Write with Agent
            </Button>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="
                  size-10
                  text-muted-foreground
                  hover:bg-accent
                "
              >
                <Paperclip className="size-5" />
                <span className="sr-only">Attach file</span>
              </Button>

              <Button
                onClick={handlePostUpdate}
                disabled={!content.trim()}
                className="
                  h-10
                  rounded-lg
                  px-4
                  font-medium
                "
              >
                Post update
              </Button>
            </div>
          </div>
        </div>

        {/* ========================= */}
        {/* HISTORY */}
        {/* ========================= */}

        <div className="mt-14">
          <h2 className="mb-5 text-2xl font-bold tracking-tight">August</h2>

          <div className="space-y-4">
            {[...updates]
              .sort((a, b) => b.id - a.id)
              .map((update) => (
                <UpdateCard key={update.id} update={update} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChangeRow({ label, value }) {
  return (
    <div className="grid grid-cols-[140px_1fr] py-1">
      <span className="text-muted-foreground">{label}</span>

      <span className="text-muted-foreground">{value}</span>
    </div>
  );
}

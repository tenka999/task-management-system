import { MoreHorizontal } from "lucide-react";
import * as React from "react";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { ScrollArea } from "./ui/scroll-area";

const designMember = [
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
    name: "Lindsay Walton",
    username: "@lindsaywalton",
    role: "Front-end Developer",
    avatarFallback: "LR",
    status: "offline",
    imageUrl:
      "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
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

const frontendMember = [
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
    name: "Courtney Henry",
    username: "@courtneyhenry",
    role: "Designer",
    avatarFallback: "CH",
    status: "afk",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Evil Rabbit",
    username: "@evilrabbit1",
    role: "Member",
    avatarFallback: "ER",
    status: "online",
    imageUrl:
      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export function ItemAvatar({ tabMember = true, tabTeamMember }) {
  const [variant, setVariant] = React.useState(null);
  const teamMember =
    tabTeamMember === "design"
      ? designMember
      : tabTeamMember === "web"
        ? webMember
        : frontendMember;
  return (
    <>
      <div className="flex w-full max-w-lg flex-col gap-1">
        <ScrollArea className="h-[220px]">
          {teamMember.map((member) => (
            <Item
              key={member.username}
              variant={variant === member.username ? "muted" : "default"}
              size="xs"
              onMouseEnter={() => setVariant(member.username)}
              onMouseLeave={() => setVariant(null)}
            >
              <ItemMedia>
                <Avatar className="size-10">
                  <AvatarImage src={member.imageUrl} />
                  <AvatarFallback>{member.avatarFallback}</AvatarFallback>
                  <AvatarBadge
                    className={`${member.status === "online" ? "bg-green-800" : member.status === "offline" ? "bg-gray-500" : "bg-yellow-600"} `}
                  />
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle className="flex min-w-0 items-center gap-1">
                  <span className="shrink-0">{member.name}</span>-
                  <span className="min-w-0 truncate">{member.username}</span>
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
    </>
  );
}

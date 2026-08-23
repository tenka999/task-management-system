import { Activity, MoreHorizontal } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";

const activities = [
  {
    id: 1,
    username: "mason.carter",
    action: "created the issue",
    time: "11d ago",
  },
  {
    id: 2,
    username: "mason.carter",
    action: "added issue to Cycle 21",
    time: "10d ago",
  },
  {
    id: 3,
    username: "leonel.ngoya",
    action: "moved from Todo to In Progress",
    time: "9d ago",
  },
];

const designMember = [
  {
    name: "Evil Rabbit",
    username: "@evilrabbit",
    timeStamp: "1d ago",
    role: "member",
    avatarFallback: "ER",
    status: "online",
    imageUrl:
      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Lindsay Walton",
    username: "@lindsaywalton",
    timeStamp: "2d ago",
    role: "member",

    avatarFallback: "LR",
    status: "offline",
    imageUrl:
      "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },

  {
    name: "Courtney Henry",
    username: "@courtneyhenry",
    timeStamp: "3d ago",
    role: "member",

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
    username: "@evilrabbit",
    role: "Member",
    avatarFallback: "ER",
    status: "online",
    imageUrl:
      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export function ItemActivity() {
  //   console.log(tabTeamMember);
  const [variant, setVariant] = React.useState(null);
  const teamMember = designMember;
  return (
    <>
      <ScrollArea className="h-[250px] px-1 mx-1">
        {teamMember.map((member) => (
          <Item
            key={member.username}
            size="xs"
            className="px-2.5 py-0 flex justify-between"
          >
            <div className="flex gap-2">
              <ItemMedia variant="icon">
                <Activity />
              </ItemMedia>
              <ItemTitle className="flex min-w-0 items-center gap-2">
                <span className="shrink-0 font-bold">{member.name}</span>
                <ItemDescription>{member.role}</ItemDescription>
              </ItemTitle>
            </div>
            <div className="">
              <ItemDescription>
                <Button variant="link">Link</Button>• {member.timeStamp}
              </ItemDescription>
            </div>
          </Item>
        ))}
      </ScrollArea>
      {/* <Tabs defaultValue="activity">
        <TabsList>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
        </TabsList>

        <TabsContent value="activity">
          <ScrollArea className="h-[300px]">
            <div className="space-y-1">
              {teamMember.map((activity) => (
                <Item key={activity.username} size="sm">
                  <ItemMedia variant="icon">
                    <Activity />
                  </ItemMedia>

                  <ItemContent>
                    <ItemTitle>{activity.name}</ItemTitle>
                    <ItemDescription>{activity.role}</ItemDescription>
                  </ItemContent>
                </Item>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs> */}
      {/* <div className="space-y-0">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="text-sm leading-6 text-muted-foreground"
          >
            <span className="font-semibold text-foreground">
              {activity.username}
            </span>{" "}
            <span>{activity.action}</span>{" "}
            <span className="text-muted-foreground">· {activity.time}</span>
          </div>
        ))}
      </div> */}
    </>
  );
}

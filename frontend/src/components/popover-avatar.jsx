import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Accessible,
  Box,
  Circle,
  LayoutGrid,
  Lock,
  PlayerPlay,
  Tools,
} from "tabler-icons-react";

import {
  IconPalette,
  Icon123,
  IconCircleFilled,
  IconUser,
} from "@tabler/icons-react";

import { CircleCheck } from "tabler-icons-react";
import { Separator } from "./ui/separator";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";
import { IconAlertSquareFilled } from "@tabler/icons-react";
import { CommandBasic } from "./command-basic";
import { useEffect, useState } from "react";
import { StatusIcon } from "./status-icon";
import { CommandStatus } from "./command-status";
import { CommandIcon } from "./command-icon";
import { CommandAvatar } from "./command-avatar";
import { useWorkspace } from "@/hooks/useWorkspace";
import SecureStorage from "@/helpers/SecureStorage";
import { useUserApi } from "@/presentation/logics/app/useUser";
import { CommandOwnerWorkspace } from "./command-owner-workspace";
import { useWorkspaceApi } from "@/presentation/logics/app/useWorkspaceApi";
import { useProjectApi } from "@/presentation/logics/app/useProject";

// const avatars = [
//   // {
//   //   id: null,
//   //   username: "unassigned",
//   //   avatar: IconUser,
//   //   initial: "CN",
//   // },
//   {
//     id: 1,
//     username: "shadcn",
//     avatar: "/avatars/shadcn.jpg",
//     initial: "CN",
//   },
//   {
//     id: 2,
//     username: "ashutosh",
//     avatar: "/avatars/ashutosh.jpg",
//     initial: "AS",
//   },
//   {
//     id: 3,
//     username: "zach",
//     avatar: "/avatars/ashutosh.jpg",
//     initial: "ZC",
//   },
//   {
//     id: 4,
//     username: "gabriel",
//     avatar: "/avatars/ashutosh.jpg",
//     initial: "GB",
//   },
// ];

export function PopoverAvatar({
  variant = "outline",
  item,
  showLabel = true,
  showPercent = false,
  size = "sm",
  sizeAvatar = "sm",
  unassigned = true,
  create = true,
  useCommandOwnerWorkspace = false,
  field,
  projectId,
}) {
  const { activeWorkspace, workspaces, switchWorkspace, isSwitching } =
    useWorkspace();

  const { useProjectById } = useProjectApi();
  const { data: project } = useProjectById(projectId);
  const { useWorkspaceMembers } = useWorkspaceApi();
  const { useAllUsers } = useUserApi();

  const { data: users } = useAllUsers({ workspaceId: activeWorkspace?.id });

  const data =
    project?.isPublic === false
      ? project?.members.map((member) => member.user)
      : users;

  console.log(
    "mem",
    project?.members.map((member) => member.user),
  );

  const avatars = data;
  console.log("avatars", projectId);

  const [avatar, setAvatar] = useState({
    id: null,
    username: "unassigned",
    avatarUrl: "/avatars/shadcn.jpg",
    initial: null,
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!create) {
      if (field?.assignee) {
        setAvatar(field?.assignee || {});
      }
      console.log("data?.assignee", field);
    }
  }, [field?.assignee]);

  // useEffect(() => {
  //   if (!create) {
  //     if ((activeWorkspace, data?.users)) {
  //       setAvatar(
  //         data?.users.find((avatar) => avatar.id === activeWorkspace.ownerId) ||
  //           {},
  //       );
  //     }
  //   }
  // }, [activeWorkspace, data?.users]);

  useEffect(() => {
    if (projectId) {
      setAvatar({
        id: null,
        username: "unassigned",
        avatarUrl: "/avatars/shadcn.jpg",
        initial: null,
      });
    }
  }, [projectId]);
  return (
    <>
      <Popover open={open} onOpenChange={setOpen} className="">
        <PopoverTrigger
          className=""
          render={
            <Button
              onClick={() => setOpen(!open)}
              variant={variant}
              size={size}
              className="gap-2 text-xs "
            >
              <Avatar size={sizeAvatar}>
                <AvatarImage
                  src={avatar.avatarUrl}
                  alt="@shadcn"
                  className="grayscale"
                />
                <AvatarFallback>
                  {avatar.username ? (
                    avatar.username.slice(0, 2).toUpperCase()
                  ) : (
                    <IconUser />
                  )}
                </AvatarFallback>
              </Avatar>
              {showLabel && avatar.username}
            </Button>
          }
        />
        <PopoverContent align="center" className="w-full p-0 " side="bottom">
          {!useCommandOwnerWorkspace && (
            <CommandAvatar
              unassigned={unassigned}
              avatars={avatars}
              setAvatar={setAvatar}
              open={open}
              field={field}
              item={field?.avatar}
              setOpen={setOpen}
            />
          )}
          {useCommandOwnerWorkspace && (
            <CommandOwnerWorkspace
              unassigned={unassigned}
              avatars={avatars}
              field={field}
              item={field?.avatar}
              setAvatar={setAvatar}
              open={open}
              setOpen={setOpen}
            />
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}

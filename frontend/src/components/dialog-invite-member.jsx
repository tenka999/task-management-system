import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputGroupButton } from "./ui/input-group";
import { PlusIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IconUserCog, IconUserEdit, IconUserSearch } from "@tabler/icons-react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "./ui/item";
import { description } from "./chart-area-interactive";
import { useState } from "react";

const items = [
  {
    label: "Member",
    value: "member",
    description: "Can access all public item in your workspace",
    icon: IconUserEdit,
  },
  {
    label: "Guest",
    value: "guest",
    description:
      "Can't use all features or be added to Spaces. Can only access items shared with them.",
    icon: IconUserSearch,
  },
  {
    label: "Admin",
    value: "admin",
    description:
      "Can manage Spaces, People,Billing and other Workspace settings.",
    icon: IconUserCog,
  },
];

export default function DialogInviteMember() {
  const [activeItems, setActiveItems] = useState("member");
  const activeItem = items.find((item) => item.value === activeItems);
  return (
    <Dialog>
      <form>
        <DialogTrigger
          render={
            <InputGroupButton variant="default" size="sm" className="ml-auto">
              <PlusIcon />
              Invite members
            </InputGroupButton>
          }
        />
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Invite member</DialogTitle>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="emmail-1">Email</Label>
              <Input id="email-1" name="email" placeholder="email" />
            </Field>
            <Field>
              <Label htmlFor="username-1">Invite as</Label>
              <Select
                value={activeItems}
                onValueChange={setActiveItems}
                defaultValue={items[0].value}
                items={items}
              >
                <SelectTrigger className="w-full h-full!  ">
                  {/* <SelectItem key={activeItems} value={activeItems}>
                    {activeItems}
                  </SelectItem> */}
                  <SelectValue className="">
                    <Item size="xs" className="p-0  ">
                      <ItemMedia className="border p-3 bg-secondary rounded-lg">
                        <activeItem.icon />
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle className="whitespace-nowrap">
                          {activeItem.label}
                        </ItemTitle>
                        <ItemDescription className="whitespace-normal">
                          {activeItem.description}
                        </ItemDescription>
                      </ItemContent>
                    </Item>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent alignItemWithTrigger={false}>
                  <SelectGroup>
                    {/* <SelectLabel>Fruits</SelectLabel> */}
                    {items.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        <Item size="xs" className="p-0 ">
                          <ItemMedia className="border p-3 bg-secondary rounded-lg">
                            <item.icon />
                          </ItemMedia>
                          <ItemContent>
                            <ItemTitle className="whitespace-nowrap">
                              {item.label}
                            </ItemTitle>
                            <ItemDescription className="whitespace-normal text-xs">
                              {item.description}
                            </ItemDescription>
                          </ItemContent>
                        </Item>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

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

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

const members = [
  {
    id: "1",
    name: "John Doe",
    email: "Dd0tC1@example.com",
  },
  {
    id: "2",
    name: "John Doe",
    email: "Dd0tC2@example.com",
  },
  {
    id: "3",
    name: "abe",
    email: "Dd0tC3@example.com",
  },
];

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

export default function DialogInviteMemberProject() {
  const [activeItems, setActiveItems] = useState("member");
  const [selectedMember, setSelectedMember] = useState(null);
  const activeItem = items.find((item) => item.value === activeItems);

  return (
    <Dialog>
      {/* Trigger berada di luar form */}
      <form>
        <DialogTrigger
          render={
            <InputGroupButton variant="default" size="sm" className="ml-auto">
              <PlusIcon />
              Invite members
            </InputGroupButton>
          }
        />

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite member</DialogTitle>
          </DialogHeader>

          <FieldGroup>
            {/* EMAIL */}
            <Field>
              <Label>Email</Label>
              <Combobox
                items={members}
                value={selectedMember}
                onValueChange={setSelectedMember}
                itemToStringLabel={(member) => member?.email ?? ""}
                itemToStringValue={(member) => member?.id ?? ""}
              >
                <ComboboxInput
                  placeholder="Search or invite by email"
                  autoComplete="new-password"
                />

                <ComboboxContent>
                  <ComboboxEmpty>No member found.</ComboboxEmpty>

                  <ComboboxList>
                    {(member) => (
                      <ComboboxItem key={member.id} value={member}>
                        <div>
                          <p>{member.name}</p>
                          <p>{member.email}</p>
                        </div>
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>

            {/* INVITE AS */}
            <Field>
              <Label htmlFor="invite-as">Invite as</Label>

              <Select
                value={activeItems}
                onValueChange={setActiveItems}
                items={items}
              >
                <SelectTrigger
                  id="invite-as"
                  className="h-full! w-full flex items-center"
                >
                  <SelectValue>
                    <Item size="xs" className="p-0 pb-1  flex  items-center ">
                      <div className="">
                        <ItemMedia className=" rounded-lg border bg-secondary p-3 ">
                          <activeItem.icon />
                        </ItemMedia>
                      </div>

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
                    {items.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        <Item size="xs" className="p-0">
                          <ItemMedia className="rounded-lg border bg-secondary p-3">
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

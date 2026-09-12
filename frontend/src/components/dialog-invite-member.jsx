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
import { Loader2, PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
import { useEffect, useState } from "react";
import { useWorkspace } from "@/hooks/useWorkspace";
import { useInvitationApi } from "@/presentation/logics/app/useInvitation";

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

export default function DialogInviteMember({
  onSubmit,
  isLoading,
  setShowModal,
  showModal,
}) {
  const [activeItems, setActiveItems] = useState("member");
  const activeItem = items.find((item) => item.value === activeItems);
  const [email, setEmail] = useState("");
  const { createInvitation } = useInvitationApi();
  const { activeWorkspace } = useWorkspace();
  const workspaceInviteSchema = z.object({
    email: z.string().email(),
    status: z.enum(["member", "guest", "admin"]),
  });

  const form = useForm({
    resolver: zodResolver(workspaceInviteSchema),
    defaultValues: {
      email: "",
      status: items[0].value,
    },
  });
  const handleEmailChange = (e) => {
    const email = e.target.value;
    // Only auto-generate slug if user hasn't manually edited it
    form.setValue("email", email);
  };

  const handleSubmit = async (values) => {
    const payload = { ...values, workspaceId: activeWorkspace?.id };
    console.log("payload", payload);
    await onSubmit(payload);
  };

  useEffect(() => {
    if (activeWorkspace?.id) {
      form.setValue("workspaceId", activeWorkspace.id);
    }
  }, [activeWorkspace?.id, form]);
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <Form {...form}>
        <form id="invite-form" onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogTrigger
            render={
              <InputGroupButton
                onClick={() => setShowModal(true)}
                variant="default"
                size="sm"
                className="ml-auto"
              >
                <PlusIcon />
                Invite members
              </InputGroupButton>
            }
          />
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Invite member</DialogTitle>
            </DialogHeader>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter workspace name"
                      {...field}
                      // onChange={handleEmailChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invite as</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    items={items}
                  >
                    <SelectTrigger className="w-full h-full!  ">
                      {/* <SelectItem key={activeItems} value={activeItems}>
                    {activeItems}
                  </SelectItem> */}
                      <SelectValue className="">
                        <Item size="xs" className="p-0  pb-1">
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
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <DialogFooter>
              <DialogClose render={<Button variant="outline">Cancel</Button>} />
              <Button form="invite-form" type="submit">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Invite
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}

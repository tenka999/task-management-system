import { ButtonGroupDemo } from "@/components/button-group";
import { ItemLink } from "@/components/item-link";
import { ToggleGroupOutline } from "@/components/toggle-group";
import { Button } from "@/components/ui/button";
import { PanelLeft, Plus, PlusIcon } from "lucide-react";
import { useState } from "react";
import * as React from "react";
import { MemberFilterProvider } from "@/context/MemberFilterProvider";
import { ItemTask } from "@/components/item-task";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

import { IconPencil, IconX } from "@tabler/icons-react";
import { PopoverMembers } from "@/components/popover-members";

// import { DataTable } from "@/components/data-table";
// import { columns } from "@/components/column";
// import DataTableDemo from "@/components/datatable-demo";
// import { DataTableDemo } from "@/components/datatable-demo";
import { SimpleDataTable } from "@/components/simple-datatable";
import { DataTableDemo } from "@/components/datatable-demo";

import {
  CheckIcon,
  CreditCardIcon,
  InfoIcon,
  MailIcon,
  SearchIcon,
  StarIcon,
} from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function ProfileUserPage() {
  const inputRef = React.useRef(null);

  const [inputMember, setInputMember] = useState("");

  function handleInputMember(event) {
    setInputMember(event.target.value);
  }
  const handleClear = () => {
    setInputMember("");
    inputRef.current?.focus();
  };
  const [toggleProject, setToggleProject] = useState("all");
  return (
    <MemberFilterProvider>
      <ScrollArea className="w-full h-full ">
        <div className="w-full px-[10rem] py-[5rem]  h-full">
          <div className="flex flex-col gap-4 h-full  ">
            <div className="">
              <h1 className="font-bold text-4xl">Manage members</h1>
            </div>
            <div className=" h-full border rounded-xl flex    ">
              <FieldSet className="w-full h-full  ">
                <FieldGroup className="w-full h-full gap-0  ">
                  <Field className="flex-1 flex flex-row items-center px-5  border-b">
                    <div className="">
                      <FieldLabel htmlFor="username">
                        Profile picture
                      </FieldLabel>
                    </div>
                    <div className="flex justify-end">
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                          className="grayscale"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </div>
                  </Field>
                  <Field className="flex-1 flex flex-row  items-center px-5 border-b ">
                    <div className="">
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                    </div>
                    <div className="flex items-center gap-2 justify-end opacity-50 cursor-pointer hover:opacity-100  ">
                      janedoe@gmail.com
                      <IconPencil className="w-4 h-4" />
                    </div>
                    {/* <Input id="username" type="text" placeholder="Max Leiter" /> */}
                  </Field>
                  <Field className="flex-1 flex flex-row px-4 items-center  border-b">
                    <div className="">
                      <FieldLabel htmlFor="firstname">First name</FieldLabel>
                    </div>
                    <Input id="firstname" type="text" placeholder="Jane" />
                  </Field>
                  <Field className="flex-1 flex flex-row  items-center px-5 border-b">
                    <div className="">
                      <FieldLabel htmlFor="lastname">Last name</FieldLabel>
                    </div>
                    <Input id="lastname" type="text" placeholder="Doe" />
                  </Field>
                  <Field className="flex-1 flex flex-row items-center px-5 border-b">
                    <div className="">
                      <FieldLabel htmlFor="title">Title</FieldLabel>
                      <FieldDescription>
                        Your job title or role.
                      </FieldDescription>
                    </div>
                    <Input id="title" type="text" placeholder="Web Developer" />
                  </Field>
                  <Field className="flex-1 flex items-center flex-row px-5  ">
                    <div className="">
                      <FieldLabel htmlFor="username">Username</FieldLabel>
                      <FieldDescription>
                        One word, like a nickname or first name.
                      </FieldDescription>
                    </div>
                    <Input id="username" type="text" placeholder="Jane.Doe" />
                  </Field>
                </FieldGroup>
              </FieldSet>
            </div>
          </div>
          <div className="">
            <div className="px-4 lg:px-6"></div>
          </div>
        </div>
      </ScrollArea>
    </MemberFilterProvider>
  );
}

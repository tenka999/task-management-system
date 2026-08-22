import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsLine } from "./tabs-line";
import { CheckboxInTable } from "./checkbox-table";
import { ButtonLink } from "./button-link";
import { CardProject } from "./card-project";
import * as React from "react";
import { ItemLink } from "./item-link";
import { ItemAvatar } from "./item-avatar";
import { TabsLineTeam } from "./tabs-line-team";
import { ComboboxBasic } from "./combobox-basic";
import { SelectDemo } from "./select-item";
import { ItemActivity } from "./item-activity";

const timeBasedGreeting = {
  morning: "Good morning",
  afternoon: "Good afternoon",
  evening: "Good evening",
  night: "Good night",
};

const summary = {
  dueToday: 12,
  overdue: 5,
  completedToday: 10,
  totalHoursThisWeek: 10,
};

export function SectionCardsTask() {
  const [tabVal, setTabVal] = React.useState("assigned");
  const [tabTeamMember, setTeamMember] = React.useState("design");
  return (
    <div className="grid grid-cols-1 gap-4   *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs  @xl/main:grid-cols-4 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <div className="flex gap-4   *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs  @xl/main:grid-cols-4 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
        <Card size="sm" className="@container/card flex-2 ">
          <CardHeader>
            <CardTitle>
              <h2 className="text-2xl mb-1 pl-2">My Tasks</h2>
            </CardTitle>

            <TabsLine setTabVal={setTabVal} tabVal={tabVal} />
          </CardHeader>
          <CardContent>
            <CheckboxInTable tabVal={tabVal} />
          </CardContent>
          <CardFooter className="flex-col items-end gap-1.5 text-sm">
            <div className="text-muted-foreground">
              <ButtonLink text={"View All Tasks"} />
            </div>
          </CardFooter>
        </Card>
        <Card size="sm" className="@container/card flex-1">
          <CardHeader>
            <CardTitle>
              <h2 className="text-2xl mb-1 pl-2">Project Progress</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4   *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs  @xl/main:grid-cols-4 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
              <CardProject />
            </div>
          </CardContent>
          <CardFooter className="flex-col items-end gap-1.5 text-sm">
            <div className="text-muted-foreground">
              <ButtonLink text={"View All Projects"} />
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="flex gap-4   *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs  @xl/main:grid-cols-4 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
        <Card className="@container/card flex-3" size="sm">
          <CardHeader>
            <CardTitle>
              <h2 className="text-2xl mb-1 pl-2">Team Member</h2>
            </CardTitle>
            <SelectDemo setTeamMember={setTeamMember} />
            {/* <TabsLineTeam setTeamMember={setTeamMember} /> */}
          </CardHeader>
          <CardContent>
            <ItemAvatar tabTeamMember={tabTeamMember} />
          </CardContent>
          <CardFooter className="flex-col items-end gap-1.5 text-sm">
            <div className="text-muted-foreground">
              <ButtonLink text={"View All Member"} />
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card flex-5" size="sm">
          <CardHeader>
            <CardTitle>
              <h2 className="text-2xl mb-1 pl-2">Recent Activity</h2>
            </CardTitle>
          </CardHeader>
          {/* <CardContent> */}
          <ItemActivity />
          {/* </CardContent> */}
          <CardFooter className="flex-col items-end gap-1.5 text-sm">
            <div className="text-muted-foreground">
              <ButtonLink text={"View All Activity"} />
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

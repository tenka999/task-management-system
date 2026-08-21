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
  return (
    // <div className="grid grid-cols-1 gap-4   *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs  @xl/main:grid-cols-4 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
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
            <ButtonLink />
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
            <ButtonLink />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

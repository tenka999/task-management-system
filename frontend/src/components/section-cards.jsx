import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-4 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          {/* <CardDescription> */}
          <div className="line-clamp-1 flex gap-2 font-medium">
            My Open Task
          </div>
          {/* </CardDescription> */}
          <CardTitle className="text-4xl font-bold tabular-nums @[250px]/card:text-3xl">
            {summary.dueToday}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +2
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {/* Trending up this month <IconTrendingUp className="size-4" /> */}
          </div>
          <div className="text-muted-foreground">
            Number of assigned tasks not completed
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <div className="line-clamp-1 flex gap-2 font-medium">
            Due This Week
          </div>
          <CardTitle className="text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {summary.overdue}{" "}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingDown />
              -10
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          {/* <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <IconTrendingDown className="size-4" />
          </div> */}
          <div className="text-muted-foreground">
            tasks with upcoming deadlines
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <div className="line-clamp-1 flex gap-2 font-medium">
            Completed/Month
          </div>
          <CardTitle className="text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {summary.completedToday}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +3%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Completed This Month </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <div className="line-clamp-1 flex gap-2 font-medium">
            Hours Logged
          </div>
          <CardTitle className="text-4xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {summary.totalHoursThisWeek}h
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +2h
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            total time tracked this week
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

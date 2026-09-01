import * as React from "react";
import { CalendarDays } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Calendar } from "@/components/ui/calendar";

export default function ProjectDateCard() {
  const startDate = new Date(2026, 6, 1);
  const endDate = new Date(2026, 7, 31);

  return (
    <Card className="@container/card flex-3" size="sm">
      <CardHeader>
        <CardTitle>
          <h2 className="mb-1 pl-2 text-2xl">Project Timeline</h2>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex w-full flex-col gap-5">
          {/* Date Information */}
          <div className="grid grid-cols-2 gap-4">
            {/* Start Date */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm text-muted-foreground">Start date</span>

              <div className="flex items-center gap-2">
                <CalendarDays className="size-4 text-muted-foreground" />

                <span className="text-sm font-medium">
                  {formatDate(startDate)}
                </span>
              </div>
            </div>

            {/* End Date */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm text-muted-foreground">End date</span>

              <div className="flex items-center gap-2">
                <CalendarDays className="size-4 text-muted-foreground" />

                <span className="text-sm font-medium">
                  {formatDate(endDate)}
                </span>
              </div>
            </div>
          </div>

          {/* Calendar View */}
          <div className="flex justify-center border-t pt-4">
            <Calendar
              mode="range"
              selected={{
                from: startDate,
                to: endDate,
              }}
              onSelect={startDate}
              defaultMonth={startDate}
              className="rounded-lg"
            />
            <Calendar
              mode="range"
              selected={{
                from: endDate,
                to: startDate,
              }}
              onSelect={endDate}
              defaultMonth={endDate}
              className="rounded-lg"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

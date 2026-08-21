import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
// import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import "@/styles/dashboard.css";
import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react";
import { SectionCardsTask } from "@/components/section-cards-task";

export default function DahsboardPage() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-page-top">
        <div className="dashboard-top-headline">
          <h3>
            Welcome Back, <span>User</span>{" "}
          </h3>
        </div>
        <div className="dashboard-top-actions">
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <SectionCards />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="px-4 lg:px-6">
          <SectionCardsTask />
        </div>
      </div>
    </div>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */

import { LayoutContext } from "@/context/Context";
import React, { useContext, useEffect, useRef } from "react";
import {
  Outlet,
  redirect,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router";
// import AppSidebar from "./AppSidebar";
import { ProgressDemo } from "@/components/progress";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
// import DashboardPage from "./DashboardPage";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const iframeHeight = "800px";

export const description = "A sidebar with a header and a search form.";

const Layout = () => {
  return (
    <React.Fragment>
      {/* <ProgressBar
        id="progress-bar-indicator"
        mode="indeterminate"
        style={{
          height: "6px",
          zIndex: 1000,
          display: "none",
        }}
      ></ProgressBar> */}
      {/* <Progress /> */}
      <div className="[--header-height:calc(--spacing(14))]">
        <SidebarProvider className="flex flex-col">
          <SiteHeader />
          <div className="flex flex-1">
            <AppSidebar />
            <SidebarInset>
              <Outlet />
            </SidebarInset>
          </div>
        </SidebarProvider>
      </div>
    </React.Fragment>
  );
};

export default Layout;

"use client"

import * as React from "react"
import {
  GlobeIcon,
  BarChartIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileIcon,
  LeafIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  TrendingUpIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
  ThermometerIcon,
} from "lucide-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Climate Analyst",
    email: "analyst@climatedata.org",
    avatar: "/avatars/climate-avatar.jpg",
  },
  navMain: [
    {
      title: "Climate Overview",
      url: "#",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Carbon Footprint",
      url: "#",
      icon: LeafIcon,
    },
    {
      title: "Climate Analytics",
      url: "#",
      icon: BarChartIcon,
    },
    {
      title: "Climate Initiatives",
      url: "#",
      icon: TrendingUpIcon,
    },
    {
      title: "Action Network",
      url: "#",
      icon: UsersIcon,
    },
  ],
  navSecondary: [
    {
      title: "Data Preferences",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Climate Resources",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Climate Data Search",
      url: "#",
      icon: SearchIcon,
    },
  ],
  documents: [
    {
      name: "Climate Data Sources",
      url: "#",
      icon: DatabaseIcon,
    },
    {
      name: "IPCC Reports & Studies",
      url: "#",
      icon: ClipboardListIcon,
    },
    {
      name: "Climate Policy Tracker",
      url: "#",
      icon: FileIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <GlobeIcon className="h-5 w-5 text-green-600" />
                <span className="text-base font-semibold">Climate Data Hub</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

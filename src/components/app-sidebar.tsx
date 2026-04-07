"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { BookOpenTextIcon } from "lucide-react"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Introduction",
          url: "#introduction",
          isActive: true,
        },
        {
          title: "Quick Start",
          url: "#quick-start",
        },
      ],
    },
    {
      title: "Random Data API",
      url: "#",
      items: [
        {
          title: "Endpoints",
          url: "#random-endpoints",
        },
        {
          title: "Query Parameters",
          url: "#random-query",
        },
        {
          title: "Response Format",
          url: "#random-response",
        },
      ],
    },
    {
      title: "Placeholder Images API",
      url: "#",
      items: [
        {
          title: "Image Endpoint",
          url: "#placeholder-image",
        },
        {
          title: "Avatar Endpoint",
          url: "#placeholder-avatar",
        },
        {
          title: "Customization",
          url: "#placeholder-customization",
        },
      ],
    },
    {
      title: "Guides",
      url: "#",
      items: [
        {
          title: "Error Handling",
          url: "#error-handling",
        },
        {
          title: "Locales Support",
          url: "#locales",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="#" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black">
                <BookOpenTextIcon className="size-5" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold text-base">API Docs</span>
                <span className="text-xs text-muted-foreground">v1.0</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton className="font-semibold" render={<a href={item.url} />}>
                  {item.title}
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton
                          isActive={item.isActive}
                          render={<a href={item.url} />}
                        >
                          {item.title}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

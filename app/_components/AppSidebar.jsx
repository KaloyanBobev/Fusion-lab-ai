import Image from "next/image";
import { Sun } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-3">
          <div className="flex items-center gap-3">
            <Image
              src={"../logo.svg"}
              alt="logo"
              width={60}
              height={60}
              className="w-[40px] h-[40px]"
            />
            <h2 className="font-bold text-xl">AI Fusion</h2>
          </div>
          <div>
            <Button>
              <Sun />
            </Button>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

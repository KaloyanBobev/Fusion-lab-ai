import Image from "next/image";
import { Sun, Moon, User2, Bolt, Zap } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { SignInButton, useUser } from "@clerk/nextjs";
import UsageCreditProgress from "./UsageCreditProgress";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { useEffect } from "react";

export function AppSidebar() {
  const { theme, setTheme } = useTheme();
  const { user } = useUser();

  useEffect(() => {
    user && GetChatHistory();
  }, [user]);

  const GetChatHistory = async () => {
    const q = query(
      collection(db, "chatHistory"),
      where("userEmail", "==", user?.primaryEmailAddress?.emailAddress),
    );
    const querySnapshop = await getDoc(q);

    querySnapshop.forEach((doc) => {
      console.log(doc.id, doc.data());
    });
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-3">
          <div className=" flex justify-between items-center">
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
              {theme == "light" ? (
                <Button variant={"ghost"} onClick={() => setTheme("dark")}>
                  {" "}
                  <Sun />
                </Button>
              ) : (
                <Button variant={"ghost"} onClick={() => setTheme("light")}>
                  <Moon />
                </Button>
              )}
            </div>
          </div>
          {user ? (
            <Button className="mt-7 w-full" size="lg">
              + New Chat
            </Button>
          ) : (
            <SignInButton>
              <Button className="mt-7 w-full" size="lg">
                + New Chat
              </Button>
            </SignInButton>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className={"p-3"}>
            <h2 className="font-bold text-lg">Chat</h2>
            {!user && (
              <p className="text-sm text-gray-400">
                Sign in to start chating with multiple AI models{" "}
              </p>
            )}
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-3 mb-10 ">
          {!user ? (
            <SignInButton mode="modal">
              <Button className={"w-full"} size={"lg"}>
                Sign In/Sign Up
              </Button>
            </SignInButton>
          ) : (
            <div>
              <UsageCreditProgress />
              <Button className={"w-full mb-3"}>
                <Zap />
                Upgrade Plan
              </Button>
              <Button className="flex " variant={"ghost"}>
                <User2 /> <h2>Settings</h2>
              </Button>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

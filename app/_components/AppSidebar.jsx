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
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/FirebaseConfig";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import Link from "next/link";
import axios from "axios";

export function AppSidebar() {
  const { theme, setTheme } = useTheme();
  const { user } = useUser();

  const [chatHistory, setChatHistory] = useState([]);
  const [freeMsgCount, setFreeMsgCount] = useState(0);

  useEffect(() => {
    user && GetChatHistory();
    user && GetRemanimgTokenMsgs();
  }, [user]);

  const GetChatHistory = async () => {
    const q = query(
      collection(db, "chatHistory"),
      where("userEmail", "==", user?.primaryEmailAddress?.emailAddress),
    );
    const querySnapshop = await getDocs(q);

    querySnapshop.forEach((doc) => {
      console.log(doc.id, doc.data());
      setChatHistory((prev) => [...prev, doc.data()]);
    });
  };

  const GetLastUserMessageFromChat = (chat) => {
    const allMessages = Object.values(chat?.messages || {}).flat();
    const userMessages = allMessages.filter((msg) => msg?.role === "user");

    const lastUserMsgObj = userMessages[userMessages.length - 1];
    const lastUserMsg = lastUserMsgObj?.content || "New Chat";

    const lastUpdated = chat?.lastUpdated || Date.now();
    const formattedDate = moment(lastUpdated).fromNow();

    return {
      chatId: chat?.chatId || "",
      message: lastUserMsg,
      lastMsgDate: formattedDate,
    };
  };

  const GetRemanimgTokenMsgs = async () => {
    const result = await axios.get("/api/user-remaining-msg");
    console.log(result);
    setFreeMsgCount(result?.data?.remainingToken);
  };

  // const GetLastUserMessageFromChat = (chat) => {
  //   const allMessages = Object.values(chat.messages).flat();
  //   const userMessages = allMessages.filter((msg) => msg.role == "user");

  //   const lastUserMsg = userMessages[userMessages.length - 1].content || null;

  //   const lastUpdated = chat.lastUpdated || Date.now();
  //   const formattedDate = moment(lastUpdated).fromNow();
  //   return {
  //     chatId: chat.chatId,
  //     message: lastUserMsg,
  //     lastMsgDate: formattedDate,
  //   };
  // };

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
            <Link href={"/"}>
              <Button className="mt-7 w-full" size="lg">
                + New Chat
              </Button>
            </Link>
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
            {chatHistory.map((chat, index) => (
              <Link
                href={`?chatId=${chat.chatId}`}
                key={index}
                className="mt-2 "
              >
                <div className="hover:bg-gray-100 p-3 cursor-pointer">
                  <h2 className="text-sm text-gray-400">
                    {GetLastUserMessageFromChat(chat).lastMsgDate}
                  </h2>
                  <h2 className="text-lg line-clamp-1">
                    {GetLastUserMessageFromChat(chat).message}
                  </h2>
                </div>
                <hr className="my-3" />
              </Link>
            ))}
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
              <UsageCreditProgress remainingToken={remainingToken} />
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

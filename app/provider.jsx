"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/AppSidebar";
import AppHeader from "./_components/AppHeader";
import { useUser } from "@clerk/nextjs";
import { db } from "@/config/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AiSelectedModelContext } from "@/context/AiSelectedModelContext";
import { DefaultModel } from "@/shared/AiModelsShared";
import { UserDetailContext } from "@/context/UserDetailContext";

function Provider({ children, ...props }) {
  const { user } = useUser();
  const [aiSelectedModels, setAiSelectedModels] = useState(DefaultModel);
  const [userDetail, setUserDatail] = useState();

const [messages, setMessages] = useState({});

useEffect(() => {
  if (user) {
    CrateNewUser();
  }
}, [user]);

const CrateNewUser = async () => {
  //if user exist
  const userRef = doc(db, "users", user?.primaryEmailAddress?.emailAddress);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    console.log("Existing user");
    const userInfo = userSnap.data();
    setAiSelectedModels(userInfo?.selectedModelPref ?? DefaultModel);
    setUserDatail(userInfo);
    return;
  } else {
    const userData = {
      name: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      crearAT: new Date(),
      ramingMsg: 5, //only for free users
      plan: "Free",
      credits: 1000, //paid users
    };
    await setDoc(userRef, userData);
    console.log("New User data saved");
    setUserDatail(userData);
  }
  //if not then insert
};
return (
  <NextThemesProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
    {...props}
  >
    <UserDetailContext.Provider value={{ userDetail, setUserDatail }}>
      <AiSelectedModelContext.Provider
        value={{ aiSelectedModels, setAiSelectedModels, messages, setMessages }}
      >
        <SidebarProvider>
          <AppSidebar />
          {/* min-w-0 */}
          <div className={"w-full "}>
            <AppHeader />
            {children}
          </div>
        </SidebarProvider>
      </AiSelectedModelContext.Provider>
    </UserDetailContext.Provider>
  </NextThemesProvider>
);
}

export default Provider;

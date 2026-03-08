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
  const [userDetail, setUserDatail] = useState(null);
  const [messages, setMessages] = useState({});
  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      createNewUser();
    }
  }, [user]);

  useEffect(() => {
    if (
      userLoaded &&
      user?.primaryEmailAddress?.emailAddress &&
      aiSelectedModels
    ) {
      updateAiModelSelectionPref();
    }
  }, [aiSelectedModels, userLoaded, user]);

  const updateAiModelSelectionPref = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;

      const docRef = doc(db, "users", email);

      await setDoc(
        docRef,
        {
          selectedModelPref: aiSelectedModels,
        },
        { merge: true },
      );
    } catch (error) {
      console.error("Error updating model selection preferences:", error);
    }
  };

  const createNewUser = async () => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;

      const userRef = doc(db, "users", email);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        console.log("Existing user");
        const userInfo = userSnap.data();

        setAiSelectedModels(userInfo?.selectedModelPref ?? DefaultModel);
        setUserDatail(userInfo);
        setUserLoaded(true);
        return;
      }

      const userData = {
        name: user?.fullName || "",
        email,
        createdAt: new Date(),
        remainingMsg: 5,
        plan: "Free",
        credits: 1000,
        selectedModelPref: DefaultModel,
      };

      await setDoc(userRef, userData);
      console.log("New user data saved");

      setAiSelectedModels(DefaultModel);
      setUserDatail(userData);
      setUserLoaded(true);
    } catch (error) {
      console.error("Error creating/loading user:", error);
    }
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
          value={{
            aiSelectedModels,
            setAiSelectedModels,
            messages,
            setMessages,
          }}
        >
          <SidebarProvider>
            <AppSidebar />
            <div className="w-full">
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
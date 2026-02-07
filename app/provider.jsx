"use client";
import React, { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/AppSidebar";
import AppHeader from "./_components/AppHeader";
import { useUser } from "@clerk/nextjs";
import { db } from "@/config/FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Provider({ children, ...props }) {
  const { user } = useUser();

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
      <SidebarProvider>
        <AppSidebar />
        {/* min-w-0 */}
        <div className={"w-full "}>
          <AppHeader />
          {children}
        </div>
      </SidebarProvider>
    </NextThemesProvider>
  );
}

export default Provider;

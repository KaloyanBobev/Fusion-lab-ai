import { Suspense } from "react";
import ChatWrapper from "./ChatWrapper";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatWrapper />
    </Suspense>
  );
}

// "use client";
// export const dynamic = "force-dynamic";
// import { useTheme } from "next-themes";

// import ChatInputBox from "./_components/ChatInputBox";

// export default function Home() {
//   const { setTheme } = useTheme();

//   return (
//     <div>
//       <ChatInputBox />
//     </div>
//   );
// }

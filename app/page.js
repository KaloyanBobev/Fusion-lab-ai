import { Suspense } from "react";
import ChatWrapper from "./ChatWrapper";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatWrapper />
    </Suspense>
  );
}

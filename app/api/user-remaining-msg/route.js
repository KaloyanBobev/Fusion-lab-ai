import { aj } from "@/config/Arcjet";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  const user = await currentUser();
  const decision = await aj.protect(req, {
    userId: user?.primaryEmailAddress?.emailAddress,
    requested: 0,
  }); // Deduct 5 tokens from the bucket
  console.log("Arcjet decision", decision.reason.remaining);
  const remainingToken = decision.reason.remaining;

  return NextResponse.json({ remainingToken: remainingToken });
}

import { aj } from "@/config/Arcjet";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const user = await currentUser();
    const body = await req.json();
    const token = body?.token;

    // ✅ Always provide a safe fallback
    const safeUserId =
      user?.primaryEmailAddress?.emailAddress || "anonymous-user";

    const decision = await aj.protect(req, {
      userId: safeUserId,
      requested: typeof token !== "undefined" ? token : 0,
    });

    const remaining = decision?.reason?.remaining ?? 0;

    if (decision.isDenied()) {
      return NextResponse.json({
        error: "Too many requests",
        remainingToken: remaining,
      });
    }

    return NextResponse.json({
      allowed: true,
      remainingToken: remaining,
    });
  } catch (error) {
    console.error("🔥 Arcjet ERROR:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        remainingToken: 0,
      },
      { status: 500 },
    );
  }
}

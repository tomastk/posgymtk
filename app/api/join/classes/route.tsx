import { cancelReserve } from "@/app/reserves/reserves-service";
import { getSession } from "@/app/sessions/session-service";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const cookiesStore = await cookies();
  const sessionId = cookiesStore.get("authenticatedSession")?.value;

  if (!sessionId) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const session = await getSession(sessionId);

  if (!session) {
    return NextResponse.json({ success: false }, { status: 404 });
  }

  const data = await req.json();
  try {
    await cancelReserve({ ...data, idReserver: session.sessionUser });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false }, { status: 500 });
  }
  return NextResponse.json({ success: true });
};

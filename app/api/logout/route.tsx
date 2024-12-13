import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const GET = async () => {
  const cookiesStore = await cookies();
  cookiesStore.delete("authenticatedSession");
  return NextResponse.json({ success: true });
};

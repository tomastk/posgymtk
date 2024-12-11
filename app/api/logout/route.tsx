import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const cookiesStore = await cookies();
  cookiesStore.delete("authenticatedSession");
  return NextResponse.json({ success: true });
};

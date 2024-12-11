import { getSession } from "@/app/sessions/session-service";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type RequestBody = {
  idSession: string;
  userCode: string;
};

export const POST = async (req: Request) => {
  const cookiesStore = await cookies();
  const { idSession, userCode } = (await req.json()) as RequestBody;
  const session = await getSession(idSession);
  if (!session) return NextResponse.json({ success: false });

  const isCodeCorrect = session.verificationCode === userCode;

  if (!isCodeCorrect) return NextResponse.json({ success: false });

  const IN_ONE_HOUR = new Date(Date.now() + 1000 * 60 * 60);

  cookiesStore.set("authenticatedSession", idSession, {
    httpOnly: true,
    expires: IN_ONE_HOUR,
  });

  revalidatePath("/");

  return NextResponse.json({ success: true });
};

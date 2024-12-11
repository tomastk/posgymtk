import { updateTableRow } from "@/app/appsheet/appsheet-service";
import { getSession } from "@/app/sessions/session-service";
import { STATUS_CODES } from "http";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type RequestBody = {
  name: string;
  email: string;
};

export const POST = async (req: Request) => {
  const { name, email } = (await req.json()) as RequestBody;
  console.log("Ha llegado un POST a updateProfile");

  const cookieStore = await cookies();
  const idSession = cookieStore.get("authenticatedSession")?.value;

  if (!idSession) {
    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 401,
        statusText: STATUS_CODES[401],
      }
    );
  }
  const session = await getSession(idSession);

  if (!session) {
    return NextResponse.json(
      { success: false },
      { status: 404, statusText: STATUS_CODES[404] }
    );
  }

  const updateReserverData = {
    idReserver: session.sessionUser,
    name,
    email,
  };

  const updatedReserver = await updateTableRow("Reservers", updateReserverData);
  console.log(updateReserverData);

  return NextResponse.json({ success: true });
};

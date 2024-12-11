import { cookies } from "next/headers";
import React from "react";
import { getSession } from "../sessions/session-service";
import { redirect } from "next/navigation";
import EditAccount from "./EditAccount";

const Account = async () => {
  const cookiesStore = await cookies();
  const sessionId = cookiesStore.get("authenticatedSession")?.value;

  if (!sessionId) return redirect("/login");

  const session = await getSession(sessionId);

  if (!session) return redirect("/login");

  return (
    <>
      <EditAccount session={session} />
    </>
  );
};

export default Account;

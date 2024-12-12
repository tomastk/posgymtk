import { findClassById } from "@/app/classes/classes-service";
import { Class } from "@/app/classes/ClassList";
import { redirect, RedirectType } from "next/navigation";
import { cookies } from "next/headers";
import { CreatedSession, getSession } from "@/app/sessions/session-service";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createReserve } from "@/app/reserves/reserves-service";
import CancelReserve from "@/app/components/CancelReserve";

async function Page({ params }: { params: { id: string } }) {
  const cookiesStore = await cookies();
  const session = cookiesStore.get("authenticatedSession")?.value;

  if (!session) throw redirect("/login");

  const sessionData = (await getSession(session)) as CreatedSession;
  if (!sessionData) throw redirect("/login");

  const { id: classToJoinId } = params;
  const findedClass = (await findClassById(classToJoinId)) as Class;

  const userId = sessionData.sessionUser;

  const userHasJoinedClass = findedClass.reserverParsed.includes(userId);

  if (!findedClass) throw redirect("/", RedirectType.replace);

  if (!userHasJoinedClass) {
    await createReserve({ idClass: classToJoinId, idReserver: userId });
  }

  return (
    <main className="flex gap-4 flex-col max-w-[80%] m-auto">
      <h2 className="font-bold text-3xl">{findedClass.className}</h2>
      <p className="text-xl">{findedClass.classDescription}</p>

      <p className="text-md">
        {userHasJoinedClass
          ? "Ya estabas inscrito en esta clase. ¡Te esperamos!"
          : "Te has inscrito en esta clase. ¡Te esperamos!"}
      </p>
      <CancelReserve idClass={classToJoinId} />
    </main>
  );
}

export default Page;

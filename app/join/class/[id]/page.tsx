import { findClassById } from "@/app/classes/classes-service";
import { Class } from "@/app/classes/ClassList";
import { redirect, RedirectType } from "next/navigation";
import { cookies } from "next/headers";
import { CreatedSession, getSession } from "@/app/sessions/session-service";
import {
  createReserve,
  getRawUserReserves,
} from "@/app/reserves/reserves-service";
import CancelReserve from "@/app/components/CancelReserve";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const cookiesStore = await cookies();
  const session = cookiesStore.get("authenticatedSession")?.value;

  if (!session) throw redirect("/login");

  const sessionData = (await getSession(session)) as CreatedSession;
  if (!sessionData) throw redirect("/login");

  const { id: classToJoinId } = await params;
  const findedClass = (await findClassById(classToJoinId)) as Class;

  const userId = sessionData.sessionUser;

  const userHasJoinedClass = findedClass.reserverParsed.includes(userId);

  if (!findedClass) throw redirect("/", RedirectType.replace);

  if (findedClass.hasAvailableSpace === "N") {
    throw redirect(
      `/reserves?message=No hay cupos disponibles dentro de esta clase`,
      RedirectType.replace
    );
  }

  if (userHasJoinedClass) {
    throw redirect(
      "/reserves?message=Ya te has unido previamente",
      RedirectType.replace
    );
  }

  const userRawReserves = await getRawUserReserves(userId);

  const userDayReserves = userRawReserves.filter((reserve) => {
    return reserve.classDate === findedClass.date;
  });

  const reserveTakedTimes = userDayReserves.map((reserve) => reserve.classTime);

  const userHasOverlap = isSomeTimeOverlapping(
    reserveTakedTimes,
    findedClass.time
  );

  let error = "";

  if (userHasOverlap) {
    error = "Ya tienes una clase en ese horario";
  } else {
    await createReserve({ idClass: classToJoinId, idReserver: userId });
  }

  return (
    <main className="flex gap-4 flex-col max-w-[80%] m-auto">
      <h2 className="font-bold text-3xl">{findedClass.className}</h2>
      <p className="text-xl">{findedClass.classDescription}</p>

      {error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <p className="text-green-600">
          Reserva realizada con exito. ¡Te esperamos!
        </p>
      )}

      <CancelReserve idClass={classToJoinId} />
    </main>
  );
}

export default Page;

function isSomeTimeOverlapping(
  reserveTakedTimes: string[],
  time: string
): boolean {
  if (reserveTakedTimes.length === 0) return false;
  return reserveTakedTimes.some((reserveTime) => reserveTime === time);
}

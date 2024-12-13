import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "../sessions/session-service";
import { getUserReserves } from "./reserves-service";
import ClassList from "../classes/ClassList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ReservesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const revalidate = 0;

async function ReservesPage({ searchParams }: ReservesPageProps) {
  const cookieStore = await cookies();
  const authenticatedSession = cookieStore.get("authenticatedSession");

  if (!authenticatedSession) throw redirect("/login");

  const session = await getSession(authenticatedSession.value);

  if (!session) throw redirect("/login");

  const userReserves = await getUserReserves(session.sessionUser);

  const { message } = await searchParams;

  return (
    <div className="flex items-center flex-col gap-4 max-w-[80%] m-auto">
      {message && (
        <p className="text-center text-md p-2 bg-slate-950 text-white w-full shadow-sm">
          {message}
        </p>
      )}
      <h1 className="text-center font-bold text-3xl">Tus reservas</h1>
      {userReserves.length === 0 && (
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-center font-bold text-xl">
            Todavía no tenés ninguna reserva hecha
          </h2>
          <p className="text-center text-md">
            ¡Explora las clases que tenemos disponibles!
          </p>
          <Button asChild className="w-fit">
            <Link href="/">Explorar</Link>
          </Button>
        </div>
      )}
      <ClassList classes={userReserves} noButton />
    </div>
  );
}

export default ReservesPage;

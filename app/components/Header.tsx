import Link from "next/link";
import React from "react";
import { getApiKey } from "../appsheet/appsheet-service";
import { cookies } from "next/headers";
import LogoutButton from "./Logout";
import { Button } from "@/components/ui/button";
import NavMenu from "./NavMenu";

async function Header() {
  const cookiesStore = await cookies();
  const authenticatedSession = cookiesStore.get("authenticatedSession")?.value;

  if (authenticatedSession) {
    return (
      <div className="m-auto py-6 max-w-[80%] flex justify-around">
        <Link href="/">
          <h2 className="font-bold text-xl text-blue-950 uppercase">
            Posgymtk
          </h2>
        </Link>
        <div>
          <NavMenu phoneNumber={""} userName={""} />
        </div>
      </div>
    );
  }

  return (
    <div className="m-auto py-6 max-w-[80%] flex justify-around">
      <Link href="/">
        <h2 className="font-bold text-xl text-blue-950">Posgymtk</h2>
      </Link>
      <div>
        <Button asChild>
          <Link href={"/login"}>Iniciar Sesión</Link>
        </Button>
      </div>
    </div>
  );
}

export default Header;

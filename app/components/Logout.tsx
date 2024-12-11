"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const router = useRouter();

  const logout = () => {
    fetch("/api/logout", { method: "GET" }).then(() =>
      window.location.reload()
    );
  };

  return <Button onClick={logout}>Cerrar Sesión</Button>;
}

export default LogoutButton;

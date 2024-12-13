"use client";

import { Button } from "@/components/ui/button";

function LogoutButton() {
  const logout = () => {
    fetch("/api/logout", { method: "GET" }).then(() =>
      window.location.reload()
    );
  };

  return <Button onClick={logout}>Cerrar Sesión</Button>;
}

export default LogoutButton;

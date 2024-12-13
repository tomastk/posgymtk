"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Loader from "./Loader";

function CancelReserve(props: { idClass: string }) {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const cancelReserveHandler = async () => {
    setLoading(true);
    const confirm = window.confirm("¿Seguro que deseas cancelar la reserva?");

    if (!confirm) return;

    const res = await fetch("/api/join/classes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props),
    }).then((res) => res.json());

    if (res.success) {
      setSuccess(true);
      window.location.href = "/reserves";
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <Button
        className="w-fit"
        onClick={cancelReserveHandler}
        disabled={loading}
      >
        {loading ? <Loader /> : "Cancelar"}
      </Button>
      {success && <p className="text-green-500">Reserva cancelada con éxito</p>}
    </div>
  );
}

export default CancelReserve;

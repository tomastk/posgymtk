"use client";

import { useState } from "react";
import { type CreatedSession } from "../sessions/session-service";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Loader from "../components/Loader";

function EditAccount({ session }: { session: CreatedSession }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userName, setUserName] = useState(session.sessionUserName);
  const [userEmail, setUserEmail] = useState(session.sessionUserEmail);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setLoading(true);
    setError("");
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;

    if (name.length === 0 || email.length === 0) {
      setError("Rellene los campos obligatorios (*)");
      setLoading(false);
      return;
    }

    const data = { name, email };

    const apiResponse = await fetch("/api/updateProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const { success: updateSuccess } = await apiResponse.json();

    if (updateSuccess) {
      setSuccess(true);
    } else {
      setError("Ocurrió algun error al actualizar el perfil");
    }

    setLoading(false);
  };

  return (
    <main className="d-flex m-auto max-w-[80%] flex-col gap-6">
      <h2 className="text-center font-bold text-2xl mb-4">Editar mi Perfil</h2>
      <form
        className="flex flex-col gap-4 items-center"
        onSubmit={handleSubmit}
      >
        <div className="grid w-full max-w-sm items-center gap-4">
          <Label htmlFor="email">Email*</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Nombre*</Label>
          <Input
            type="text"
            id="name"
            placeholder="Nombre"
            name="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-4">
          <Label htmlFor="phone">Telefono</Label>
          <p className="text-sm text-muted-foreground">
            No puedes modificar tu número de telefono porque es tu identificador
            personal.
          </p>
          <Input
            type="text"
            readOnly
            id="phone"
            disabled
            placeholder="Telefono"
            name="phone"
            className="cursor-not-allowed"
            value={"+" + session.userPhoneNumber}
          />
        </div>
        <Button className="min-w-8 w-[fit-content]" disabled={loading}>
          {loading ? <Loader /> : "Guardar"}
        </Button>
        {success && (
          <p className="text-green-800">Se actualizó con éxito tu perfil</p>
        )}
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </main>
  );
}

export default EditAccount;

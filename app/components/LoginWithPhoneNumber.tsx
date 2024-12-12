"use client";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

function LoginWithPhoneNumber() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const sendVerificationCode = async () => {
    setLoading(true);
    const url = "/api/sendCode";
    const fetchData = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber }),
    });

    const { idSession, success } = await fetchData.json();

    if (success) {
      setLoading(false);
      router.refresh();
      router.push(`/verifyCode?sessionId=${idSession}`);
    }
  };

  return (
    <div className="mt-8 flex flex-col gap-8 justify-center items-center">
      <PhoneInput
        className="w-[100%] md:w-[50%] m-auto"
        defaultCountry="AR"
        international={false}
        placeholder="Ingresa tu número de telefono"
        value={phoneNumber}
        onChange={setPhoneNumber as any}
      />
      <Button
        className="min-w-8 w-[fit-content]"
        onClick={sendVerificationCode}
      >
        {loading ? <Loader /> : "Enviar código de verificación"}
      </Button>
    </div>
  );
}

export default LoginWithPhoneNumber;

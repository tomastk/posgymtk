import {
  createReserver,
  getReserverDetails,
  Reserver,
} from "@/app/reserver/reserver-service";
import { createSession } from "@/app/sessions/session-service";
import { NextResponse } from "next/server";

const sendVerificationCode = async (phoneNumber: string, code: string) => {
  const rawData = {
    number: phoneNumber,
    message: `Tu código de verificación para ingresar a Postgymtk es ${code}. No lo comparta con nadie. Gracias!`,
  };

  const response = await fetch(process.env.WW_SERVER_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.BEARER_CODE}`,
    },
    body: JSON.stringify(rawData),
  });

  return await response.json();
};

export const POST = async (req: Request) => {
  const { phoneNumber } = (await req.json()) as { phoneNumber: string };
  const code = generateRandomFourDigitsCode();

  const searchablePhoneNumber = phoneNumber.substring(1, phoneNumber.length);
  let reserverId = "";
  const reserver = await getReserverDetails(searchablePhoneNumber);

  if (!reserver) {
    const createReserverData = { phoneNumber: searchablePhoneNumber };
    const createReserverResponse = (await createReserver(
      createReserverData
    )) as Reserver;
    reserverId = createReserverResponse.idReserver;
  } else {
    reserverId = reserver.idReserver;
  }
  const sessionData = {
    sessionUser: reserverId,
    verificationCode: code.toString(),
  };

  const { idSession } = await createSession(sessionData);

  await sendVerificationCode(searchablePhoneNumber, code.toString());

  return NextResponse.json({ idSession, success: true });
};

const generateRandomFourDigitsCode = () => {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

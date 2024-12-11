import {
  createReserver,
  getReserverDetails,
  Reserver,
} from "@/app/reserver/reserver-service";
import { createSession } from "@/app/sessions/session-service";
import { NextResponse } from "next/server";
import { Twilio } from "twilio";

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

  const twillioClient = new Twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  await twillioClient.messages.create({
    body: `Tu código de verificación para iniciar sesión en PosGymTk es ${code}.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
  });

  return NextResponse.json({ idSession, success: true });
};

const generateRandomFourDigitsCode = () => {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

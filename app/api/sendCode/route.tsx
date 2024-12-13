import {
  createReserver,
  getReserverDetails,
  Reserver,
} from "@/app/reserver/reserver-service";
import { createSession } from "@/app/sessions/session-service";
import { NextResponse } from "next/server";

const sendVerificationCode = async (phoneNumber: string, code: string) => {
  console.log("sendVerificationCode - phoneNumber:", phoneNumber);
  console.log("sendVerificationCode - code:", code);

  const rawData = {
    number: phoneNumber,
    message: `Tu código de verificación para ingresar a Postgymtk es ${code}. No lo comparta con nadie. Gracias!`,
  };

  console.log("sendVerificationCode - rawData:", rawData);

  const response = await fetch(process.env.WW_SERVER_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.BEARER_CODE}`,
    },
    body: JSON.stringify(rawData),
  });

  const jsonResponse = await response.json();
  console.log("sendVerificationCode - response JSON:", jsonResponse);
  return jsonResponse;
};

export const POST = async (req: Request) => {
  console.log("POST - Request received");

  const { phoneNumber } = (await req.json()) as { phoneNumber: string };
  console.log("POST - phoneNumber:", phoneNumber);

  const code = generateRandomFourDigitsCode();
  console.log("POST - Generated code:", code);

  const searchablePhoneNumber = phoneNumber.substring(1, phoneNumber.length);
  console.log("POST - searchablePhoneNumber:", searchablePhoneNumber);

  let reserverId = "";
  const reserver = await getReserverDetails(searchablePhoneNumber);
  console.log("POST - Reserver details:", reserver);

  if (!reserver) {
    console.log("POST - Reserver not found. Creating new reserver.");
    const createReserverData = { phoneNumber: searchablePhoneNumber };
    console.log("POST - createReserverData:", createReserverData);

    const createReserverResponse = (await createReserver(
      createReserverData
    )) as Reserver;
    console.log("POST - createReserverResponse:", createReserverResponse);

    reserverId = createReserverResponse.idReserver;
  } else {
    console.log("POST - Reserver found. Using existing reserver ID.");
    reserverId = reserver.idReserver;
  }

  console.log("POST - reserverId:", reserverId);

  const sessionData = {
    sessionUser: reserverId,
    verificationCode: code.toString(),
  };
  console.log("POST - sessionData:", sessionData);

  const { idSession } = await createSession(sessionData);
  console.log("POST - Created session ID:", idSession);

  await sendVerificationCode(searchablePhoneNumber, code.toString());
  console.log("POST - Verification code sent.");

  return NextResponse.json({ idSession, success: true });
};

const generateRandomFourDigitsCode = () => {
  const min = 1000;
  const max = 9999;
  const code = Math.floor(Math.random() * (max - min + 1) + min);
  console.log("generateRandomFourDigitsCode - Generated code:", code);
  return code;
};

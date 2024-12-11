import { redirect } from "next/navigation";
import { getSession } from "../sessions/session-service";
import VerifyCode from "../components/VerifyCode";

type SearchParamsProps = {
  sessionId: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParamsProps>;
}) {
  const sessionId = (await searchParams).sessionId;
  const sessionData = await getSession(sessionId);
  if (!sessionData) {
    throw redirect("/login");
  }
  return (
    <div className="flex items-center flex-col gap-4">
      <h1 className="text-center font-bold text-xl">
        Te enviamos un código de 4 dígitos a +{sessionData.userPhoneNumber}
      </h1>
      <VerifyCode idSession={sessionId} />
    </div>
  );
}

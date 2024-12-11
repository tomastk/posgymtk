import LoginWithPhoneNumber from "../components/LoginWithPhoneNumber";

function Page() {
  return (
    <div className="m-auto py-6 max-w-[80%] text-xl">
      <h1 className="text-center font-bold text-2xl">
        Inicia Sesión con tu Número de Telefono
      </h1>
      <LoginWithPhoneNumber />
    </div>
  );
}

export default Page;

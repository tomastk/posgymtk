import Image from "next/image";
import ClassList from "./classes/ClassList";

export default function Home() {
  return (
    <div className="m-auto py-6 max-w-[80%] text-xl">
      <h1 className="text-center font-bold">
        Unite a las clases de gimnasio de Pos Gym
      </h1>
      <ClassList />
    </div>
  );
}

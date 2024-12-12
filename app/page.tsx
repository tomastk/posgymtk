import Image from "next/image";
import ClassList from "./classes/ClassList";
import { getClasses } from "./classes/classes-service";

export default async function Home() {
  const classes = await getClasses();

  return (
    <div className="m-auto py-6 max-w-[80%] text-xl">
      <h1 className="text-center font-bold">
        Unite a las clases de gimnasio de Pos Gym
      </h1>
      <ClassList classes={classes} noButton={false} />
    </div>
  );
}

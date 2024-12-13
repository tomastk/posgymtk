import ClassList from "./classes/ClassList";
import { getClasses } from "./classes/classes-service";
import DownloadClasses from "./components/DownloadClasses";

export const revalidate = 0;

export default async function Home() {
  const classes = await getClasses();

  return (
    <div className="m-auto py-6 max-w-[80%] text-xl items-center flex flex-col gap-4 ">
      <h1 className="text-center font-bold">
        Unite a las clases de gimnasio de Pos Gym
      </h1>
      <DownloadClasses classes={classes} />
      <ClassList classes={classes} noButton={false} />
    </div>
  );
}

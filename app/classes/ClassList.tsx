import ClassCard from "../components/ClassCard";
import { getClasses } from "./classes-service";

export type Class = {
  idClass: string;
  className: string;
  maxMembers: number;
  date: string;
  time: string;
  classGroup: string;
  classDescription: string;
};

async function ClassList() {
  const classes = (await getClasses()) as Class[];

  return (
    <section className="mt-4 flex gap-4 flex-wrap">
      {classes.map((cls) => (
        <ClassCard class={cls} key={cls.idClass} />
      ))}
    </section>
  );
}

export default ClassList;

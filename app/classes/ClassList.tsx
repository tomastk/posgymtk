import ClassCard from "../components/ClassCard";
import { getClasses } from "./classes-service";

export type Class = {
  idClass: string;
  className: string;
  maxMembers: number;
  date: string;
  time: string;
  classGroup: string;
  reservers: string;
  reserverParsed: string[];
  classDescription: string;
};

async function ClassList({
  classes,
  noButton,
}: {
  classes: Class[];
  noButton: boolean;
}) {
  return (
    <section className="mt-4 flex gap-4 flex-wrap">
      {classes.map((cls) => (
        <ClassCard class={cls} key={cls.idClass} noButton={noButton} />
      ))}
    </section>
  );
}

export default ClassList;

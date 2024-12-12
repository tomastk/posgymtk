"use client";

import { useEffect, useState } from "react";
import ClassCard from "../components/ClassCard";
import { getClasses } from "./classes-service";
import { format, parse } from "@formkit/tempo";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";

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

function ClassList({
  classes,
  noButton,
}: {
  classes: Class[];
  noButton: boolean;
}) {
  const mappedDates = classes.map((classe) => new Date(classe.date));
  const [classState, setClassState] = useState(classes);
  const [date, setDate] = useState<Date | undefined>(mappedDates[0]);

  useEffect(() => {
    if (date === undefined) return setClassState(classes);
    const filteredClasses = classes.filter((clase) => {
      const classDate = new Date(clase.date);
      return format(date, "DD-MM-YYYY") === format(classDate, "DD-MM-YYYY");
    });
    setClassState(filteredClasses);
  }, [date]);

  return (
    <>
      <Calendar
        mode="single"
        locale={es}
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      <section className="mt-4 flex gap-4 flex-wrap">
        {classState.map((cls) => (
          <ClassCard class={cls} key={cls.idClass} noButton={noButton} />
        ))}
      </section>
    </>
  );
}

export default ClassList;

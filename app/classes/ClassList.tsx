"use client";

import { useEffect, useState } from "react";
import ClassCard from "../components/ClassCard";
import { format } from "@formkit/tempo";
import { es } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";

export type Class = {
  idClass: string;
  className: string;
  maxMembers: number;
  date: string;
  time: string;
  classGroup: string;
  reservers: string;
  reserverParsed: string[];
  hasAvailableSpace: string;
  classDescription: string;
};

function ClassList({
  classes,
  noButton,
}: {
  classes: Class[];
  noButton: boolean;
}) {
  const [classState, setClassState] = useState(classes);
  const [searchedValue, setSearchedValue] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (!date && !searchedValue) {
      setClassState(classes);
      return;
    }

    const filteredClasses = classes.filter((clase) => {
      const classDate = new Date(clase.date);

      const isSameDate =
        date && format(date, "DD-MM-YYYY") === format(classDate, "DD-MM-YYYY");

      const matchesSearch =
        searchedValue &&
        (clase.className.toLowerCase().includes(searchedValue.toLowerCase()) ||
          clase.classDescription
            .toLowerCase()
            .includes(searchedValue.toLowerCase()));

      // Check both conditions
      return (!date || isSameDate) && (!searchedValue || matchesSearch);
    });

    setClassState(filteredClasses);
  }, [date, searchedValue, classes]);

  return (
    <>
      <Calendar
        mode="single"
        locale={es}
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
      <Input
        className="w-[30%]"
        placeholder="Buscar..."
        value={searchedValue}
        onChange={(e) => setSearchedValue(e.target.value)}
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

"use client";

import { type Class } from "../classes/ClassList";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function ClassCard(props: { class: Class }) {
  const { class: cls } = props;

  console.log(cls);

  return (
    <Card className="w-[100%] md:w-[30%] ">
      <CardHeader>
        <CardTitle>{cls.className}</CardTitle>
        <CardDescription>
          {cls.date} - {cls.time}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-md h-40">{cls.classDescription}</CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`join/class/${cls.idClass}`}>Unirme</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ClassCard;

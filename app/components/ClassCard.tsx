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
import { Badge } from "@/components/ui/badge";
import CancelReserve from "./CancelReserve";

function ClassCard(props: { class: Class; noButton: boolean | null }) {
  const { class: cls, noButton } = props;

  return (
    <Card className="w-[100%] md:w-[30%] min-w-[300px] ">
      <CardHeader className="flex flex-col gap-4">
        <CardTitle>{cls.className}</CardTitle>
        <CardDescription>
          {cls.date} - {cls.time}
        </CardDescription>
        <Badge className="py-2 px-2 w-[fit-content] bg-red-200 text-black hover:bg-red-400 hover:scale-[1.1] transition-all">
          <Link href={`category/${cls.classGroup.toLowerCase()}`}>
            {cls.classGroup}
          </Link>
        </Badge>
      </CardHeader>
      <CardContent className="text-md h-fit">
        {cls.classDescription}
      </CardContent>
      <CardFooter>
        {noButton ? (
          <CancelReserve idClass={cls.idClass} />
        ) : (
          <Button asChild>
            <Link href={`join/class/${cls.idClass}`}>Unirme</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default ClassCard;

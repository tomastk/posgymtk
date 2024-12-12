"use client";

import { Download } from "lucide-react";
import { Class } from "../classes/ClassList";
import { Button } from "@/components/ui/button";

function parseFromJSONToCsv(classes: Class[], p0: { type: string }) {
  const startLine =
    "idClass,className,maxMembers,date,time,classGroup,reservers,reserverParsed,classDescription\n";

  return (
    startLine +
    classes
      .map((clase) => {
        return `${clase.idClass},${clase.className},${clase.maxMembers},${clase.date},${clase.time},${clase.classGroup},${clase.reservers},${clase.reserverParsed},${clase.classDescription}\n`;
      })
      .join("")
  );
}

function DownloadClasses({ classes }: { classes: Class[] }) {
  const downloadClases = () => {
    const confirm = window.confirm("¿Seguro que deseas descargar las clases?");
    if (!confirm) return;

    const csvData = parseFromJSONToCsv(classes, { type: "text/csv" });

    const blob = new Blob([csvData], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    link.download = "classes.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Button onClick={downloadClases} className="self-center">
      Descargar <Download />
    </Button>
  );
}

export default DownloadClasses;

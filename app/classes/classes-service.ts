import { loadTableData } from "../appsheet/appsheet-service";
import { Class } from "./ClassList";

export const getClasses = async (): Promise<Class[]> => {
  const clases = (await loadTableData("Classes")) as Class[];
  return clases.map((clase) => {
    return {
      ...clase,
      reserverParsed: clase.reservers
        .split(",")
        .map((reserver) => reserver.trim()),
    };
  });
};

export const findClassById = async (idClass: string) => {
  const classes = (await getClasses()) as Class[];
  return classes.find((clase) => clase.idClass === idClass);
};

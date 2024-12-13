import {
  addRow,
  loadTableData,
  updateTableRow,
} from "../appsheet/appsheet-service";
import { getClasses } from "../classes/classes-service";

type ReserveData = {
  idClass: string;
  idReserver: string;
  classTime: string;
  reserveActive: "Y" | "N";
  classDate: string;
};

export const createReserve = async (reserveData: Partial<ReserveData>) => {
  await addRow("ClassesReserves", reserveData);
};

export const cancelReserve = async (reserveData: ReserveData) => {
  const updatedRow = await updateTableRow("ClassesReserves", {
    ...reserveData,
    idClassReserve: reserveData.idClass + reserveData.idReserver,
    reserveActive: false,
  });
  return updatedRow;
};

export const getUserReserves = async (userId: string) => {
  const classes = await getClasses();
  return classes.filter((clase) => clase.reserverParsed.includes(userId));
};

export const getRawUserReserves = async (
  userId: string
): Promise<ReserveData[]> => {
  const allReserves = await loadTableData("ClassesReserves");
  return allReserves.filter(
    (reserve: ReserveData) =>
      reserve.idReserver === userId && reserve.reserveActive === "Y"
  );
};

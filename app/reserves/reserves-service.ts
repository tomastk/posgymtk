import { addRow, updateTableRow } from "../appsheet/appsheet-service";
import { getClasses } from "../classes/classes-service";

type ReserveData = {
  idClass: string;
  idReserver: string;
};

export const createReserve = async (reserveData: ReserveData) => {
  const addedReserve = await addRow("ClassesReserves", reserveData);
  console.log(addedReserve);
};

export const cancelReserve = async (reserveData: ReserveData) => {
  const updatedRow = await updateTableRow("ClassesReserves", {
    ...reserveData,
    idClassReserve: reserveData.idClass + reserveData.idReserver,
    reserveActive: false,
  });
  console.log(updatedRow);
  return updatedRow;
};

export const getUserReserves = async (userId: string) => {
  const classes = await getClasses();
  return classes.filter((clase) => clase.reserverParsed.includes(userId));
};

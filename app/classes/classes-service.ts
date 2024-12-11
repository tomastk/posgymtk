import { loadTableData } from "../appsheet/appsheet-service";

export const getClasses = async () => {
  const clases = await loadTableData("Classes");
  return clases;
};

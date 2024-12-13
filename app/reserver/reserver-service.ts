/* eslint-disable @typescript-eslint/no-empty-object-type */

import { addRow, loadTableData } from "../appsheet/appsheet-service";

export type Reserver = {
  idReserver: string;
  phoneNumber: string;
  name: string;
  email: string;
};

export type CreateReserverData = {
  phoneNumber: string;
};

export type UpdateReserverData = {};

export const getReserverDetails = async (phoneNumber: string) => {
  const allReservers = (await loadTableData("Reservers")) as Reserver[];
  return allReservers.find((reserver) => reserver.phoneNumber === phoneNumber);
};

export const createReserver = async (
  createReserverData: CreateReserverData
) => {
  const response = await addRow("Reservers", createReserverData);
  return response.Rows[0];
};

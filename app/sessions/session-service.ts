import { addRow, loadTableData } from "../appsheet/appsheet-service";

export type SessionCreationData = {
  sessionUser: string;
  verificationCode: string;
};

export type CreatedSession = SessionCreationData & {
  idSession: string;
  sessionUserName: string;
  sessionUserEmail: string;
  userPhoneNumber: string;
};

export const createSession = async (
  data: SessionCreationData
): Promise<CreatedSession> => {
  try {
    const sessions = await addRow("Sessions", data);
    return sessions.Rows[0];
  } catch (error) {
    throw error;
  }
};

export const getSession = async (
  idSession: string
): Promise<CreatedSession | undefined> => {
  const sessions = (await loadTableData("Sessions")) as CreatedSession[];
  return sessions.find((session) => session.idSession === idSession);
};

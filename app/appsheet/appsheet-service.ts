export const getApiKey = () => {
  return process.env.APPSHEET_API_KEY;
};

export const getAppId = () => {
  return process.env.APPSHEET_APP_ID;
};

export const loadTableData = async (tableName: string): Promise<any> => {
  const url = `https:/www.appsheet.com/api/v2/apps/${getAppId()}/tables/${tableName}/Action?applicationAccessKey=${getApiKey()}`;

  const body = {
    Action: "Find",
    Properties: {
      Locale: "en-US",
      Location: "47.623098, -122.330184",
      Timezone: "Pacific Standard Time",
    },
    Rows: [],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 0,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const addRow = async (tableName: string, data: any): Promise<any> => {
  const url = `https:/www.appsheet.com/api/v2/apps/${getAppId()}/tables/${tableName}/Action?applicationAccessKey=${getApiKey()}`;
  const body = {
    Action: "Add",
    Properties: {
      Locale: "en-US",
      Location: "47.623098, -122.330184",
      Timezone: "Pacific Standard Time",
    },
    Rows: [data],
  };
  try {
    const fetchResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const response = await fetchResponse.json();
    return response;
  } catch (error) {
    console.error("Error adding row:", error);
    throw error;
  }
};

export const updateTableRow = async (tableName: string, data: any) => {
  const url = `https:/www.appsheet.com/api/v2/apps/${getAppId()}/tables/${tableName}/Action?applicationAccessKey=${getApiKey()}`;
  const body = {
    Action: "Edit",
    Properties: {
      Locale: "en-US",
      Location: "47.623098, -122.330184",
      Timezone: "Pacific Standard Time",
    },
    Rows: [data],
  };

  console.log("Fetching with data", JSON.stringify(body));

  const fetchResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const response = await fetchResponse.json();
  return response;
};

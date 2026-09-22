import axios from "axios";

// CREATE A HOMEOWNER REQUEST
export const createHomeOwnerRequest = async (
  body: any,
  token: string
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/homeowners`,
      body,
      {
        headers: {
          Accept: "application/vnd.connect.v1+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    if (!data) return;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// CREATE DOCUMENT REQUEST
export const uploadDocumentsRequest = async (
  payload: any,
  token: string,
  homeownerId: string
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/homeowners/${homeownerId}/documents`,
      payload,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    if (!data) return;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// DELETE HOMEOWNER REQUEST
export const DeleteHomeOwnerRequest = async (userId: string, token: string) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASEURL}/accounts/user/${userId}`,
      {
        maxBodyLength: Infinity,
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

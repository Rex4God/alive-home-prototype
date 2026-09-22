import axios from "axios";

// CREATE A REALTOR REQUEST
export const createRealtorRequest = async (body: any, token: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/realtors`,
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

// CREATE REALTOR DOCUMENT REQUEST
export const uploadDocumentsRequest = async (
  payload: any,
  token: string,
  homeownerId: string
) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/realtors/${homeownerId}/documents`,
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

// DELETE REALTOR REQUEST
export const DeleteRealtorRequest = async (userId: string, token: string) => {
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

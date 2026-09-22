import axios from "axios";

// CREATE A BUYERS REQUEST
export const createBuyerRequest = async (body: any, token: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/buyers`,
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

// GET(READ) A BUYER REQUEST
export const getBuyerRequest = async (token: string, buyerId: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/buyers/${buyerId}`,
      {
        maxBodyLength: Infinity,
        headers: {
          Accept: "application/vnd.connect.v1+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.data;
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch jobs.");
  }
};

// UPDATE A BUYER REQUEST
export const updateBuyerRequest = async (
  buyerId: string,
  token: string,
  body: any
) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/buyers/${buyerId}`,
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
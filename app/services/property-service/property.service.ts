import axios from "axios";
interface PropertySearchParams {
  q?: string;
  propertyType?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
}

// CREATE A PROPERTY REQUEST
export const createPropertyRequest = async (payload: any, token: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/properties/create`,
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

//GET PROPERTIES REQUEST
export const getPropertiesRequest = async (
  token: string,
  params: PropertySearchParams = {}
) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/api/v1/properties/`,
      {
        params,
        maxBodyLength: Infinity,
        headers: {
          Accept: "application/vnd.connect.v1+json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Error fetching properties:", error.message || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch properties."
    );
  }
};

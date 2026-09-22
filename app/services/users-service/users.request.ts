import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import axios from "axios";

// GET(READ) ALL USERS REQUEST
export const GetUsersRequest = async (
  token: string,
  pageNumber = 1,
  limit: number,
  search: string
) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASEURL}/api/users`,
    {
      maxBodyLength: Infinity,
      params: { pageNumber, limit, search },
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.data;
  return data;
};

// GET FREELANCER PROFILE REQUEST
export const useUserProfile = (token: string, userId: string) => {
  return useQuery({
    queryKey: ["freelancerProfile"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/freelancer/api/freelancer/getUserProfileById/${userId}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error: any) {
        throw error;
      }
    },
    enabled: !!token,
  });
};

// UPDATE USER PROFILE
export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ token, payload }: { token: string; payload: any }) => {
      try {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_BASEURL}/accounts/user/`,
          payload,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Profile Updated Successfully", {
        style: {
          background: "#22c55e",
          color: "white",
        },
      });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
    onError: (error: any) => {
      // handleApiError(error);
      if (error.response?.status === 500) {
        toast.error("Internal Server Error", {
          style: {
            background: "#ef4444",
            color: "white",
          },
        });
      } else {
        toast.error(
          error.response?.data?.message || "Failed to update profile",
          {
            style: {
              background: "#ef4444",
              color: "white",
            },
          }
        );
      }
    },
  });
};

// DELETE USER REQUEST
export const DeleteUserRequest = async (userId: string, token: string) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASEURL}/accounts/user//${userId}`,
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

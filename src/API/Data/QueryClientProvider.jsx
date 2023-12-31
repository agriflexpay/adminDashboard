import { useAuth } from "../../AUTH/AuthContext";
export const fetchUsers = async (axiosInstance) => {
  try {
      const response = await axiosInstance.get("/api/user/fetchAll")
      return response
  } catch (error) {
      console.log(error);
  }
}
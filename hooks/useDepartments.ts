import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosBaseUrl";
import { IDepartment } from "@/lib/IDepartment";



export function useDepartments() {
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Function to fetch all departments
  const getAllDepartments = async () => {
    // Get the Bearer token from local storage
    const token = localStorage.getItem("userToken");
    if (!token) {
      setError("Authorization token not found");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get("/department", {
        headers: {
          Authorization: `Bearer ${token}`, // Add the Authorization header
        },
      });
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
      setError("Failed to fetch departments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDepartments();
  }, []);

  return { departments,setDepartments , error, loading };
}

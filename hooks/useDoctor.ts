import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosBaseUrl"; // Adjust the import according to your file structure
import { IDoctor } from "@/lib/IDoctor"; // Import the IDoctor interface

export function useDoctors() {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Function to fetch all doctors
  const getAllDoctors = async () => {
    const token = localStorage.getItem("userToken"); // Change 'authToken' to your actual key
    if (!token) {
      setError("Authorization token not found");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get("/doctor", {
        headers: {
          Authorization: `Bearer ${token}`, // Add the Authorization header
        },
      });
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setError("Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  return { doctors, setDoctors, error, loading };
}

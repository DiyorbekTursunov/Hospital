import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosBaseUrl";
import { ISpec } from "@/lib/ISpec";


export function useSpec() {
  const [specs, setSpecs] = useState<ISpec[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Function to fetch all rooms
  const getAllSpecs = async () => {
    // Get the Bearer token from local storage
    const token = localStorage.getItem("userToken"); // Change 'authToken' to your actual key
    if (!token) {
      setError("Authorization token not found");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get("/spec", {
        headers: {
          Authorization: `Bearer ${token}`, // Add the Authorization header
        },
      });
      setSpecs(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setError("Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
        getAllSpecs();
  }, []);

  return { specs, setSpecs, error, loading };
}

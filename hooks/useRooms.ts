import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosBaseUrl";
import { IRoom } from "@/lib/IRoom";


export function useRooms() {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Function to fetch all rooms
  const getAllRooms = async () => {
    // Get the Bearer token from local storage
    const token = localStorage.getItem("userToken"); // Change 'authToken' to your actual key
    if (!token) {
      setError("Authorization token not found");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get("/room", {
        headers: {
          Authorization: `Bearer ${token}`, // Add the Authorization header
        },
      });
      setRooms(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setError("Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  return { rooms, setRooms, error, loading };
}

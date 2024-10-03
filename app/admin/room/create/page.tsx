"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/lib/axiosBaseUrl"; // Ensure axiosBaseUrl is configured
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDepartments } from "@/hooks/useDepartments";

export default function CreateRoom() {
  const [maxcount, setMaxcount] = useState<string>(""); // State for department title
  const [number, setNumber] = useState<string>(""); // State for department title
  const [departmentsSelected, setDepartmentsSelected] = useState<string>(""); // State for department title
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const { departments, setDepartments, error } = useDepartments();

  async function handleCreateDepartment(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null); // Reset any previous errors

    try {
      // Get the token from localStorage
      const token = localStorage.getItem("userToken");

      if (!token) {
        setErrorMessage("Authentication token is missing.");
        setLoading(false);
        return;
      }

      // Make the POST request to create the department
      const response = await axiosInstance.post(
        "/room",
        { department: departmentsSelected, number, maxcount },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      console.log(response.data); // Handle success response
      // Redirect or display success message if necessary
      router.push("/admin"); // Example: Redirect on success
      toast("Room successfuly created");
    } catch (error) {
      setErrorMessage("Failed to create room. Please try again.");
      console.error("Error:", error); // Log error for debugging
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="h-screen flex items-center">
      <Card className="mx-auto w-[384px]">
        <CardHeader>
          <CardTitle className="text-xl">Create Room</CardTitle>
          <CardDescription>Enter the room credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateDepartment} className="grid gap-4">
            <div className="grid gap-2">
              <Select onValueChange={(e) => setDepartmentsSelected(e)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Departments</SelectLabel>
                    {departments.map(department => (
                        <SelectItem value={department._id} key={department._id}>{department.title}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="title">Room Number</Label>
              <Input
                id="Room_number"
                placeholder="400"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="title">Room Maxcount</Label>
              <Input
                id="title"
                placeholder="5"
                value={maxcount}
                onChange={(e) => setMaxcount(e.target.value)}
                required
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Room"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

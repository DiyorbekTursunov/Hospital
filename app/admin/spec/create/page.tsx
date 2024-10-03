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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/lib/axiosBaseUrl"; // Ensure axiosBaseUrl is configured
import { useRouter } from "next/navigation";
import { toast } from "sonner"


export default function CreateSpec() {
  const [title, setTitle] = useState<string>(""); // State for department title
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

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
        "/spec",
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      console.log(response.data); // Handle success response
      // Redirect or display success message if necessary
      router.push("/admin"); // Example: Redirect on success
      toast("Spec successfuly created")

    } catch (error) {
      setErrorMessage("Failed to create Spec. Please try again.");
      console.error("Error:", error); // Log error for debugging
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex items-center">
      <Card className="mx-auto w-[384px]">
        <CardHeader>
          <CardTitle className="text-xl">Create Spec</CardTitle>
          <CardDescription>Enter the spec credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateDepartment} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Spec Title</Label>
              <Input
                id="title"
                placeholder="Travmotolog"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm text-center">
                {errorMessage}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Spec"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

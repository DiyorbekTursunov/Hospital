import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import axiosInstance from "@/lib/axiosBaseUrl";
import { toast } from "sonner";
import { IDoctor } from "@/lib/IDoctor"; // Import the IDoctor interface

interface DoctorProps {
  _id: string;
  name: string; // Assuming 'name' is a property of the doctor
  setDoctors: React.Dispatch<React.SetStateAction<IDoctor[]>>; // Update type to match your state
}

export function DialogDeleteAlertDoctor({
  _id,
  name,
  setDoctors,
}: DoctorProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [doctorModalIsOpen, setDoctorModalIsOpen] = useState<boolean>(false);

  async function handleDeleteDoctor(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null); // Reset any previous errors

    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setErrorMessage("Authentication token is missing.");
        return;
      }

      const response = await axiosInstance.delete(
        `/doctor/${_id}`, // Correct endpoint to delete the doctor
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      console.log(response.data); // Handle success response
      toast.success("Doctor successfully deleted"); // Update success message

      setDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor._id !== _id)
      );

      setDoctorModalIsOpen(false); // Close the modal on success
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "Failed to delete doctor. Please try again."
      );
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={doctorModalIsOpen} onOpenChange={setDoctorModalIsOpen}>
      <DialogTrigger asChild>
        <div
          className="relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-slate-100 cursor-pointer"
          data-orientation="vertical"
        >
          Delete
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="px-1 pt-5">
          <DialogTitle>
            Do you want to delete Doctor &quot;{name}&quot;?
          </DialogTitle>
          <DialogDescription>
            Confirm if you want to delete this doctor.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleDeleteDoctor}>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Deleting..." : "Delete Doctor"}
            </Button>
          </DialogFooter>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        </form>
      </DialogContent>
    </Dialog>
  );
}

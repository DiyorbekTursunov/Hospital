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
import { DropdownMenuCheckboxItem } from "@radix-ui/react-dropdown-menu";
import { IRoom } from "@/lib/IRoom";



interface DepartmentProps {
  _id: string;
  number: string;
  setRoom: React.Dispatch<React.SetStateAction<IRoom[]>>;
}

export function DialogDeleteAlertRoom({
  _id,
  number,
  setRoom,
}: DepartmentProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [departmentsModalIsOpen, setDepartmentsModalIsOpen] =
    useState<boolean>(false);

  async function handleDeleteDepartment(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null); // Reset any previous errors

    try {
      // Get the token from localStorage
      const token = localStorage.getItem("userToken");

      if (!token) {
        setErrorMessage("Authentication token is missing.");
        return;
      }

      // Make the DELETE request to delete the department
      const response = await axiosInstance.delete(
        `/room/${_id}`, // Correct endpoint to delete the department
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      console.log(response.data); // Handle success response
      toast("Department successfully deleted"); // Update success message

      // Immediately update the department in the local state
      setRoom((prevRooms) =>
        prevRooms.filter((room) => room._id !== _id)
      );

      setDepartmentsModalIsOpen(false); // Close the modal on success
    } catch (error: any) {
      // Handle specific error messages if available
      setErrorMessage(
        error.response?.data?.message ||
          "Failed to delete department. Please try again."
      );
      console.error("Error:", error); // Log error for debugging
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={departmentsModalIsOpen}
      onOpenChange={(open) => setDepartmentsModalIsOpen(open)}
    >
      <DialogTrigger asChild>
        <div
          className="relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-slate-100 cursor-pointer"
          data-orientation="vertical"
        >
          Delete
        </div>
      </DialogTrigger>
      <form>
        {" "}
        {/* Use onSubmit to handle form submission */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="px-1 pt-5">
            <DialogTitle>
              Do you want to delete Room &quot;{number}&quot;?
            </DialogTitle>
            <DialogDescription>
              Confirm if you want to delete your department.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              onClick={handleDeleteDepartment}
            >
              <DropdownMenuCheckboxItem className="border-none">
                {loading ? "Deleting..." : "Delete Room"}{" "}
                {/* Change button text based on loading state */}
              </DropdownMenuCheckboxItem>
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}{" "}
      {/* Display error message if exists */}
    </Dialog>
  );
}

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/lib/axiosBaseUrl";
import { IRoom } from "@/lib/IRoom";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


interface RoomProps {
  _id: string;
  maxcount: string;
  number: string,
  setNumber: React.Dispatch<React.SetStateAction<string>>;
  department: string; // Pass the departments array as prop
}

export function DialogEditRoom({
  _id,
  maxcount,
  number,
  setNumber,
  department, // Destructure the departments prop
}: RoomProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [DepartmenstModalIsOpen, setDepartmenstModalIsOpen] = useState<boolean>(false);
  const router = useRouter();

  async function handleEditDepartment(e: React.FormEvent) {
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

      // Make the PUT request to update the department
      const response = await axiosInstance.put(
        "/department", // Endpoint to update the department
        {
          _id, // Include the department ID
          title: newTitle, // Include the new title
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      console.log(response.data); // Handle success response
      toast("Department successfully updated"); // Update success message

      // Immediately update the department in the local state
//       setRooms((prevRooms) =>
//         prevRooms.map((room) =>
//           room._id === _id ? { ...room, title:  } : room
//         )
//       );

      setDepartmenstModalIsOpen(false); // Close the modal on success
    } catch (error) {
      setErrorMessage("Failed to update department. Please try again.");
      console.error("Error:", error); // Log error for debugging
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={DepartmenstModalIsOpen}
      onOpenChange={() => setDepartmenstModalIsOpen(!DepartmenstModalIsOpen)}
    >
      <DialogTrigger asChild>
        <div
          className="relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-slate-100 cursor-pointer"
          data-orientation="vertical"
        >
          Edit
        </div>
      </DialogTrigger>
      <form> {/* Use onSubmit to handle form submission */}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
            <DialogDescription>
              Make changes to your department here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-y-3">
              <Label htmlFor="name">Department Title</Label>
              <Input
                id="name"
                value={number} // Use value instead of defaultValue
                onChange={(e) => setNumber(e.target.value)}
                className="col-span-3"
              />
              {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error message */}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading} onClick={handleEditDepartment}>
              {loading ? "Saving..." : "Save changes"} {/* Change button text based on loading state */}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

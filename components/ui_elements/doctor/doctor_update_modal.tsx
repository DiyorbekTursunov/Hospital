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
import { useState } from "react";
import axiosInstance from "@/lib/axiosBaseUrl";
import { toast } from "sonner";

interface DoctorProps {
  _id: string;
  name: string;
  phone: string;
  spec: string;
  birthday: string;
  setDoctors: React.Dispatch<React.SetStateAction<any[]>>; // Adjust the type as necessary
}

export function DialogEditDoctor({
  _id,
  name,
  phone,
  spec,
  birthday,
  setDoctors,
}: DoctorProps) {
  const [newName, setNewName] = useState(name);
  const [newPhone, setNewPhone] = useState(phone);
  const [newSpec, setNewSpec] = useState(spec);
  const [newBirthday, setNewBirthday] = useState(birthday);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  async function handleEditDoctor(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    // Validation
    if (!newName.trim()) {
      setErrorMessage("Name is required.");
      setLoading(false);
      return;
    }

    if (!newPhone.trim()) {
      setErrorMessage("Phone number is required.");
      setLoading(false);
      return;
    }

    if (!newSpec.trim()) {
      setErrorMessage("Specialization is required.");
      setLoading(false);
      return;
    }

    if (!newBirthday.trim()) {
      setErrorMessage("Birthday is required.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setErrorMessage("Authentication token is missing.");
        setLoading(false);
        return;
      }

      try {
        await axiosInstance.put(
          "/doctor",
          {
            _id,
            name: newName,
            phone: newPhone,
            spec: newSpec,
            birthday: newBirthday,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Success logic
      } catch (error: any) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        setErrorMessage("Failed to update doctor. Please try again.");
      }

      toast.success("Doctor successfully updated");
      setIsModalOpen(false);

      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor) =>
          doctor._id === _id
            ? {
                ...doctor,
                name: newName,
                phone: newPhone,
                spec: newSpec,
                birthday: newBirthday,
              }
            : doctor
        )
      );
    } catch (error) {
      setErrorMessage("Failed to update doctor. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={() => setIsModalOpen(!isModalOpen)}
    >
      <DialogTrigger asChild>
        <div className="relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-transparent focus:text-accent-foreground hover:bg-transparent cursor-pointer">
          Edit Doctor
        </div>
      </DialogTrigger>

      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Doctor</DialogTitle>
            <DialogDescription>
              Make changes to your doctor's information here. Click save when
              you're done.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {errorMessage && (
              <div className="text-red-600 text-sm">{errorMessage}</div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Falonchiyev Falonchi Falonchevich"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="+998 (99) 123-45-67"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="spec">Specialization</Label>
              <Input
                id="spec"
                placeholder="Specialization ID"
                value={newSpec}
                onChange={(e) => setNewSpec(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="birthday">Birthday</Label>
              <Input
                id="birthday"
                type="date"
                value={newBirthday}
                onChange={(e) => setNewBirthday(e.target.value)}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading} onClick={handleEditDoctor}>
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

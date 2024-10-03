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
import { useSpec } from "@/hooks/useSpec"; // Import the useSpec hook

export default function CreateDoctor() {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [departmentsSelected, setDepartmentsSelected] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [education, setEducation] = useState<string>("");
  const [family, setFamily] = useState<number>(3);
  const [familyphone, setFamilyPhone] = useState<string>("");
  const [worktime, setWorkTime] = useState<number>(3);
  const [gender, setGender] = useState<number>(1);
  const [birthday, setBirthday] = useState<string>("1999-09-12");
  const [specSelected, setSpecSelected] = useState<string>(""); // State for selected specialization

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const { departments } = useDepartments();
  const { specs, loading: specsLoading, error: specsError } = useSpec(); // Use the specs hook

  async function handleCreateDoctor(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null); // Reset any previous errors

    try {
      const token = localStorage.getItem("userToken");

      if (!token) {
        setErrorMessage("Authentication token is missing.");
        setLoading(false);
        return;
      }

      const response = await axiosInstance.post(
        "/doctor", // Assuming you're sending the data to a doctor endpoint
        {
          name,
          phone,
          spec: specSelected, // Send the selected specialization
          department: departmentsSelected,
          avatar,
          region,
          district,
          education,
          family,
          familyphone,
          worktime,
          gender,
          birthday,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      console.log(response.data); // Handle success response
      router.push("/admin"); // Example: Redirect on success
      toast("Doctor successfully created");
    } catch (error) {
      setErrorMessage("Failed to create doctor. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-6xl">
        <CardHeader>
          <CardTitle className="text-xl">Create Doctor</CardTitle>
          <CardDescription>Enter the Doctor credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateDoctor} className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Falonchiyev Falonchi Falonchevich"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="+998 (99) 123-45-67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="spec">Specialization</Label>
                {specsLoading ? (
                  <Input className="w-full" placeholder="Loading..." disabled />
                ) : (
                  <Select onValueChange={setSpecSelected} defaultValue={specSelected}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Specializations</SelectLabel>
                        {specs.map((spec) => (
                          <SelectItem value={spec._id} key={spec._id}>
                            {spec.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
                {specsError && (
                  <p className="text-red-500 text-sm">{specsError}</p>
                )}
              </div>

              <div>
                <Label htmlFor="department">Department</Label>
                <Select onValueChange={setDepartmentsSelected} defaultValue={departmentsSelected}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Departments</SelectLabel>
                      {departments.map((department) => (
                        <SelectItem value={department._id} key={department._id}>
                          {department.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="avatar">Avatar</Label>
                <Input
                  id="avatar"
                  placeholder="Avatar URL"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="gender">Gender</Label>
                <Select onValueChange={(e) => setGender(parseInt(e))} defaultValue={gender.toString()}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="1">Male</SelectItem>
                      <SelectItem value="2">Female</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="region">Region</Label>
                <Input
                  id="region"
                  placeholder="Region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  placeholder="District"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="education">Education</Label>
                <Input
                  id="education"
                  placeholder="Education"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="family">Family Size</Label>
                <Input
                  id="family"
                  placeholder="3"
                  value={family}
                  onChange={(e) => setFamily(parseInt(e.target.value))}
                  type="number"
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="familyphone">Family Phone</Label>
                <Input
                  id="familyphone"
                  placeholder="Family Phone"
                  value={familyphone}
                  onChange={(e) => setFamilyPhone(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="worktime">Work Time</Label>
                <Input
                  id="worktime"
                  placeholder="3"
                  value={worktime}
                  onChange={(e) => setWorkTime(parseInt(e.target.value))}
                  type="number"
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="birthday">Birthday</Label>
                <Input
                  id="birthday"
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Doctor"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useState } from "react"; // Import useState
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import { useDoctors } from "@/hooks/useDoctor"; // Adjusted to use useDoctors
import { DialogEditDoctor } from "./doctor_update_modal";
import { DialogDeleteAlertDoctor } from "./DoctorDeleteAlert";


export default function DoctorTab() {
  const { doctors, setDoctors, error, loading } = useDoctors();

  return (
    <>
      <TabsContent value="doctor">
        <Card>
          <CardHeader>
            <CardTitle>Doctors</CardTitle>
            <CardDescription>
              Manage your doctors and view their details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Specialization
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Department
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Region</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created at
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Id</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : (
                  doctors.map((doctor) => (
                    <TableRow key={doctor._id}>
                      <TableCell className="font-medium">
                        {doctor.name}
                      </TableCell>
                      <TableCell className="font-medium">
                        {doctor.phone}
                      </TableCell>
                      <TableCell className="font-medium">
                        {doctor.spec}
                      </TableCell>
                      <TableCell className="font-medium">
                        {doctor.department}
                      </TableCell>
                      <TableCell className="font-medium">
                        {doctor.region}
                      </TableCell>
                      <TableCell className="font-medium">
                        {new Date(doctor.createdAt).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true,
                        })}
                      </TableCell>
                      <TableCell className="font-medium">
                        {doctor._id.slice(0, 6)}...
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-haspopup="true"
                              size="icon"
                              variant="ghost"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <DialogEditDoctor
                              _id={doctor._id}
                              name={doctor.name}
                              phone={doctor.phone}
                              spec={doctor.spec}
                              birthday={doctor.birthday}
                              setDoctors={setDoctors}
                            />

                            <DialogDeleteAlertDoctor
                              _id={doctor._id}
                              name={doctor.name} // Pass doctor name for confirmation
                              setDoctors={setDoctors}
                            />
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
                {error && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-red-500 text-center">
                      {error}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <span>{doctors.length} doctors</span>
          </CardFooter>
        </Card>
      </TabsContent>
    </>
  );
}

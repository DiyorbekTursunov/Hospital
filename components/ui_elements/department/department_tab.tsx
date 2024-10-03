"use client";

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
import { DialogEditDepartment } from "@/components/ui_elements/department/department_update_modal";
import { IDepartment } from "@/lib/Idepartment";
import axiosInstance from "@/lib/axiosBaseUrl";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DialogDeleteAlert } from "./DepartmentDeleteAlert";
import { useDepartments } from "@/hooks/useDepartments";

export default function DepartmentTab({}) {
  const { departments,setDepartments , error, loading } = useDepartments();

  return (
    <TabsContent value="department">
      <Card>
        <CardHeader>
          <CardTitle>Department</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead className="hidden md:table-cell">
                  Total Sales
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
                <TableHead className="hidden md:table-cell">User id</TableHead>
                <TableHead className="hidden md:table-cell">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                departments.map((department, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {department.title}
                    </TableCell>
                    <TableCell className="font-medium">
                      {department.status}
                    </TableCell>
                    <TableCell className="font-medium">
                      {department._id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {department.boss === null && "null"}
                    </TableCell>
                    <TableCell className="font-medium">
                      {new Date(department.createdTime).toLocaleString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                          hour12: true,
                        }
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {department.userId}
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
                          <DialogEditDepartment
                            _id={department._id}
                            title={department.title}
                            setDepartments={setDepartments}
                            departments={departments}
                          />
                          <DialogDeleteAlert
                            _id={department._id}
                            title={department.title}
                            setDepartments={setDepartments}
                            departments={departments}
                          />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
              {error && (
                <TableRow>
                  <TableCell colSpan={6} className="text-red-500 text-center">
                    {error}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span>{departments.length} departments</span>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}

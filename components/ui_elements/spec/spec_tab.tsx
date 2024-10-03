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
import { useSpec } from "@/hooks/useSpec";
import { DialogEditSpec } from "./spec_update_modal";
import { DialogDeleteAlertSpec } from "./SpecDeleteAlert";
// import { DialogEditRoom } from "./room_update_modal";
// import { DialogDeleteAlertRoom } from "./RoomDeleteAlert";

export default function SpecTab({}) {
  const { specs, setSpecs, error, loading } = useSpec();

  console.log(specs);

  return (
    <TabsContent value="spec">
      <Card>
        <CardHeader>
          <CardTitle>Spec</CardTitle>
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
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
                <TableHead className="hidden md:table-cell">User Id</TableHead>
                <TableHead className="hidden md:table-cell">Id</TableHead>
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
                specs.map((spec, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{spec.title}</TableCell>
                    <TableCell className="font-medium">
                      {spec.status}
                    </TableCell>
                    <TableCell className="font-medium">
                      {new Date(spec.createdTime).toLocaleString("en-US", {
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
                      {spec.userId.slice(0, 6)}...
                    </TableCell>
                    <TableCell className="font-medium">
                      {spec._id.slice(0, 6)}...
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
                          <DialogEditSpec
                            _id={spec._id}
                            title={spec.title}
                            setSpecs={setSpecs}
                          />
                          <DialogDeleteAlertSpec
                             _id={spec._id}
                             title={spec.title}
                             setSpecs={setSpecs}
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
          <span>{specs.length} rooms</span>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}

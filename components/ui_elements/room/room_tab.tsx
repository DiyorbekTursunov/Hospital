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
import { useRooms } from "@/hooks/useRooms";
import { DialogEditRoom } from "./room_update_modal";

export default function RoomTab({}) {
  const { rooms, setRooms, error, loading } = useRooms();

  console.log(rooms);

  return (
    <TabsContent value="room">
      <Card>
        <CardHeader>
          <CardTitle>Room</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room Number</TableHead>
                <TableHead>Room Max Count</TableHead>
                <TableHead className="hidden md:table-cell">
                  Department
                </TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
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
                rooms.map((room, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {room.number}
                    </TableCell>
                    <TableCell className="font-medium">
                      {room.maxcount}
                    </TableCell>
                    <TableCell className="font-medium">
                      {room.department}
                    </TableCell>
                    <TableCell className="font-medium">
                      {room.status}
                    </TableCell>
                    <TableCell className="font-medium">
                      {new Date(room.createdTime).toLocaleString(
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
                      {room.userId}
                    </TableCell>
                    <TableCell className="font-medium">
                      {room._id}
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
                          <DialogEditRoom
                            _id={room._id}
                            maxcount={room.maxcount}
                            number={room.number}
                            setRooms={setRooms}
                            department={room.department}
                          />
                          <div
                            className="relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-slate-100 cursor-pointer"
                            data-orientation="vertical"
                            data-radix-collection-item=""
                          >
                            Delete
                          </div>
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
          <span>{rooms.length} departments</span>
        </CardFooter>
      </Card>
    </TabsContent>
  );
}

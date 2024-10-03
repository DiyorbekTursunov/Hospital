"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DepartmentTab from "@/components/ui_elements/department/department_tab";
import RoomTab from "@/components/ui_elements/room/room_tab";
import { useRouter } from "next/navigation";
import SpecTab from "@/components/ui_elements/spec/spec_tab";
import DoctorTab from "@/components/ui_elements/doctor/doctor_tab";

export default function Dashboard() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<string>("department")

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs
            value={selectedTab} // Use value instead of defaultValue
            onValueChange={(e) => setSelectedTab(e)}
          >
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="department">Departments</TabsTrigger>
                <TabsTrigger value="room">Rooms</TabsTrigger>
                <TabsTrigger value="spec">Spec</TabsTrigger>
                <TabsTrigger value="doctor">
                  Doctor
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Active
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Archived
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  size="sm"
                  className="h-8 gap-1"
                  onClick={() => router.push(`/admin/${selectedTab}/create`)}
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap capitalize">
                    Add {selectedTab}
                  </span>
                </Button>
              </div>
            </div>
            <DepartmentTab />
            <RoomTab />
            <SpecTab />
            <DoctorTab />
          </Tabs>
        </main>
      </div>
    </div>
  );
}

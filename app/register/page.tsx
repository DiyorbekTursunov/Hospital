"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/lib/axiosBaseUrl"; // Ensure you have this set up correctly
import { useRouter } from "next/navigation";
import { toast } from "sonner"

export const description =
  "A sign up form with login, name, and password inside a card. There's an option to sign in if you already have an account.";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    login: "",
    name: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useRouter()

  async function Register(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Reset error message before submission

    try {
      const response = await axiosInstance.post("/auth/reg", {
        login: formData.login,
        password: formData.password,
        name: formData.name,
      });

      if (response.data === "exist") {
        setErrorMessage("User already exists. Please sign in or use a different login.");
      } else if (response.status === 201) {
        navigate.push('/login')
        toast("User Login Success")
      } else {
        setErrorMessage("Registration failed. Please try again.");
        console.error("Registration failed:", response.data);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      console.error("Error during registration:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  return (
    <div className="h-screen flex items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={Register} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="login">Login</Label>
                <Input
                  id="login"
                  placeholder="abdulla"
                  value={formData.login}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Hoshimov Abdullar"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create an account"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

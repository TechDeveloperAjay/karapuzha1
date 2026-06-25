"use server";

import { cookies } from "next/headers";
import { loginSchema } from "@/lib/validation";
import { ActionResult } from "@/types";

export async function loginAdmin(prevState: any, formData: FormData): Promise<ActionResult> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      return {
        success: false,
        message: "Invalid input",
        errors: validation.error.flatten().fieldErrors,
      };
    }

    // Verify credentials against standard admin settings
    if (email === "admin@karapuzha.com" && password === "admin123") {
      const cookieStore = await cookies();
      
      // Store simple secure token session
      cookieStore.set("admin_session", "kws_secured_admin_jwt_placeholder_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return { success: true, message: "Logged in successfully" };
    }

    return {
      success: false,
      message: "Authentication failed. Invalid username or password.",
    };
  } catch (error: any) {
    console.error("Login server error:", error);
    return { success: false, message: "Server connection failed" };
  }
}

export async function logoutAdmin(): Promise<ActionResult> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("admin_session");
    return { success: true, message: "Logged out successfully" };
  } catch (error: any) {
    console.error("Logout server error:", error);
    return { success: false, message: "Logout failed" };
  }
}

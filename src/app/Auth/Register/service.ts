import { RegisterData } from "@/types/APIModels";

export async function signup(newUser: RegisterData) {
  try {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newUser, action: "register" }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || data.error || "Unknown error");
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

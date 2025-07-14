export async function login(email: string, password: string) {
  try {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, action: "login" }),
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

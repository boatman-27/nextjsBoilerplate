export async function getCurrentUserData() {
  const token = localStorage.getItem("accessToken");
  try {
    const res = await fetch("/api/account?action=getUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

export async function EditUserData(
  fname: string,
  lname: string,
  email: string,
) {
  const token = localStorage.getItem("accessToken");
  try {
    const res = await fetch("/api/account", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ fname, lname, email, action: "updateUser" }),
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

export async function ChangeCurrentPassword(
  oldPassword: string,
  newPassword: string,
  confirmNewP: string,
) {
  const token = localStorage.getItem("accessToken");
  try {
    const res = await fetch("/api/account", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
        confirmNewP,
        action: "changePassword",
      }),
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

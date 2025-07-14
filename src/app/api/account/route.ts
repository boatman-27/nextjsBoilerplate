import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action");
  const authHeader = req.headers.get("authorization");
  switch (action) {
    case "getUser": {
      try {
        const res = await fetch(`${process.env.AUTH_URL}account/me`, {
          headers: { Authorization: authHeader || "" },
        });

        const data = await res.json();
        if (!res.ok) {
          return NextResponse.json(data, { status: res.status });
        }
        return NextResponse.json(data);
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 },
        );
      }
    }

    default:
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { action } = body;
  const authHeader = req.headers.get("authorization");

  switch (action) {
    case "updateUser": {
      const { fname, lname, email } = body;
      try {
        const res = await fetch(`${process.env.AUTH_URL}account/update`, {
          method: "PUT",
          headers: { Authorization: authHeader || "" },
          body: JSON.stringify({ fname, lname, email }),
        });

        const data = await res.json();
        if (!res.ok) {
          return NextResponse.json(data, { status: res.status });
        }
        return NextResponse.json(data);
      } catch (error) {
        console.log(error);
        return NextResponse.json(
          { error: "Something went wrong" },
          { status: 500 },
        );
      }
    }
    case "changePassword": {
      const { oldPassword, newPassword, confirmNewP } = body;
      try {
        const res = await fetch(
          `${process.env.AUTH_URL}account/changepassword`,
          {
            method: "PUT",
            headers: { Authorization: authHeader || "" },
            body: JSON.stringify({ oldPassword, newPassword, confirmNewP }),
          },
        );

        const data = await res.json();
        if (!res.ok) {
          return NextResponse.json(data, { status: res.status });
        }
        return NextResponse.json(data);
      } catch (error) {
        console.log(error);
        return NextResponse.json(
          { error: "Something went wrong" },
          { status: 500 },
        );
      }
    }
    default: {
      return NextResponse.json({ error: "Invalid action." }, { status: 400 });
    }
  }
}

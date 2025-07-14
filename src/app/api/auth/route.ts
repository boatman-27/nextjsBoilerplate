import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { action } = body;
  switch (action) {
    case "login": {
      const { email, password } = body;
      try {
        const res = await fetch(`${process.env.AUTH_URL}account/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const body = await res.json();
        if (!res.ok) {
          return NextResponse.json(body, { status: res.status });
        }
        return NextResponse.json(body);
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 },
        );
      }
    }
    case "register": {
      const { newUser } = body;
      try {
        const res = await fetch(`${process.env.AUTH_URL}account/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        const body = await res.json();
        if (!res.ok) {
          return NextResponse.json(body, { status: res.status });
        }
        return NextResponse.json(body);
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 },
        );
      }
    }
    case "validate": {
      const { token } = body;
      try {
        const res = await fetch(`${process.env.AUTH_URL}account/validate`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const body = await res.json();
        if (!res.ok) {
          return NextResponse.json(body, { status: res.status });
        }
        return NextResponse.json(body);
      } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error }, { status: 500 });
      }
    }
    case "logout": {
      try {
        const res = await fetch(`${process.env.AUTH_URL}account/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const body = await res.json();
        if (!res.ok) {
          return NextResponse.json(body, { status: res.status });
        }
        return NextResponse.json(body);
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { error: "Something went wrong." },
          { status: 500 },
        );
      }
    }
    default: {
      return NextResponse.json({ error: "Invalid action." }, { status: 400 });
    }
  }
}

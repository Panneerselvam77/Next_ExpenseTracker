import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL } from "@/lib/api/config";

export async function POST(request: NextRequest) {
  let credentials: unknown;

  try {
    credentials = await request.json();
  } catch {
    return NextResponse.json(
      { detail: "A valid login request is required." },
      { status: 400 },
    );
  }

  if (
    typeof credentials !== "object" ||
    credentials === null ||
    !("username" in credentials) ||
    !("password" in credentials) ||
    typeof credentials.username !== "string" ||
    typeof credentials.password !== "string"
  ) {
    return NextResponse.json(
      { detail: "Username and password are required." },
      { status: 400 },
    );
  }

  const { username, password } = credentials;
  if (!username.trim() || !password) {
    return NextResponse.json(
      { detail: "Username and password are required." },
      { status: 400 },
    );
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: username.trim(), password }),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      { detail: "Authentication service is unavailable. Please try again." },
      { status: 502 },
    );
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    return NextResponse.json(
      { detail: "Authentication service returned an invalid response." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    const message =
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof data.message === "string"
        ? data.message
        : "Invalid username or password.";

    return NextResponse.json({ detail: message }, { status: response.status });
  }

  if (
    typeof data !== "object" ||
    data === null ||
    !("accessToken" in data) ||
    typeof data.accessToken !== "string" ||
    !data.accessToken ||
    !("id" in data) ||
    typeof data.id !== "number" ||
    !("username" in data) ||
    typeof data.username !== "string" ||
    !("email" in data) ||
    typeof data.email !== "string"
  ) {
    return NextResponse.json(
      {
        detail: "Authentication service returned an incomplete login response.",
      },
      { status: 502 },
    );
  }

  const user = {
    id: data.id,
    username: data.username,
    email: data.email,
    ...("firstName" in data && typeof data.firstName === "string"
      ? { firstName: data.firstName }
      : {}),
    ...("lastName" in data && typeof data.lastName === "string"
      ? { lastName: data.lastName }
      : {}),
    ...("gender" in data && typeof data.gender === "string"
      ? { gender: data.gender }
      : {}),
    ...("image" in data && typeof data.image === "string"
      ? { image: data.image }
      : {}),
  };
  const result = NextResponse.json({ user });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60,
  };

  result.cookies.set("accessToken", data.accessToken, cookieOptions);

  return result;
}

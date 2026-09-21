import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "wie_admin_session";
const getSessionToken = () => process.env.ADMIN_SESSION_SECRET || "wie_bu_auth_session";

export async function POST(request: NextRequest) {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD || "wieBU@2026";
    const sessionToken = getSessionToken();

    const { password } = await request.json();

    if (!adminPassword) {
      return NextResponse.json(
        { success: false, error: "Admin authentication is not configured in environment variables." },
        { status: 500 }
      );
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        { success: false, error: "Invalid administrator passkey." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Admin authenticated successfully.",
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err) {
    console.error("Auth POST error:", err);
    return NextResponse.json(
      { success: false, error: "Server authentication error." },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const sessionCookie = request.cookies.get(COOKIE_NAME);
  const isAuthenticated = sessionCookie?.value === getSessionToken();
  return NextResponse.json({ isAuthenticated });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out." });
  response.cookies.delete(COOKIE_NAME);
  return response;
}

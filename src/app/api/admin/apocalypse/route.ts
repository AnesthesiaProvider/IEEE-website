import { NextRequest, NextResponse } from "next/server";
import { readApocalypseRegistrations, deleteApocalypseRegistration } from "@/lib/storage";

const COOKIE_NAME = "wie_admin_session";
const SESSION_TOKEN = process.env.ADMIN_SESSION_SECRET || "wie_bu_auth_session";

function isAuthorized(request: NextRequest): boolean {
  const sessionCookie = request.cookies.get(COOKIE_NAME);
  return sessionCookie?.value === SESSION_TOKEN;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access." },
      { status: 401 }
    );
  }

  try {
    const registrations = await readApocalypseRegistrations();
    return NextResponse.json({ success: true, registrations });
  } catch (error: unknown) {
    console.error("Error reading Apocalypse registrations:", error);
    return NextResponse.json(
      { success: false, error: "Failed to read registrations." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access." },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Registration ID is required." },
        { status: 400 }
      );
    }

    const result = await deleteApocalypseRegistration(id);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Failed to delete registration." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Registration deleted successfully.",
    });
  } catch (error: unknown) {
    console.error("Error deleting registration:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete registration." },
      { status: 500 }
    );
  }
}

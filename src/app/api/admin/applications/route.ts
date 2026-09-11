import { NextRequest, NextResponse } from "next/server";
import { readApplications, updateApplicationStatus, deleteApplication } from "@/lib/storage";
import { ApplicationStatus } from "@/lib/types";

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
    const apps = await readApplications();
    return NextResponse.json({ success: true, applications: apps });
  } catch (error: unknown) {
    console.error("Error reading applications:", error);
    return NextResponse.json(
      { success: false, error: "Failed to read applications." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized access." },
      { status: 401 }
    );
  }

  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "ID and status are required." },
        { status: 400 }
      );
    }

    const validStatuses: ApplicationStatus[] = ["Pending", "Shortlisted", "Selected", "Rejected"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status value." },
        { status: 400 }
      );
    }

    const result = await updateApplicationStatus(id, status);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Update failed." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Status updated." });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to update application." },
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
        { success: false, error: "Application ID is required." },
        { status: 400 }
      );
    }

    const result = await deleteApplication(id);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Delete failed." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Application deleted." });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to delete application." },
      { status: 500 }
    );
  }
}

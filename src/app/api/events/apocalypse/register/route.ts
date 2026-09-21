import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  saveApocalypseRegistration,
  checkDuplicateApocalypseTeamOrMember,
} from "@/lib/storage";

const memberSchema = z.object({
  name: z.string().min(2, "Member name must be at least 2 characters."),
  enrollmentNumber: z
    .string()
    .min(5, "Please enter a valid Bennett University enrollment number (e.g. E23CSEU0123)."),
  email: z.string().email("Please provide a valid email address.").optional().or(z.literal("")),
  phone: z.string().min(10, "Phone number must be at least 10 digits.").optional().or(z.literal("")),
  isLeader: z.boolean().optional(),
});

const apocalypseRegistrationSchema = z.object({
  teamName: z.string().min(2, "Team name must be at least 2 characters.").max(50, "Team name too long."),
  members: z
    .array(memberSchema)
    .min(2, "Teams must consist of at least 2 members.")
    .max(4, "Teams cannot have more than 4 members."),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Server-side Zod validation
    const parsed = apocalypseRegistrationSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input data.";
      return NextResponse.json(
        { success: false, error: firstError, issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const { teamName, members } = parsed.data;

    // Check duplicate enrollment numbers within the submitted team itself
    const submittedEnrolls = members.map((m) => m.enrollmentNumber.trim().toUpperCase());
    const uniqueEnrolls = new Set(submittedEnrolls);
    if (uniqueEnrolls.size !== submittedEnrolls.length) {
      return NextResponse.json(
        {
          success: false,
          error: "Duplicate enrollment numbers detected within your team. Each member must have a unique enrollment number.",
        },
        { status: 400 }
      );
    }

    // Check duplicate team name or duplicate member enrollment across existing registrations
    const duplicateCheck = await checkDuplicateApocalypseTeamOrMember(
      teamName,
      submittedEnrolls
    );

    if (duplicateCheck.duplicateTeam) {
      return NextResponse.json(
        {
          success: false,
          error: `The team name "${teamName}" is already registered. Please choose a different team name.`,
        },
        { status: 409 }
      );
    }

    if (duplicateCheck.duplicateEnrollment) {
      return NextResponse.json(
        {
          success: false,
          error: `Student with enrollment number ${duplicateCheck.duplicateEnrollment} is already registered in another team.`,
        },
        { status: 409 }
      );
    }

    // Save registration
    const result = await saveApocalypseRegistration({
      teamName,
      members,
    });

    if (!result.success || !result.data) {
      return NextResponse.json(
        { success: false, error: result.error || "Failed to save team registration." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Team registration for Apocalypse completed successfully.",
      registration: {
        id: result.data.id,
        teamName: result.data.teamName,
        membersCount: result.data.members.length,
        createdAt: result.data.createdAt,
      },
    });
  } catch (err: unknown) {
    console.error("Apocalypse registration error:", err);
    const message = err instanceof Error ? err.message : "Internal server error.";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

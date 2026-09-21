import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  saveApplication,
  checkDuplicateEnrollment,
  checkDuplicateJuniorCorePhone,
} from "@/lib/storage";
import { sendApplicationConfirmationEmail } from "@/lib/email";
import { ApplicationDomain } from "@/lib/types";

const applicationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters long."),
  enrollmentNumber: z
    .string()
    .min(5, "Please enter a valid Bennett University enrollment number (e.g. E23CSEU0123)."),
  email: z
    .string()
    .email("Please provide a valid email address.")
    .refine(
      (val) => val.includes("@"),
      "Please provide a valid email."
    ),
  phone: z
    .string()
    .min(10, "Please enter a valid 10-digit phone number.")
    .max(15, "Phone number is too long."),
  gender: z.string().optional(),
  course: z.string().min(1, "Please select or enter your course / degree program."),
  branch: z.string().min(1, "Please specify your branch / specialization."),
  year: z.string().min(1, "Please specify your academic year."),
  semester: z.string().min(1, "Please specify your current semester."),
  domain: z.enum([
    "Technical",
    "Events",
    "Design",
    "Marketing",
    "Public Relations",
    "Content",
    "Social Media",
    "Operations",
    "Research",
    "Other",
  ] as [ApplicationDomain, ...ApplicationDomain[]]),
  whyJoin: z.string().min(15, "Please share a brief motivation on why you'd like to join (minimum 15 characters)."),
  previousExperience: z.string().optional(),
  skills: z.string().min(2, "Please list at least one relevant skill or tool."),
  portfolioUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  additionalInfo: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must confirm that the information provided is accurate.",
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Server-side Zod validation
    const parsed = applicationSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input fields.";
      return NextResponse.json(
        { success: false, error: firstError, issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Check duplicate enrollment number
    const isDuplicate = await checkDuplicateEnrollment(data.enrollmentNumber);
    if (isDuplicate) {
      return NextResponse.json(
        {
          success: false,
          error: `An application with enrollment number ${data.enrollmentNumber.toUpperCase()} has already been submitted. If you need to revise your submission, please reach out to wie.ieee@bennett.edu.in.`,
        },
        { status: 409 }
      );
    }

    // Check duplicate phone number
    const isDuplicatePhone = await checkDuplicateJuniorCorePhone(data.phone);
    if (isDuplicatePhone) {
      return NextResponse.json(
        {
          success: false,
          error: `An application with phone number ${data.phone} has already been submitted. Only one Junior Core application is allowed per phone number.`,
        },
        { status: 409 }
      );
    }

    // Persist application
    const result = await saveApplication(data);
    if (!result.success || !result.data) {
      return NextResponse.json(
        { success: false, error: result.error || "Failed to save application." },
        { status: 500 }
      );
    }

    // Trigger email acknowledgement hook asynchronously
    sendApplicationConfirmationEmail(result.data).catch((err) =>
      console.warn("Background email error:", err)
    );

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully.",
      application: {
        id: result.data.id,
        fullName: result.data.fullName,
        enrollmentNumber: result.data.enrollmentNumber,
        domain: result.data.domain,
        createdAt: result.data.createdAt,
      },
    });
  } catch (error: unknown) {
    console.error("API error submitting application:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected server error occurred. Please try again." },
      { status: 500 }
    );
  }
}

import fs from "fs/promises";
import path from "path";
import { JuniorCoreApplication, ApplicationStatus } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const APPLICATIONS_FILE = path.join(DATA_DIR, "applications.json");

// Sample initial applications so the admin dashboard has preview data right away
const INITIAL_APPLICATIONS: JuniorCoreApplication[] = [
  {
    id: "app-seed-01",
    fullName: "Riddhima Saxena",
    enrollmentNumber: "E23CSEU0101",
    email: "rsaxena_cse23@bennett.edu.in",
    phone: "+91 9876543210",
    gender: "Female",
    course: "B.Tech",
    branch: "Computer Science and Engineering",
    year: "2nd Year",
    semester: "4th Semester",
    domain: "Technical",
    whyJoin: "I want to contribute to the open-source chapter projects and organize hands-on AI bootcamps for my peers.",
    previousExperience: "Built fullstack web apps in Next.js and competed in Smart India Hackathon.",
    skills: "React, Next.js, Python, TypeScript, Git, Tailwind CSS",
    portfolioUrl: "https://github.com/placeholder-applicant1",
    linkedinUrl: "https://linkedin.com/in/placeholder-applicant1",
    githubUrl: "https://github.com/placeholder-applicant1",
    additionalInfo: "Available on weekends for on-campus event workshops.",
    consent: true,
    status: "Shortlisted",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: "app-seed-02",
    fullName: "Kriti Aggarwal",
    enrollmentNumber: "E24ECEU0045",
    email: "kaggarwal_ece24@bennett.edu.in",
    phone: "+91 9812345678",
    gender: "Female",
    course: "B.Tech",
    branch: "Electronics & Communication",
    year: "1st Year",
    semester: "2nd Semester",
    domain: "Design",
    whyJoin: "Passionate about creating clean UI/UX and motion graphics for technology student communities.",
    previousExperience: "Designed brand assets and UI screens for school tech symposium and freelance clubs.",
    skills: "Figma, Adobe Illustrator, Canva, UI Prototyping, Design Systems",
    portfolioUrl: "https://behance.net/placeholder",
    linkedinUrl: "https://linkedin.com/in/placeholder-applicant2",
    additionalInfo: "Excited to design stage visuals and badges for upcoming hackathons!",
    consent: true,
    status: "Pending",
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: "app-seed-03",
    fullName: "Ananya Deshmukh",
    enrollmentNumber: "E23CSEU0221",
    email: "adeshmukh_cse23@bennett.edu.in",
    phone: "+91 9765432109",
    gender: "Female",
    course: "B.Tech",
    branch: "Computer Science & Engineering",
    year: "2nd Year",
    semester: "4th Semester",
    domain: "Events",
    whyJoin: "I love community building, hosting hackathons, and connecting students with industry leaders.",
    previousExperience: "Core coordinator for Bennett University cultural and technical fest hospitality.",
    skills: "Event Management, Public Speaking, Vendor Logistics, Sponsorship Pitching",
    linkedinUrl: "https://linkedin.com/in/placeholder-applicant3",
    additionalInfo: "Great interpersonal communication and crisis handling under pressure.",
    consent: true,
    status: "Selected",
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
];

async function ensureDataFile(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(APPLICATIONS_FILE);
    } catch {
      await fs.writeFile(
        APPLICATIONS_FILE,
        JSON.stringify(INITIAL_APPLICATIONS, null, 2),
        "utf-8"
      );
    }
  } catch (err) {
    console.error("Failed to initialize storage:", err);
  }
}

export async function readApplications(): Promise<JuniorCoreApplication[]> {
  await ensureDataFile();
  try {
    const raw = await fs.readFile(APPLICATIONS_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading applications:", err);
    return [];
  }
}

export async function writeApplications(apps: JuniorCoreApplication[]): Promise<void> {
  await ensureDataFile();
  const tempFile = `${APPLICATIONS_FILE}.tmp.${Date.now()}`;
  await fs.writeFile(tempFile, JSON.stringify(apps, null, 2), "utf-8");
  await fs.rename(tempFile, APPLICATIONS_FILE);
}

export async function checkDuplicateEnrollment(enrollmentNumber: string): Promise<boolean> {
  const apps = await readApplications();
  const normalized = enrollmentNumber.trim().toUpperCase();
  return apps.some((app) => app.enrollmentNumber.trim().toUpperCase() === normalized);
}

export async function saveApplication(
  data: Omit<JuniorCoreApplication, "id" | "createdAt" | "updatedAt" | "status">
): Promise<{ success: boolean; data?: JuniorCoreApplication; error?: string }> {
  try {
    const isDuplicate = await checkDuplicateEnrollment(data.enrollmentNumber);
    if (isDuplicate) {
      return {
        success: false,
        error: `An application with enrollment number "${data.enrollmentNumber}" has already been submitted.`,
      };
    }

    const apps = await readApplications();
    const newApp: JuniorCoreApplication = {
      ...data,
      id: `app-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      enrollmentNumber: data.enrollmentNumber.trim().toUpperCase(),
      status: "Pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    apps.unshift(newApp);
    await writeApplications(apps);

    return { success: true, data: newApp };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to persist application.";
    return { success: false, error: message };
  }
}

export async function updateApplicationStatus(
  id: string,
  status: ApplicationStatus
): Promise<{ success: boolean; error?: string }> {
  try {
    const apps = await readApplications();
    const index = apps.findIndex((a) => a.id === id);
    if (index === -1) {
      return { success: false, error: "Application not found" };
    }

    apps[index].status = status;
    apps[index].updatedAt = new Date().toISOString();
    await writeApplications(apps);
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update status.";
    return { success: false, error: message };
  }
}

export async function deleteApplication(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const apps = await readApplications();
    const filtered = apps.filter((a) => a.id !== id);
    if (filtered.length === apps.length) {
      return { success: false, error: "Application not found" };
    }
    await writeApplications(filtered);
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete application.";
    return { success: false, error: message };
  }
}

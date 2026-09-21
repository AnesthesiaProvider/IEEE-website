import fs from "fs/promises";
import path from "path";
import { JuniorCoreApplication, ApplicationStatus, ApocalypseRegistration } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const APPLICATIONS_FILE = path.join(DATA_DIR, "applications.json");
const APOCALYPSE_FILE = path.join(DATA_DIR, "apocalypse-registrations.json");


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

export async function checkDuplicateJuniorCorePhone(phone: string): Promise<boolean> {
  const apps = await readApplications();
  const cleanPhone = phone.replace(/[^0-9]/g, "").slice(-10);
  if (cleanPhone.length < 10) return false;
  return apps.some((app) => {
    const existing = (app.phone || "").replace(/[^0-9]/g, "").slice(-10);
    return existing === cleanPhone;
  });
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

    const isDuplicatePhone = await checkDuplicateJuniorCorePhone(data.phone);
    if (isDuplicatePhone) {
      return {
        success: false,
        error: `An application with phone number "${data.phone}" has already been submitted. Only one Junior Core application is allowed per phone number.`,
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

// ---------------------------------------------------------------------------
// Apocalypse 2026 Team Registrations
// ---------------------------------------------------------------------------

async function ensureApocalypseFile(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(APOCALYPSE_FILE);
    } catch {
      await fs.writeFile(APOCALYPSE_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Failed to initialize Apocalypse storage:", err);
  }
}

export async function readApocalypseRegistrations(): Promise<ApocalypseRegistration[]> {
  await ensureApocalypseFile();
  try {
    const data = await fs.readFile(APOCALYPSE_FILE, "utf-8");
    return JSON.parse(data) as ApocalypseRegistration[];
  } catch (err) {
    console.error("Error reading Apocalypse registrations:", err);
    return [];
  }
}

export async function writeApocalypseRegistrations(registrations: ApocalypseRegistration[]): Promise<void> {
  await ensureApocalypseFile();
  await fs.writeFile(APOCALYPSE_FILE, JSON.stringify(registrations, null, 2), "utf-8");
}

export async function checkDuplicateApocalypseTeamOrMember(
  teamName: string,
  enrollmentNumbers: string[],
  phoneNumbers: string[] = []
): Promise<{ duplicateTeam: boolean; duplicateEnrollment?: string; duplicatePhone?: string }> {
  const registrations = await readApocalypseRegistrations();
  
  // Check team name
  const teamExists = registrations.some(
    (r) => r.teamName.trim().toLowerCase() === teamName.trim().toLowerCase()
  );
  if (teamExists) {
    return { duplicateTeam: true };
  }

  // Check enrollment numbers across all existing registered teams
  const cleanEnrolls = enrollmentNumbers.map((e) => e.trim().toUpperCase());
  for (const reg of registrations) {
    for (const mem of reg.members) {
      const existingEnroll = mem.enrollmentNumber.trim().toUpperCase();
      if (cleanEnrolls.includes(existingEnroll)) {
        return { duplicateTeam: false, duplicateEnrollment: existingEnroll };
      }
    }
  }

  // Check phone numbers across all existing registered teams (normalize to last 10 digits)
  const cleanPhones = phoneNumbers
    .map((p) => p.replace(/[^0-9]/g, "").slice(-10))
    .filter((p) => p.length >= 10);

  for (const reg of registrations) {
    for (const mem of reg.members) {
      if (mem.phone) {
        const existingPhone = mem.phone.replace(/[^0-9]/g, "").slice(-10);
        if (cleanPhones.includes(existingPhone)) {
          return { duplicateTeam: false, duplicatePhone: mem.phone };
        }
      }
    }
  }

  return { duplicateTeam: false };
}


export async function saveApocalypseRegistration(
  data: Omit<ApocalypseRegistration, "id" | "createdAt">
): Promise<{ success: boolean; data?: ApocalypseRegistration; error?: string }> {
  try {
    const registrations = await readApocalypseRegistrations();
    const newRegistration: ApocalypseRegistration = {
      ...data,
      id: `APOC-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      createdAt: new Date().toISOString(),
    };

    registrations.unshift(newRegistration);
    await writeApocalypseRegistrations(registrations);
    return { success: true, data: newRegistration };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to save Apocalypse registration.";
    return { success: false, error: message };
  }
}

export async function deleteApocalypseRegistration(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const registrations = await readApocalypseRegistrations();
    const filtered = registrations.filter((r) => r.id !== id);
    if (filtered.length === registrations.length) {
      return { success: false, error: "Registration not found." };
    }
    await writeApocalypseRegistrations(filtered);
    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete registration.";
    return { success: false, error: message };
  }
}


export type TeamRole =
  | "Chairperson"
  | "Vice Chairperson"
  | "Secretary"
  | "Treasurer"
  | "Technical Head"
  | "Technical Sub-Head"
  | "Events Head"
  | "Events Sub-Head"
  | "PR & Marketing Head"
  | "PR & Marketing Sub-Head"
  | "Design Head"
  | "Design Sub-Head"
  | "Content Head"
  | "Social Media Head"
  | "Research Head";

export interface TeamMember {
  id: string;
  name: string;
  role: TeamRole | string;
  domain: "Leadership" | "Technical" | "Events" | "Design" | "PR & Marketing" | "Content & Media";
  image: string;
  bio: string;
  linkedin?: string;
  github?: string;
  email?: string;
  yearAndBranch: string; // e.g. "B.Tech CSE, 3rd Year"
}

export type EventCategory =
  | "All"
  | "Workshops"
  | "Technical"
  | "Competitions"
  | "Networking"
  | "Speaker Sessions"
  | "Community";

export interface ChapterEvent {
  id: string;
  title: string;
  slug: string;
  category: "Workshops" | "Technical" | "Competitions" | "Networking" | "Speaker Sessions" | "Community";
  status: "upcoming" | "past";
  date: string; // formatted e.g. "15 OCT 2026" or "Upcoming"
  time?: string;
  venue: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  registrationOpen: boolean;
  registrationLink?: string;
  participantsCount?: number;
  galleryImages?: string[];
  tags: string[];
}

export interface ImpactStat {
  id: string;
  numericValue: number;
  suffix: string; // e.g. "+"
  label: string;
  description: string;
  iconName: string;
}

export type ApplicationDomain =
  | "Technical"
  | "Events"
  | "Design"
  | "Marketing"
  | "Public Relations"
  | "Content"
  | "Social Media"
  | "Operations"
  | "Research"
  | "Other";

export type ApplicationStatus = "Pending" | "Shortlisted" | "Selected" | "Rejected";

export interface JuniorCoreApplication {
  id: string;
  fullName: string;
  enrollmentNumber: string;
  email: string;
  phone: string;
  gender?: string;
  course: string;
  branch: string;
  year: string;
  semester: string;
  domain: ApplicationDomain;
  whyJoin: string;
  previousExperience?: string;
  skills: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  additionalInfo?: string;
  consent: boolean;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SiteConfig {
  chapterName: string;
  institutionName: string;
  tagline: string;
  missionStatement: string;
  aboutText: string;
  socials: {
    instagram: string;
    linkedin: string;
    github: string;
    email: string;
    whatsappCommunity?: string;
  };
  navigation: {
    name: string;
    href: string;
  }[];
}

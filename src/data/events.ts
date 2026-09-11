import { ChapterEvent } from "@/lib/types";

/**
 * IEEE WIE Bennett University - Events Directory
 * 
 * ATTENTION TECH HEAD / EVENTS LEAD:
 * Add new upcoming events or move completed events to the past section by
 * adjusting status: "upcoming" | "past".
 * 
 * Note: All dates, venues, and descriptions below are demonstration placeholders
 * clearly identified for customization by chapter leads.
 */
export const chapterEvents: ChapterEvent[] = [
  // --- UPCOMING EVENTS ---
  {
    id: "she-builds-hackathon-2026",
    title: "SheBuilds: 36-Hour National Hackathon", // [DEMO/PLACEHOLDER]
    slug: "she-builds-hackathon",
    category: "Competitions",
    status: "upcoming",
    date: "28 OCT 2026",
    time: "10:00 AM IST",
    venue: "Tinkering Lab / Auditorium, Bennett University",
    shortDescription:
      "A premier flagship hackathon bringing together passionate coders and designers to engineer tech solutions for social impact and sustainability.",
    fullDescription:
      "SheBuilds is IEEE WIE Bennett University's annual flagship hackathon welcoming undergraduate developers across India. With tracks spanning Generative AI, HealthTech, CyberSecurity, and Sustainable Smart Cities, participants collaborate in teams of 2-4 with hands-on mentorship from senior industry engineers.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000&auto=format&fit=crop",
    registrationOpen: true,
    registrationLink: "https://unstop.com", // [DEMO LINK]
    tags: ["Hackathon", "AI/ML", "Web3", "Cash Prizes", "Mentorship"],
  },
  {
    id: "genai-agents-workshop",
    title: "Autonomous AI Agents & LLMs Masterclass", // [DEMO/PLACEHOLDER]
    slug: "autonomous-ai-agents-workshop",
    category: "Workshops",
    status: "upcoming",
    date: "12 NOV 2026",
    time: "02:30 PM - 05:30 PM IST",
    venue: "Lab Block C - 302, Bennett University",
    shortDescription:
      "An intensive hands-on workshop guiding students to build autonomous multi-agent systems using modern Python frameworks.",
    fullDescription:
      "Dive into agentic workflows, tool execution, memory architectures, and real-world deployment. Learn how top tech companies build agents that inspect codebases, execute APIs, and solve complex automation challenges.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop",
    registrationOpen: true,
    registrationLink: "https://forms.google.com", // [DEMO LINK]
    tags: ["Workshop", "Python", "Generative AI", "Hands-on"],
  },
  {
    id: "women-in-tech-leadership-panel",
    title: "Pioneering Paths: Women Tech Leaders Panel", // [DEMO/PLACEHOLDER]
    slug: "women-in-tech-leadership-panel",
    category: "Speaker Sessions",
    status: "upcoming",
    date: "25 NOV 2026",
    time: "04:00 PM - 06:00 PM IST",
    venue: "Virtual via Zoom / Hybrid BU Studio",
    shortDescription:
      "Inspiring fireside chat featuring distinguished female engineers and engineering directors from global technology leaders.",
    fullDescription:
      "Hear candid stories, career roadmaps, interview preparation strategies, and leadership wisdom from women who shattered glass ceilings in cloud engineering, chip design, and quantitative software systems.",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop",
    registrationOpen: true,
    registrationLink: "https://forms.google.com", // [DEMO LINK]
    tags: ["Leadership", "Panel", "Career Growth", "Networking"],
  },

  // --- PAST EVENTS ---
  {
    id: "code-craft-webdev-bootcamp",
    title: "CodeCraft: Modern Fullstack Bootcamp", // [DEMO/PLACEHOLDER]
    slug: "code-craft-fullstack-bootcamp",
    category: "Technical",
    status: "past",
    date: "14 AUG 2026",
    time: "3 Days Interactive",
    venue: "Computer Center 1, BU",
    shortDescription:
      "3-day intensive cohort on Next.js, TypeScript, PostgreSQL, and scalable UI engineering completed by 150+ students.",
    fullDescription:
      "From blank repository to full production deployment on Vercel. Participants built reactive web applications with relational databases, authentication guards, and interactive animations.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
    registrationOpen: false,
    participantsCount: 165,
    tags: ["Fullstack", "Next.js", "TypeScript", "Vercel"],
    galleryImages: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000&auto=format&fit=crop",
    ],
  },
  {
    id: "hardware-iot-hacknight",
    title: "Embedded Odyssey: IoT & Robotics Sprint", // [DEMO/PLACEHOLDER]
    slug: "embedded-odyssey-iot-hacknight",
    category: "Workshops",
    status: "past",
    date: "22 JUL 2026",
    time: "Overnight Workshop",
    venue: "Electronics & Microcontroller Lab, BU",
    shortDescription:
      "Hands-on sensor telemetry, ESP32 microcontrollers, and circuit prototyping in an overnight engineering sprint.",
    fullDescription:
      "Participants wired sensor arrays, flashed real-time operating systems, and visualized telemetry dashboards over MQTT channels, concluding with a live hardware demo shootout.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop",
    registrationOpen: false,
    participantsCount: 92,
    tags: ["IoT", "Hardware", "Robotics", "ESP32"],
    galleryImages: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1000&auto=format&fit=crop",
    ],
  },
  {
    id: "wie-connect-mixer",
    title: "WIE Connect: Alumni & Senior Mentorship Mixer", // [DEMO/PLACEHOLDER]
    slug: "wie-connect-mentorship-mixer",
    category: "Networking",
    status: "past",
    date: "05 MAY 2026",
    time: "05:00 PM - 07:30 PM",
    venue: "Central Amphitheatre, Bennett University",
    shortDescription:
      "An evening of cross-year peer bonding, resume review clinics, and internship roadmap roundtables.",
    fullDescription:
      "Bridging the transition from student to software engineer. Over 200 freshmen and sophomores paired with seniors who cracked FAANG and top product firm internships for 1-on-1 resume feedback.",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop",
    registrationOpen: false,
    participantsCount: 210,
    tags: ["Networking", "Mentorship", "Alumni", "Career"],
    galleryImages: [
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop",
    ],
  },
];

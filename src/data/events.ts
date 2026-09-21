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
    id: "club-carnival",
    title: "Club Carnival",
    subtitle: "Find Your People",
    slug: "club-carnival",
    category: "Networking",
    status: "upcoming",
    date: "Semester Kickoff",
    time: "Campus Hours",
    venue: "Bennett University Campus",
    shortDescription:
      "Kickstart the semester with a vibrant showcase of clubs, communities and opportunities. Explore. Interact. Be a part of the Bennett life!",
    fullDescription:
      "Find Your People.\n\nKickstart the semester with a vibrant showcase of clubs, communities and opportunities. Explore. Interact. Be a part of the Bennett life!\n\nMeet the IEEE WIE team, discover hands-on technical initiatives, connect with student leaders, and explore opportunities to grow your network and career right from campus.",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=1000&auto=format&fit=crop",
    registrationOpen: true,
    registrationLink: "https://forms.google.com",
    tags: ["Club Carnival", "Community", "Find Your People", "Bennett Life", "Networking"],
  },
  {
    id: "apocalypse-2026",
    title: "Apocalypse",
    subtitle: "Step Into the Unexpected",
    slug: "apocalypse",
    category: "Competitions",
    status: "upcoming",
    date: "23 SEP 2026",
    time: "To Be Announced",
    venue: "Bennett University",
    shortDescription:
      "An adrenaline-filled experience with challenges, surprises and memories you’ll be talking about long after it ends. Are you ready?",
    fullDescription:
      "Step Into the Unexpected.\n\nAn adrenaline-filled experience with challenges, surprises and memories you’ll be talking about long after it ends. Are you ready?\n\nPrepare for an intense, high-energy competition designed to test quick thinking, teamwork, and resilience under pressure. Gather your squad (minimum 2, maximum 4 members) and step into the arena.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop",
    registrationOpen: true,
    registrationLink: "#register-team",
    tags: ["Apocalypse", "Challenges", "Competition", "Squad (2-4)", "Adrenaline"],
  },
  {
    id: "ieee-day-2026",
    title: "IEEE Day",
    subtitle: "Celebrate. Collaborate. Create.",
    slug: "ieee-day",
    category: "Technical",
    status: "upcoming",
    date: "06 OCT 2026",
    time: "Full Day Celebration",
    venue: "Bennett University",
    shortDescription:
      "A day to celebrate technology, innovation and the global IEEE community. Inspiring talks, engaging sessions and opportunities to connect with like-minded peers.",
    fullDescription:
      "Celebrate. Collaborate. Create.\n\nA day to celebrate technology, innovation and the global IEEE community. Inspiring talks, engaging sessions and opportunities to connect with like-minded peers.\n\nJoin IEEE WIE Bennett University as we commemorate IEEE Day with keynote addresses, interactive tech showcases, community networking, and celebrations honoring the worldwide spirit of engineering for humanity.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop",
    registrationOpen: true,
    registrationLink: "https://forms.google.com",
    tags: ["IEEE Day", "Technology", "Innovation", "Global Community", "Celebrate"],
  },

  // --- PAST EVENTS ---
  {
    id: "ai-summit",
    title: "AI Summit",
    subtitle: "Exploring the Future of Artificial Intelligence",
    slug: "ai-summit",
    category: "Technical",
    status: "past",
    date: "Completed",
    time: "Flagship Summit",
    venue: "Bennett University",
    shortDescription:
      "An engaging initiative focused on exploring the growing impact and possibilities of Artificial Intelligence with university and chapter leadership.",
    fullDescription:
      "The AI Summit was an engaging initiative by IEEE WIE at Bennett University, focused on exploring the growing impact and possibilities of Artificial Intelligence.\n\nThe event brought together students, university leadership and IEEE WIE leadership for meaningful discussions around AI and the opportunities emerging with this rapidly evolving technology.\n\nThe summit featured the Dean of Bennett University and the Chairperson of IEEE WIE, who shared their perspectives and insights with the student community.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop",
    registrationOpen: false,
    tags: ["AI", "Artificial Intelligence", "Leadership", "Future of Tech", "Bennett University"],
    highlights: [
      "Insightful discussions around Artificial Intelligence",
      "Interaction with university leadership",
      "Perspectives from IEEE WIE leadership",
      "Exposure to emerging opportunities in AI",
      "Student interaction and engagement",
    ],
    speakers: [
      { role: "Dean of Bennett University" },
      { role: "Chairperson, IEEE WIE" },
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000&auto=format&fit=crop",
    ],
  },
  {
    id: "internship-series-1",
    title: "Internship Series 1.0",
    subtitle: "From Preparation to Possibilities.",
    slug: "internship-series-1",
    category: "Workshops",
    status: "past",
    date: "3 Episodes",
    time: "Comprehensive Cohort",
    venue: "Bennett University",
    shortDescription:
      "A three-episode initiative designed to help students understand what it takes to become internship-ready through practical guidance and mock rounds.",
    fullDescription:
      "Internship Series 1.0 was a three-episode initiative designed to help students understand what it takes to become internship-ready.\n\nThe series focused on practical guidance, essential skills and the realities of technical interviews, giving students a clearer understanding of what companies look for beyond academic performance.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop",
    registrationOpen: false,
    tags: ["Internships", "Career Guidance", "Technical Interviews", "Mock Round", "Resume Prep"],
    highlights: [
      "3 Episodes",
      "Career Guidance",
      "Mock Technical Round",
      "Practical Insights",
    ],
    episodes: [
      {
        episode: "Episode 01",
        title: "Know What It Takes",
        description:
          "The first episode focused on understanding the skills and competencies students need to develop to prepare themselves for internship opportunities.",
      },
      {
        episode: "Episode 02",
        title: "Experience the Technical Round",
        description:
          "Students got a glimpse of the technical interview process through a mock technical round. The session was designed to give participants a basic idea of how technical interviews work and how they can prepare for them.",
      },
      {
        episode: "Episode 03",
        title: "Insights Beyond the Classroom",
        description:
          "The final episode featured Shashwant, former President of DCC, who shared additional insights and perspectives on internships, career preparation and the professional journey ahead.",
      },
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop",
    ],
  },
  {
    id: "innovation-expo-1",
    title: "Innovation Expo 1.0",
    subtitle: "Where Ideas Meet Impact.",
    slug: "innovation-expo-1",
    category: "Competitions",
    status: "past",
    date: "Flagship Expo",
    time: "Project Pitch & Demo",
    venue: "Bennett University",
    shortDescription:
      "Flagship innovation-focused event providing students with a platform to take their ideas beyond the classroom and pitch to industry judges.",
    fullDescription:
      "Innovation Expo 1.0 was the flagship innovation-focused event by IEEE WIE at Bennett University, providing students with a platform to take their ideas beyond the classroom.\n\nStudents presented their startup ideas and technology-driven solutions, showcasing how emerging technologies such as Artificial Intelligence could be integrated into solutions for real-world problems.\n\nThe event featured three external judges, giving participants the opportunity to pitch their ideas directly to professionals and receive valuable feedback.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1000&auto=format&fit=crop",
    registrationOpen: false,
    tags: ["Innovation", "Startup Pitch", "AI Solutions", "External Judges", "Impact"],
    highlights: [
      "💡 Ideas: Students presented innovative concepts and startup ideas aimed at solving real-world problems.",
      "🤖 Technology: Participants demonstrated how technologies such as AI could strengthen and transform their solutions.",
      "🎤 Pitching: Students got hands-on experience pitching their ideas and communicating their vision to an external panel.",
      "👨‍⚖️ Expert Evaluation: Three external judges evaluated the ideas and provided feedback from a professional perspective.",
    ],
    judges: [
      {
        name: "Aman Raghuvanshi",
        role: "Product Analyst",
        company: "American Express (AMEX)",
      },
      {
        name: "Roubin Singh",
        role: "Lead Engineer",
        company: "Samsung",
      },
      {
        name: "Swara Chachad",
        role: "Product Designer",
        company: "ixigo",
      },
    ],
    galleryImages: [
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=1000&auto=format&fit=crop",
    ],
  },
];

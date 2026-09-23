import { TeamMember } from "@/lib/types";

/**
 * IEEE WIE Bennett University - Senior Core Team Directory
 *
 * ATTENTION TECH HEAD / EXECUTIVE BOARD:
 * Replace the placeholder data below with the actual senior core team members.
 * Images can be hosted in `/public/images/team/` or external URLs (e.g., LinkedIn/Cloudinary).
 * 
 * Required fields per member:
 * - id: unique string
 * - name: Full Name
 * - role: Chapter Position (e.g. Chairperson, Technical Head)
 * - domain: Leadership | Technical | Events | Design | PR & Marketing | Content & Media
 * - image: Photo URL (aspect ratio ~1:1 recommended)
 * - bio: Short summary of responsibilities, passions, and background
 * - yearAndBranch: e.g. "B.Tech CSE, 3rd Year"
 * - linkedin / github / email: Optional social links
 */
export const seniorCoreTeam: TeamMember[] = [
  {
    id: "chairperson",
    name: "Pihu Chowdhury",
    role: "Chairperson",
    domain: "Leadership",
    image: "/images/team/pihu-chowdhury.jpg",
    bio: "Driving the strategic vision of IEEE WIE BU, spearheading technical inclusivity initiatives, and nurturing an empowered community of student builders.",
    yearAndBranch: "B.Tech CSE, 2nd Year",
    linkedin: "https://linkedin.com/in/placeholder-chairperson",
    github: "https://github.com/placeholder-chairperson",
    email: "chair.wie@bennett.edu.in",
  },
  {
    id: "vice-chairperson",
    name: "Medha Rana",
    role: "Vice Chairperson",
    domain: "Leadership",
    image: "/images/team/medha-rana-official.jpg",
    bio: "Managing cross-departmental operations, external chapter alliances, and fostering hands-on engineering research and mentorship circles.",
    yearAndBranch: "B.Tech CSE, 2nd Year",
    linkedin: "https://www.linkedin.com/in/medha-rana-43b74a37a",
    github: "https://github.com/placeholder-vicechair",
    email: "S25CSEU2398@bennett.edu.in",
  },
  {
    id: "General Secretary",
    name: "Darshil Chaudhary",
    role: "General Secretary",
    domain: "Leadership",
    image: "/images/team/darshil-chaudhary-official.jpg",
    bio: "Overseeing chapter communications, documentation, official IEEE reporting, and student council governance coordination.",
    yearAndBranch: "B.Tech ECE, 2nd Year",
    linkedin: "https://linkedin.com/in/placeholder-secretary",
    email: "secretary.wie@bennett.edu.in",
  },
  //   {
  //     id: "treasurer",
  //     name: "Pooja Singhal", // [PLACEHOLDER - Replace with actual Treasurer Name]
  //     role: "Treasurer",
  //     domain: "Leadership",
  //     image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=800&auto=format&fit=crop",
  //     bio: "Managing chapter budgets, sponsorships, financial forecasting, and logistics allocation for large-scale campus events.",
  //     yearAndBranch: "B.Tech CSE, 3rd Year",
  //     linkedin: "https://linkedin.com/in/placeholder-treasurer",
  //     email: "treasurer.wie@bennett.edu.in",
  //   },
  //   {
  //     id: "technical-head",
  //     name: "Meera Nair", // [PLACEHOLDER - Replace with actual Technical Head Name]
  //     role: "Technical Head",
  //     domain: "Technical",
  //     image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800&auto=format&fit=crop",
  //     bio: "Architecting chapter web platforms, leading open-source project initiatives, and mentoring students in cutting-edge full-stack and AI stacks.",
  //     yearAndBranch: "B.Tech CSE, 3rd Year",
  //     linkedin: "https://linkedin.com/in/placeholder-techhead",
  //     github: "https://github.com/placeholder-techhead",
  //     email: "tech.wie@bennett.edu.in",
  //   },
  //   {
  //     id: "technical-sub-head",
  //     name: "Isha Patel", // [PLACEHOLDER - Replace with actual Technical Sub-Head Name]
  //     role: "Technical Sub-Head",
  //     domain: "Technical",
  //     image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
  //     bio: "Facilitating hands-on coding bootcamps, code reviews, algorithmic training, and competitive programming hackathon preparation.",
  //     yearAndBranch: "B.Tech CSE, 2nd Year",
  //     linkedin: "https://linkedin.com/in/placeholder-techsubhead",
  //     github: "https://github.com/placeholder-techsubhead",
  //     email: "techsub.wie@bennett.edu.in",
  //   },
  //   {
  //     id: "events-head",
  //     name: "Sanya Kapoor", // [PLACEHOLDER - Replace with actual Events Head Name]
  //     role: "Events Head",
  //     domain: "Events",
  //     image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
  //     bio: "Directing high-energy university hackathons, guest panels, corporate tech tours, and inter-college symposiums.",
  //     yearAndBranch: "B.Tech Biotech, 3rd Year",
  //     linkedin: "https://linkedin.com/in/placeholder-eventshead",
  //     email: "events.wie@bennett.edu.in",
  //   },
  //   {
  //     id: "events-sub-head",
  //     name: "Ananya Dixit", // [PLACEHOLDER - Replace with actual Events Sub-Head Name]
  //     role: "Events Sub-Head",
  //     domain: "Events",
  //     image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop",
  //     bio: "Coordinating venue logistics, guest speaker liaison, and seamless participant journeys for all on-ground and hybrid sessions.",
  //     yearAndBranch: "B.Tech CSE, 2nd Year",
  //     linkedin: "https://linkedin.com/in/placeholder-eventssubhead",
  //     email: "eventssub.wie@bennett.edu.in",
  //   },
  //   {
  //     id: "pr-marketing-head",
  //     name: "Diya Roy", // [PLACEHOLDER - Replace with actual PR/Marketing Head Name]
  //     role: "PR & Marketing Head",
  //     domain: "PR & Marketing",
  //     image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
  //     bio: "Crafting impactful campus outreach campaigns, managing media relations, brand identity, and sponsor communications.",
  //     yearAndBranch: "B.Tech CSE, 3rd Year",
  //     linkedin: "https://linkedin.com/in/placeholder-prhead",
  //     email: "pr.wie@bennett.edu.in",
  //   },
  //   {
  //     id: "design-head",
  //     name: "Kavya Menon", // [PLACEHOLDER - Replace with actual Design Head Name]
  //     role: "Design Head",
  //     domain: "Design",
  //     image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800&auto=format&fit=crop",
  //     bio: "Shaping the visual language of IEEE WIE BU through aesthetic UI/UX, motion graphics, and distinctive event visual systems.",
  //     yearAndBranch: "B.Des / B.Tech, 3rd Year",
  //     linkedin: "https://linkedin.com/in/placeholder-designhead",
  //     github: "https://github.com/placeholder-designhead",
  //     email: "design.wie@bennett.edu.in",
  //   },
  //   {
  //     id: "content-head",
  //     name: "Prisha Joshi", // [PLACEHOLDER - Replace with actual Content Head Name]
  //     role: "Content Head",
  //     domain: "Content & Media",
  //     image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
  //     bio: "Authoring technical newsletters, event narratives, medium articles, and thought leadership pieces celebrating women in tech.",
  //     yearAndBranch: "B.Tech CSE, 2nd Year",
  //     linkedin: "https://linkedin.com/in/placeholder-contenthead",
  //     email: "content.wie@bennett.edu.in",
  //   },
  //   {
  //     id: "research-head",
  //     name: "Drishi Bansal", // [PLACEHOLDER - Replace with actual Research Head Name]
  //     role: "Research Head",
  //     domain: "Technical",
  //     image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  //     bio: "Mentoring undergraduate paper publications, patent ideation, and IEEE Explore research paper discussions.",
  //     yearAndBranch: "B.Tech CSE, 4th Year",
  //     linkedin: "https://linkedin.com/in/placeholder-researchhead",
  //     github: "https://github.com/placeholder-researchhead",
  //     email: "research.wie@bennett.edu.in",
  //   },
];

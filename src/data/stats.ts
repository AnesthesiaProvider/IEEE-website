import { ImpactStat } from "@/lib/types";

/**
 * IEEE WIE Bennett University - Impact & Growth Statistics
 * 
 * Future Tech Heads / Leads: Update the values below to automatically reflect
 * on the home page and throughout the website.
 */
export const impactStats: ImpactStat[] = [
  {
    id: "members",
    numericValue: 120,
    suffix: "+",
    label: "Active Members",
    description: "Passionate engineers, developers, and designers across all years at Bennett University.",
    iconName: "Users",
  },
  {
    id: "events",
    numericValue: 24,
    suffix: "+",
    label: "Events Conducted",
    description: "From national hackathons and ideathons to specialized technical symposiums.",
    iconName: "Calendar",
  },
  {
    id: "workshops",
    numericValue: 15,
    suffix: "+",
    label: "Hands-on Workshops",
    description: "Practical deep-dives into AI/ML, Web3, Cloud, UI/UX, and embedded hardware.",
    iconName: "Terminal",
  },
  {
    id: "projects",
    numericValue: 50,
    suffix: "+",
    label: "Projects & Activities",
    description: "Collaborative open-source builds, research initiatives, and community mentorships.",
    iconName: "Rocket",
  },
];

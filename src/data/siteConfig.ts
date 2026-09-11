import { SiteConfig } from "@/lib/types";

/**
 * IEEE WIE Bennett University - Site Configuration
 * 
 * Future Tech Heads / Leads: Update this file to modify global site metadata,
 * chapter links, official contact info, and navigation items.
 */
export const siteConfig: SiteConfig = {
  chapterName: "IEEE Women in Engineering",
  institutionName: "Bennett University",
  tagline: "Empowering Women. Engineering the Future.",
  missionStatement:
    "IEEE Women in Engineering at Bennett University is a community of innovators, creators, leaders, and future engineers working together to learn, build, and inspire.",
  aboutText:
    "IEEE Women in Engineering is a global community dedicated to inspiring and empowering women in engineering and technology. At Bennett University, we bring this vision to campus through technical events, workshops, leadership opportunities, collaborative projects, networking, and a community that encourages students to build fearlessly.",
  socials: {
    // REPLACE WITH OFFICIAL CHAPTER HANDLES WHEN ACTIVE
    instagram: "https://instagram.com/ieeewie_bu",
    linkedin: "https://linkedin.com/company/ieee-wie-bennett-university",
    github: "https://github.com/ieee-wie-bu",
    email: "wie.ieee@bennett.edu.in",
    whatsappCommunity: "https://chat.whatsapp.com/sample-wie-bu-community",
  },
  navigation: [
    { name: "Home", href: "/" },
    { name: "Team", href: "/team" },
    { name: "Events", href: "/events" },
    { name: "Community", href: "/join" },
  ],
};

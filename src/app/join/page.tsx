"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Code,
  Users2,
  Trophy,
  Briefcase,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Globe2,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

const benefits = [
  {
    title: "Technical Workshops",
    description:
      "Priority access to hands-on bootcamps in AI/ML, Cloud Architecture, Fullstack Development, and Hardware IoT.",
    icon: <Code className="w-6 h-6 text-[#C75491]" />,
    gradient: "from-[#7A1833]/25 to-transparent",
  },
  {
    title: "Global Networking",
    description:
      "Connect with IEEE WIE sections internationally and collaborate with visionary women engineers across universities.",
    icon: <Globe2 className="w-6 h-6 text-[#914B91]" />,
    gradient: "from-[#632C70]/25 to-transparent",
  },
  {
    title: "Leadership Opportunities",
    description:
      "Take charge of national event logistics, lead technical projects, and manage dynamic multi-disciplinary teams.",
    icon: <Trophy className="w-6 h-6 text-[#E07AB0]" />,
    gradient: "from-[#8F2450]/25 to-transparent",
  },
  {
    title: "Collaborative Projects",
    description:
      "Build real-world open-source software, patent-oriented research systems, and enter national innovation challenges.",
    icon: <Lightbulb className="w-6 h-6 text-[#D05A9E]" />,
    gradient: "from-[#5A1025]/25 to-transparent",
  },
  {
    title: "Competitions & Hackathons",
    description:
      "Exclusive squad formations for national hackathons, Smart India Hackathon, and IEEE international student paper contests.",
    icon: <Briefcase className="w-6 h-6 text-[#B74783]" />,
    gradient: "from-[#4B235C]/25 to-transparent",
  },
  {
    title: "1-on-1 Mentorship",
    description:
      "Senior-to-junior guidance on cracking top engineering internships, resume building, and research paper publication.",
    icon: <GraduationCap className="w-6 h-6 text-[#914B91]" />,
    gradient: "from-[#7B3F8C]/25 to-transparent",
  },
  {
    title: "Industry Exposure",
    description:
      "Direct interactions with engineering directors and founders during tech talks, AMA sessions, and campus visits.",
    icon: <HeartHandshake className="w-6 h-6 text-[#C75491]" />,
    gradient: "from-[#7A1833]/25 to-transparent",
  },
  {
    title: "Vibrant Community",
    description:
      "An inclusive, supportive, and energized culture where curiosity is celebrated and every student can thrive.",
    icon: <Users2 className="w-6 h-6 text-[#E07AB0]" />,
    gradient: "from-[#8F2450]/25 to-transparent",
  },
];

export default function JoinCommunityPage() {
  return (
    <div className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Ambient glows */}
      <div className="glow-orb-wine w-96 h-96 top-10 -left-20" />
      <div className="glow-orb-purple w-96 h-96 top-96 -right-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#18131B] border border-[#39283D] text-xs font-semibold text-[#C75491] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#D05A9E]" />
            <span>Inclusive Engineering Ecosystem</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F5F1F5] tracking-tight">
            Be Part of the Community
          </h1>

          <p className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-[#F5F1F5] via-[#E07AB0] to-[#914B91] bg-clip-text text-transparent">
            Learn. Build. Lead. Inspire.
          </p>

          <p className="text-[#D8D0DA] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Joining IEEE WIE Bennett University connects you with fellow builders, researchers, and mentors who celebrate innovation and cultivate leadership.
          </p>
        </div>

        {/* 8 Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="group relative rounded-2xl bg-[#121015]/90 border border-[#2A202D] backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#5C2948] hover:shadow-[0_12px_30px_-10px_rgba(122,24,51,0.2)]"
            >
              <div
                className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl ${benefit.gradient} rounded-tr-2xl pointer-events-none opacity-40`}
              />
              <div className="w-12 h-12 rounded-xl bg-[#18131B] border border-[#2A202D] flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-[#F5F1F5] mb-2 group-hover:text-[#E07AB0] transition-colors">
                {benefit.title}
              </h3>
              <p className="text-sm text-[#A79EAB] leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Two Membership Pathways */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Pathway 1: General Community Member */}
          <div className="rounded-3xl bg-[#121015]/90 border border-[#2A202D] backdrop-blur-xl p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D05A9E] bg-[#18131B] px-3 py-1 rounded-full border border-[#39283D]">
                Open to All Bennett Students
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F1F5]">
                Join our Student WhatsApp / Discord Community
              </h2>
              <p className="text-[#D8D0DA] text-sm leading-relaxed">
                Stay updated with every workshop announcement, hackathon registration link, technical article, and study group. No formal interview needed.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#D8D0DA] pt-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#C75491] shrink-0" />
                  <span>Instant event reminders & registration links</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#C75491] shrink-0" />
                  <span>Hackathon team formation channel</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#C75491] shrink-0" />
                  <span>Peer study resources and technical query support</span>
                </li>
              </ul>
            </div>

            <a
              href={siteConfig.socials.whatsappCommunity}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full bg-[#18131B] hover:bg-[#2A202D] text-[#D8D0DA] hover:text-[#F5F1F5] border border-[#39283D] hover:border-[#5C2948] font-semibold text-sm flex items-center justify-center space-x-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#E07AB0]" />
              <span>Join WhatsApp Community</span>
            </a>
          </div>

          {/* Pathway 2: Junior Core Leadership Application */}
          <div className="rounded-3xl bg-gradient-to-br from-[#4A1028]/80 via-[#18131B]/95 to-[#121015] border border-[#5C2948] backdrop-blur-xl p-8 sm:p-10 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#7A1833]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E07AB0] bg-[#18131B]/90 px-3 py-1 rounded-full border border-[#5C2948]">
                Official Recruitment
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F1F5]">
                Apply for the Junior Core Team
              </h2>
              <p className="text-[#D8D0DA] text-sm leading-relaxed">
                Take an active leadership role. Join specialized departments (Technical, Events, Design, Marketing, PR, Research) and work directly alongside the Senior Core team.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#D8D0DA] pt-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#E07AB0] shrink-0" />
                  <span>Official Certificate of Contribution & Letter of Recommendation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#E07AB0] shrink-0" />
                  <span>Direct mentorship from Senior Core and Faculty Advisors</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-[#E07AB0] shrink-0" />
                  <span>Organize national hackathons and symposiums</span>
                </li>
              </ul>
            </div>

            <Link
              href="/junior-core"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#5A1025] via-[#8F2450] to-[#7B3F8C] hover:from-[#7A1833] hover:to-[#914B91] text-[#F5F1F5] font-semibold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-[#7A1833]/35 transition-all hover:scale-[1.02] relative z-10"
            >
              <Sparkles className="w-4 h-4 text-[#E07AB0]" />
              <span>Apply for Junior Core Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

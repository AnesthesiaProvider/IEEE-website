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
    icon: <Code className="w-6 h-6 text-cyan-400" />,
    gradient: "from-cyan-500/20 to-transparent",
  },
  {
    title: "Global Networking",
    description:
      "Connect with IEEE WIE sections internationally and collaborate with visionary women engineers across universities.",
    icon: <Globe2 className="w-6 h-6 text-violet-400" />,
    gradient: "from-violet-500/20 to-transparent",
  },
  {
    title: "Leadership Opportunities",
    description:
      "Take charge of national event logistics, lead technical projects, and manage dynamic multi-disciplinary teams.",
    icon: <Trophy className="w-6 h-6 text-pink-400" />,
    gradient: "from-pink-500/20 to-transparent",
  },
  {
    title: "Collaborative Projects",
    description:
      "Build real-world open-source software, patent-oriented research systems, and enter national innovation challenges.",
    icon: <Lightbulb className="w-6 h-6 text-amber-400" />,
    gradient: "from-amber-500/20 to-transparent",
  },
  {
    title: "Competitions & Hackathons",
    description:
      "Exclusive squad formations for national hackathons, Smart India Hackathon, and IEEE international student paper contests.",
    icon: <Briefcase className="w-6 h-6 text-emerald-400" />,
    gradient: "from-emerald-500/20 to-transparent",
  },
  {
    title: "1-on-1 Mentorship",
    description:
      "Senior-to-junior guidance on cracking top engineering internships, resume building, and research paper publication.",
    icon: <GraduationCap className="w-6 h-6 text-blue-400" />,
    gradient: "from-blue-500/20 to-transparent",
  },
  {
    title: "Industry Exposure",
    description:
      "Direct interactions with engineering directors and founders during tech talks, AMA sessions, and campus visits.",
    icon: <HeartHandshake className="w-6 h-6 text-purple-400" />,
    gradient: "from-purple-500/20 to-transparent",
  },
  {
    title: "Vibrant Community",
    description:
      "An inclusive, supportive, and energized culture where curiosity is celebrated and every student can thrive.",
    icon: <Users2 className="w-6 h-6 text-rose-400" />,
    gradient: "from-rose-500/20 to-transparent",
  },
];

export default function JoinCommunityPage() {
  return (
    <div className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Ambient glows */}
      <div className="glow-orb-purple w-96 h-96 top-10 -left-20" />
      <div className="glow-orb-cyan w-96 h-96 top-96 -right-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-violet-950/80 border border-violet-500/30 text-xs font-semibold text-violet-300 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <span>Inclusive Engineering Ecosystem</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Be Part of the Community
          </h1>

          <p className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-violet-400 via-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
            Learn. Build. Lead. Inspire.
          </p>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
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
              className="group relative rounded-2xl bg-slate-900/70 border border-white/8 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-500/40 hover:shadow-xl"
            >
              <div
                className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl ${benefit.gradient} rounded-tr-2xl pointer-events-none opacity-40`}
              />
              <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-white/10 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Two Membership Pathways */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Pathway 1: General Community Member */}
          <div className="rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-500/30">
                Open to All Bennett Students
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Join our Student WhatsApp / Discord Community
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Stay updated with every workshop announcement, hackathon registration link, technical article, and study group. No formal interview needed.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 pt-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Instant event reminders & registration links</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Hackathon team formation channel</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Peer study resources and technical query support</span>
                </li>
              </ul>
            </div>

            <a
              href={siteConfig.socials.whatsappCommunity}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-cyan-500/30 font-semibold text-sm flex items-center justify-center space-x-2 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Join WhatsApp Community</span>
            </a>
          </div>

          {/* Pathway 2: Junior Core Leadership Application */}
          <div className="rounded-3xl bg-gradient-to-br from-violet-950/70 via-slate-900/90 to-slate-900 border border-violet-500/40 backdrop-blur-xl p-8 sm:p-10 flex flex-col justify-between space-y-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-300 bg-violet-950/80 px-3 py-1 rounded-full border border-violet-500/40">
                Official Recruitment
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Apply for the Junior Core Team
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Take an active leadership role. Join specialized departments (Technical, Events, Design, Marketing, PR, Research) and work directly alongside the Senior Core team.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 pt-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Official Certificate of Contribution & Letter of Recommendation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Direct mentorship from Senior Core and Faculty Advisors</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>Organize national hackathons and symposiums</span>
                </li>
              </ul>
            </div>

            <Link
              href="/junior-core"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-violet-600/30 transition-all hover:scale-[1.02] relative z-10"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>Apply for Junior Core Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Code2,
  BookOpen,
  Crown,
  Share2,
  Users,
  Calendar,
  Terminal,
  Rocket,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { FuturisticHeroCanvas } from "@/components/ui/FuturisticHeroCanvas";
import { StatCounter } from "@/components/ui/StatCounter";
import { TeamCard } from "@/components/team/TeamCard";
import { EventCard } from "@/components/events/EventCard";
import { seniorCoreTeam } from "@/data/team";
import { chapterEvents } from "@/data/events";
import { impactStats } from "@/data/stats";

const statIconMap: Record<string, React.ReactNode> = {
  Users: <Users className="w-5 h-5 text-[#D05A9E]" />,
  Calendar: <Calendar className="w-5 h-5 text-[#914B91]" />,
  Terminal: <Terminal className="w-5 h-5 text-[#C75491]" />,
  Rocket: <Rocket className="w-5 h-5 text-[#E07AB0]" />,
};

const aboutPillars = [
  {
    title: "Innovate",
    description:
      "Explore emerging technologies, build meaningful solutions, and turn conceptual blueprints into deployed systems.",
    icon: <Code2 className="w-6 h-6 text-[#D05A9E]" />,
    gradient: "from-[#7A1833]/20 to-transparent",
    border: "group-hover:border-[#5C2948]",
  },
  {
    title: "Learn",
    description:
      "Participate in cutting-edge bootcamps, technical masterclasses, and hands-on experiences across AI, Web3, and IoT.",
    icon: <BookOpen className="w-6 h-6 text-[#914B91]" />,
    gradient: "from-[#632C70]/20 to-transparent",
    border: "group-hover:border-[#632C70]",
  },
  {
    title: "Lead",
    description:
      "Develop executive leadership, project management, and public speaking skills while steering campus-wide technical events.",
    icon: <Crown className="w-6 h-6 text-[#C75491]" />,
    gradient: "from-[#8F2450]/20 to-transparent",
    border: "group-hover:border-[#8F2450]",
  },
  {
    title: "Connect",
    description:
      "Build enduring relationships with fellow students, faculty, research mentors, and distinguished female industry leaders.",
    icon: <Share2 className="w-6 h-6 text-[#E07AB0]" />,
    gradient: "from-[#4B235C]/20 to-transparent",
    border: "group-hover:border-[#7B3F8C]",
  },
];

export default function HomePage() {
  const previewTeam = seniorCoreTeam.slice(0, 4);
  const previewEvents = chapterEvents.filter((e) => e.status === "upcoming").slice(0, 3);

  return (
    <div className="relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="glow-orb-wine w-96 h-96 top-20 -left-20" />
      <div className="glow-orb-purple w-[450px] h-[450px] top-80 -right-20" />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 lg:pt-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Typography & CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#18131B] border border-[#39283D] text-xs font-semibold text-[#C75491] backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#D05A9E] animate-pulse" />
                <span>IEEE WIE • Bennett University</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#F5F1F5] leading-[1.1]">
                Empowering Women. <br />
                <span className="bg-gradient-to-r from-[#F5F1F5] via-[#E07AB0] to-[#914B91] bg-clip-text text-transparent">
                  Engineering the Future.
                </span>
              </h1>

              {/* Supporting Description */}
              <p className="text-base sm:text-lg text-[#D8D0DA] max-w-2xl leading-relaxed">
                IEEE Women in Engineering at Bennett University is a community of innovators, creators, leaders, and future engineers working together to learn, build, and inspire.
              </p>

              {/* Key Bullet Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-sm text-[#D8D0DA]">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C75491] shrink-0" />
                  <span>National Hackathons & Tech Conferences</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#914B91] shrink-0" />
                  <span>Industry Mentorship & Research Circles</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/junior-core"
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#5A1025] via-[#7A1833] via-[#8F2450] to-[#7B3F8C] hover:from-[#7A1833] hover:to-[#914B91] text-[#F5F1F5] font-semibold text-sm shadow-xl shadow-[#7A1833]/30 flex items-center space-x-2 transition-all duration-300 hover:scale-[1.03]"
                >
                  <Sparkles className="w-4 h-4 text-[#E07AB0]" />
                  <span>Join Junior Core</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/events"
                  className="px-7 py-3.5 rounded-full bg-[#121015] hover:bg-[#18131B] text-[#D8D0DA] hover:text-[#F5F1F5] font-semibold text-sm border border-[#2A202D] hover:border-[#5C2948] backdrop-blur-md transition-all duration-300 flex items-center space-x-2"
                >
                  <span>Explore Events</span>
                  <ChevronRight className="w-4 h-4 text-[#A79EAB]" />
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Futuristic Connected Node Canvas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative"
            >
              <FuturisticHeroCanvas />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ABOUT IEEE WIE SECTION                                                 */}
      {/* ========================================================================= */}
      <section className="relative py-20 bg-[#121015]/40 border-y border-[#2A202D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C75491] bg-[#18131B] px-3 py-1 rounded-full border border-[#39283D]">
              Our Vision & Community
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F1F5] tracking-tight">
              Where Ideas Become Impact.
            </h2>
            <p className="text-[#D8D0DA] text-base sm:text-lg leading-relaxed">
              IEEE Women in Engineering is a global community dedicated to inspiring and empowering women in engineering and technology. At Bennett University, we bring this vision to campus through technical events, workshops, leadership opportunities, collaborative projects, networking, and a community that encourages students to build fearlessly.
            </p>
          </div>

          {/* 4 Interactive Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutPillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`group relative rounded-2xl bg-[#121015]/90 border border-[#2A202D] backdrop-blur-xl p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${pillar.border}`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${pillar.gradient} rounded-tr-2xl pointer-events-none opacity-60`} />

                <div className="w-12 h-12 rounded-xl bg-[#18131B] border border-[#2A202D] flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {pillar.icon}
                </div>

                <h3 className="text-xl font-bold text-[#F5F1F5] mb-2 group-hover:text-[#E07AB0] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#A79EAB] leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. IMPACT & STATISTICS SECTION                                            */}
      {/* ========================================================================= */}
      <section className="relative py-16 bg-gradient-to-b from-[#0D0B0F] via-[#121015] to-[#0D0B0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-[#18131B]/80 border border-[#39283D] backdrop-blur-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
            
            {/* Radiant glow accent */}
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-[#7A1833]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F5F1F5]">
                Our Growing Impact at Bennett University
              </h2>
              <p className="text-sm text-[#A79EAB] mt-1">
                Fostering an ecosystem where future engineering leaders thrive.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#2A202D]">
              {impactStats.map((stat) => (
                <div key={stat.id} className="pt-6 sm:pt-0 sm:px-6 text-center space-y-2">
                  <div className="flex justify-center mb-2">
                    <div className="p-2.5 rounded-xl bg-[#121015] border border-[#2A202D]">
                      {statIconMap[stat.iconName]}
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-[#F5F1F5] via-[#E07AB0] to-[#C75491] bg-clip-text text-transparent">
                    <StatCounter value={stat.numericValue} suffix={stat.suffix} />
                  </div>
                  <h4 className="text-sm font-semibold text-[#F5F1F5] tracking-wide">
                    {stat.label}
                  </h4>
                  <p className="text-xs text-[#A79EAB] hidden sm:block max-w-[200px] mx-auto leading-normal">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SENIOR CORE PREVIEW SECTION                                            */}
      {/* ========================================================================= */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C75491] bg-[#18131B] px-3 py-1 rounded-full border border-[#39283D]">
                Leadership
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F1F5] mt-2">
                Meet the Senior Core Team
              </h2>
              <p className="text-sm sm:text-base text-[#A79EAB] mt-1">
                The people building the next generation of IEEE WIE at Bennett University.
              </p>
            </div>

            <Link
              href="/team"
              className="inline-flex items-center space-x-2 text-sm font-semibold text-[#D05A9E] hover:text-[#E07AB0] transition-colors group self-start md:self-auto"
            >
              <span>Meet the Full Team</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewTeam.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. UPCOMING EVENTS PREVIEW                                                */}
      {/* ========================================================================= */}
      <section className="relative py-20 bg-[#121015]/50 border-t border-[#2A202D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C75491] bg-[#18131B] px-3 py-1 rounded-full border border-[#39283D]">
                What&apos;s Happening
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F1F5] mt-2">
                Upcoming Events & Hackathons
              </h2>
              <p className="text-sm sm:text-base text-[#A79EAB] mt-1">
                Deepen your engineering acumen through high-octane competitions and workshops.
              </p>
            </div>

            <Link
              href="/events"
              className="inline-flex items-center space-x-2 text-sm font-semibold text-[#D05A9E] hover:text-[#E07AB0] transition-colors group self-start md:self-auto"
            >
              <span>View All Events</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. HIGH-IMPACT JOIN COMMUNITY BANNER                                      */}
      {/* ========================================================================= */}
      <section className="relative py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#4A1028]/80 via-[#18131B]/95 to-[#121015] border border-[#5C2948] p-8 sm:p-14 text-center space-y-6 shadow-2xl">
            
            {/* Abstract decorative rings */}
            <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#7A1833]/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#632C70]/20 blur-3xl pointer-events-none" />

            <span className="relative z-10 inline-block text-xs font-bold uppercase tracking-widest text-[#E07AB0] bg-[#18131B]/80 px-3 py-1 rounded-full border border-[#5C2948]">
              Your Next Step
            </span>

            <h2 className="relative z-10 text-3xl sm:text-5xl font-extrabold text-[#F5F1F5] tracking-tight max-w-2xl mx-auto">
              Your Ideas Belong Here.
            </h2>

            <p className="relative z-10 text-base sm:text-lg text-[#D8D0DA] max-w-2xl mx-auto leading-relaxed">
              Whether you build, design, organize, research, create, or simply want to learn — there&apos;s a place for you in IEEE WIE.
            </p>

            <div className="relative z-10 pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/join"
                className="px-8 py-3.5 rounded-full bg-[#121015] hover:bg-[#18131B] text-[#F5F1F5] font-semibold text-sm border border-[#39283D] hover:border-[#5C2948] transition-all shadow-lg"
              >
                Join the Community
              </Link>
              <Link
                href="/junior-core"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#5A1025] via-[#8F2450] to-[#7B3F8C] hover:from-[#7A1833] hover:to-[#914B91] text-[#F5F1F5] font-semibold text-sm shadow-xl shadow-[#7A1833]/35 flex items-center space-x-2 transition-all hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-[#E07AB0]" />
                <span>Apply for Junior Core</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

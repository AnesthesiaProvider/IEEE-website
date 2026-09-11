import React from "react";
import Link from "next/link";
import { Mail, Heart, Sparkles } from "lucide-react";
import { InstagramIcon, LinkedinIcon, GithubIcon } from "@/components/ui/SocialIcons";
import { siteConfig } from "@/data/siteConfig";

export function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-[#05070D] text-slate-400 overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-violet-600/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand & Mission Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-[1.5px]">
                <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center font-bold text-xs text-white">
                  WIE
                </div>
              </div>
              <div>
                <h4 className="font-bold text-base text-white tracking-tight">
                  IEEE Women in Engineering
                </h4>
                <p className="text-xs text-violet-400 font-medium">
                  Bennett University Student Affinity Group
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Empowering women in engineering and technology across Bennett University through hands-on technical workshops, competitive hackathons, research publications, and an inspiring peer network.
            </p>

            {/* Social Icons */}
            <div className="pt-2 flex items-center space-x-3">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IEEE WIE BU Instagram"
                className="p-2.5 rounded-xl bg-slate-900/80 border border-white/8 text-slate-400 hover:text-pink-400 hover:border-pink-500/30 transition-all hover:scale-105"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IEEE WIE BU LinkedIn"
                className="p-2.5 rounded-xl bg-slate-900/80 border border-white/8 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all hover:scale-105"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IEEE WIE BU GitHub"
                className="p-2.5 rounded-xl bg-slate-900/80 border border-white/8 text-slate-400 hover:text-violet-400 hover:border-violet-500/30 transition-all hover:scale-105"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteConfig.socials.email}`}
                aria-label="Email IEEE WIE BU"
                className="p-2.5 rounded-xl bg-slate-900/80 border border-white/8 text-slate-400 hover:text-white hover:border-white/20 transition-all hover:scale-105"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h5 className="font-semibold text-sm text-white uppercase tracking-wider mb-4">
              Explore
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-cyan-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-cyan-300 transition-colors">
                  Senior Core Team
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-cyan-300 transition-colors">
                  Events & Hackathons
                </Link>
              </li>
              <li>
                <Link href="/join" className="hover:text-cyan-300 transition-colors">
                  Join Community
                </Link>
              </li>
              <li>
                <Link
                  href="/junior-core"
                  className="text-violet-400 hover:text-violet-300 font-medium flex items-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Join Junior Core</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Location & University Information */}
          <div>
            <h5 className="font-semibold text-sm text-white uppercase tracking-wider mb-4">
              Campus Chapter
            </h5>
            <div className="space-y-2 text-sm text-slate-400">
              <p className="font-medium text-slate-300">Bennett University</p>
              <p>Plot Nos 8-11, TechZone II</p>
              <p>Greater Noida, Uttar Pradesh 201310</p>
              <p className="pt-2 text-xs text-slate-500">
                Official student affinity group affiliated with IEEE UP Section.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            &copy; 2026 IEEE WIE Bennett University. All rights reserved.
          </p>
          <div className="flex items-center space-x-1">
            <span>Engineered with passion by</span>
            <span className="text-violet-400 font-medium">IEEE WIE BU Technical Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

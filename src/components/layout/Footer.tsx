import React from "react";
import Link from "next/link";
import { Mail, Heart, Sparkles } from "lucide-react";
import { InstagramIcon, LinkedinIcon, GithubIcon } from "@/components/ui/SocialIcons";
import { siteConfig } from "@/data/siteConfig";

export function Footer() {
  return (
    <footer className="relative border-t border-[#231B32] bg-[#0A0C15] text-[#797380] overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#712EB7]/15 via-[#34224E]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand & Mission Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#34224E] via-[#712EB7] to-[#D88CF5] p-[1.5px]">
                <div className="w-full h-full rounded-[10px] bg-[#0A0C15] flex items-center justify-center font-bold text-xs text-[#FAF8FD]">
                  WIE
                </div>
              </div>
              <div>
                <h4 className="font-bold text-base text-[#FAF8FD] tracking-tight">
                  IEEE Women in Engineering
                </h4>
                <p className="text-xs text-[#D88CF5] font-medium">
                  Bennett University Student Affinity Group
                </p>
              </div>
            </div>

            <p className="text-sm text-[#797380] max-w-md leading-relaxed">
              Empowering women in engineering and technology across Bennett University through hands-on technical workshops, competitive hackathons, research publications, and an inspiring peer network.
            </p>

            {/* Social Icons */}
            <div className="pt-2 flex items-center space-x-3">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IEEE WIE BU Instagram"
                className="p-2.5 rounded-xl bg-[#120E1C] border border-[#231B32] text-[#CAC4D1] hover:text-[#D88CF5] hover:border-[#D88CF5]/40 transition-all hover:scale-105"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IEEE WIE BU LinkedIn"
                className="p-2.5 rounded-xl bg-[#120E1C] border border-[#231B32] text-[#CAC4D1] hover:text-[#D88CF5] hover:border-[#D88CF5]/40 transition-all hover:scale-105"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="IEEE WIE BU GitHub"
                className="p-2.5 rounded-xl bg-[#120E1C] border border-[#231B32] text-[#CAC4D1] hover:text-[#D88CF5] hover:border-[#D88CF5]/40 transition-all hover:scale-105"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteConfig.socials.email}`}
                aria-label="Email IEEE WIE BU"
                className="p-2.5 rounded-xl bg-[#120E1C] border border-[#231B32] text-[#CAC4D1] hover:text-[#FAF8FD] hover:border-[#4B326D] transition-all hover:scale-105"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h5 className="font-semibold text-sm text-[#FAF8FD] uppercase tracking-wider mb-4">
              Explore
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-[#CAC4D1] hover:text-[#D88CF5] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-[#CAC4D1] hover:text-[#D88CF5] transition-colors">
                  Senior Core Team
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-[#CAC4D1] hover:text-[#D88CF5] transition-colors">
                  Events & Hackathons
                </Link>
              </li>
              <li>
                <Link href="/join" className="text-[#CAC4D1] hover:text-[#D88CF5] transition-colors">
                  Join Community
                </Link>
              </li>
              <li>
                <Link
                  href="/junior-core"
                  className="text-[#712EB7] hover:text-[#D88CF5] font-medium flex items-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Join Junior Core</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Location & University Information */}
          <div>
            <h5 className="font-semibold text-sm text-[#FAF8FD] uppercase tracking-wider mb-4">
              Campus Chapter
            </h5>
            <div className="space-y-2 text-sm text-[#797380]">
              <p className="font-medium text-[#FAF8FD]">Bennett University</p>
              <p>Plot Nos 8-11, TechZone II</p>
              <p>Greater Noida, Uttar Pradesh 201310</p>
              <p className="pt-2 text-xs text-[#797380]">
                Official student affinity group affiliated with IEEE UP Section.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-8 border-t border-[#231B32] flex flex-col sm:flex-row items-center justify-between text-xs text-[#797380] gap-4">
          <p>
            &copy; 2026 IEEE WIE Bennett University. All rights reserved.
          </p>
          <div className="flex items-center space-x-1">
            <span>Engineered with passion by</span>
            <span className="text-[#D88CF5] font-medium">IEEE WIE BU Technical Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Mail, Sparkles, ExternalLink } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/ui/SocialIcons";
import { TeamMember } from "@/lib/types";
import { Modal } from "@/components/ui/Modal";

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group relative cursor-pointer rounded-2xl p-[1px] transition-all duration-300 hover:-translate-y-1.5 focus:outline-none"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
        aria-label={`View profile of ${member.name}, ${member.role}`}
      >
        {/* Animated Gradient Glow Border on Hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#7A1833]/0 via-[#632C70]/0 to-[#D05A9E]/0 opacity-0 transition-opacity duration-300 group-hover:from-[#7A1833]/30 group-hover:via-[#8F2450]/20 group-hover:to-[#632C70]/30 group-hover:opacity-100 blur-sm" />

        {/* Card Content Container */}
        <div className="relative h-full flex flex-col justify-between rounded-2xl bg-[#121015]/90 border border-[#2A202D] backdrop-blur-xl p-6 transition-all duration-300 group-hover:border-[#5C2948] group-hover:shadow-[0_10px_30px_-10px_rgba(122,24,51,0.25)]">
          <div>
            {/* Profile Avatar Frame */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-5 bg-[#18131B] border border-[#2A202D]">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0B0F]/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              
              {/* Domain Badge */}
              <div className="absolute top-3 left-3 bg-[#0D0B0F]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#39283D] text-[11px] font-medium text-[#D8D0DA]">
                {member.domain}
              </div>
            </div>

            {/* Role & Name */}
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#C75491]">
                {member.role}
              </p>
              <h3 className="text-xl font-bold text-[#F5F1F5] group-hover:text-[#E07AB0] transition-colors">
                {member.name}
              </h3>
              <p className="text-xs text-[#A79EAB] font-medium">
                {member.yearAndBranch}
              </p>
            </div>

            {/* Short Bio */}
            <p className="mt-3 text-sm text-[#D8D0DA] line-clamp-2 leading-relaxed">
              {member.bio}
            </p>
          </div>

          {/* Card Footer: Socials & Profile Action */}
          <div className="mt-5 pt-4 border-t border-[#2A202D] flex items-center justify-between">
            <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name}'s LinkedIn`}
                  className="p-2 text-[#A79EAB] hover:text-[#D05A9E] hover:bg-white/5 rounded-lg transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name}'s GitHub`}
                  className="p-2 text-[#A79EAB] hover:text-[#C75491] hover:bg-white/5 rounded-lg transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  aria-label={`Email ${member.name}`}
                  className="p-2 text-[#A79EAB] hover:text-[#E07AB0] hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>

            <span className="inline-flex items-center text-xs font-medium text-[#A79EAB] group-hover:text-[#E07AB0] transition-colors">
              Bio
              <ExternalLink className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Member Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Team Member Profile"
      >
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shrink-0 border border-[#5C2948]">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-top"
            />
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#E07AB0] bg-[#4A1028]/60 px-2.5 py-0.5 rounded-full border border-[#5C2948] mb-1.5">
                {member.role}
              </span>
              <h3 className="text-2xl font-bold text-[#F5F1F5]">{member.name}</h3>
              <p className="text-sm text-[#D05A9E]">{member.yearAndBranch} • Bennett University</p>
            </div>

            <p className="text-sm text-[#D8D0DA] leading-relaxed">{member.bio}</p>

            <div className="pt-2 flex items-center space-x-3">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#4B235C]/30 text-[#D8D0DA] border border-[#632C70] text-xs font-medium hover:bg-[#632C70]/40 hover:text-[#F5F1F5] transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#18131B] text-[#D8D0DA] border border-[#39283D] text-xs font-medium hover:bg-[#2A202D] hover:text-[#F5F1F5] transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#7A1833]/30 text-[#E07AB0] border border-[#8F2450] text-xs font-medium hover:bg-[#8F2450]/40 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

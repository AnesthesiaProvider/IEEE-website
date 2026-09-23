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
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#712EB7]/0 via-[#664BA3]/0 to-[#D88CF5]/0 opacity-0 transition-opacity duration-300 group-hover:from-[#712EB7]/30 group-hover:via-[#664BA3]/20 group-hover:to-[#D88CF5]/30 group-hover:opacity-100 blur-sm" />

        {/* Card Content Container */}
        <div className="relative h-full flex flex-col justify-between rounded-2xl bg-[#120E1C]/90 border border-[#231B32] backdrop-blur-xl p-6 transition-all duration-300 group-hover:border-[#664BA3] group-hover:shadow-[0_10px_30px_-10px_rgba(113,46,183,0.3)]">
          <div>
            {/* Profile Avatar Frame */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-5 bg-[#1A1428] border border-[#231B32]">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C15]/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              
              {/* Domain Badge */}
              <div className="absolute top-3 left-3 bg-[#0A0C15]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#34224E] text-[11px] font-medium text-[#CAC4D1]">
                {member.domain}
              </div>
            </div>

            {/* Role & Name */}
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#D88CF5]">
                {member.role}
              </p>
              <h3 className="text-xl font-bold text-[#FAF8FD] group-hover:text-[#D88CF5] transition-colors">
                {member.name}
              </h3>
              <p className="text-xs text-[#CAC4D1] font-medium">
                {member.yearAndBranch}
              </p>
            </div>

            {/* Short Bio */}
            <p className="mt-3 text-sm text-[#FAF8FD]/80 line-clamp-2 leading-relaxed">
              {member.bio}
            </p>
          </div>

          {/* Card Footer: Socials & Profile Action */}
          <div className="mt-5 pt-4 border-t border-[#231B32] flex items-center justify-between">
            <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name}'s LinkedIn`}
                  className="p-2 text-[#CAC4D1] hover:text-[#D88CF5] hover:bg-white/5 rounded-lg transition-colors"
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
                  className="p-2 text-[#CAC4D1] hover:text-[#D88CF5] hover:bg-white/5 rounded-lg transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  aria-label={`Email ${member.name}`}
                  className="p-2 text-[#CAC4D1] hover:text-[#D88CF5] hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>

            <span className="inline-flex items-center text-xs font-medium text-[#CAC4D1] group-hover:text-[#D88CF5] transition-colors">
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
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shrink-0 border border-[#664BA3]">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-top"
            />
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#D88CF5] bg-[#34224E]/60 px-2.5 py-0.5 rounded-full border border-[#664BA3] mb-1.5">
                {member.role}
              </span>
              <h3 className="text-2xl font-bold text-[#FAF8FD]">{member.name}</h3>
              <p className="text-sm text-[#876DBF]">{member.yearAndBranch} • Bennett University</p>
            </div>

            <p className="text-sm text-[#FAF8FD]/90 leading-relaxed">{member.bio}</p>

            <div className="pt-2 flex items-center space-x-3">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#34224E]/40 text-[#FAF8FD] border border-[#664BA3] text-xs font-medium hover:bg-[#664BA3]/50 hover:text-[#FFFFFF] transition-colors"
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
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#1A1428] text-[#FAF8FD] border border-[#231B32] text-xs font-medium hover:bg-[#231B32] hover:text-[#FFFFFF] transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#712EB7]/20 text-[#D88CF5] border border-[#712EB7]/50 text-xs font-medium hover:bg-[#712EB7]/30 transition-colors"
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

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
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-600/0 via-cyan-500/0 to-fuchsia-500/0 opacity-0 transition-opacity duration-300 group-hover:from-violet-600/40 group-hover:via-cyan-500/30 group-hover:to-fuchsia-500/40 group-hover:opacity-100 blur-sm" />

        {/* Card Content Container */}
        <div className="relative h-full flex flex-col justify-between rounded-2xl bg-slate-900/85 border border-white/8 backdrop-blur-xl p-6 transition-all duration-300 group-hover:border-violet-500/40 group-hover:shadow-[0_10px_30px_-10px_rgba(139,92,246,0.3)]">
          <div>
            {/* Profile Avatar Frame */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-5 bg-slate-800 border border-white/5">
              <Image
                src={member.image}
                alt={member.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              
              {/* Domain Badge */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[11px] font-medium text-slate-300">
                {member.domain}
              </div>
            </div>

            {/* Role & Name */}
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-400">
                {member.role}
              </p>
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                {member.name}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {member.yearAndBranch}
              </p>
            </div>

            {/* Short Bio */}
            <p className="mt-3 text-sm text-slate-300 line-clamp-2 leading-relaxed">
              {member.bio}
            </p>
          </div>

          {/* Card Footer: Socials & Profile Action */}
          <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name}'s LinkedIn`}
                  className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-colors"
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
                  className="p-2 text-slate-400 hover:text-violet-400 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  aria-label={`Email ${member.name}`}
                  className="p-2 text-slate-400 hover:text-pink-400 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              )}
            </div>

            <span className="inline-flex items-center text-xs font-medium text-slate-400 group-hover:text-violet-300 transition-colors">
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
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden shrink-0 border border-violet-500/30">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-top"
            />
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-violet-400 bg-violet-950/60 px-2.5 py-0.5 rounded-full border border-violet-500/30 mb-1.5">
                {member.role}
              </span>
              <h3 className="text-2xl font-bold text-white">{member.name}</h3>
              <p className="text-sm text-cyan-300">{member.yearAndBranch} • Bennett University</p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">{member.bio}</p>

            <div className="pt-2 flex items-center space-x-3">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-300 border border-blue-500/30 text-xs font-medium hover:bg-blue-600/30 transition-colors"
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
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-white/10 text-xs font-medium hover:bg-slate-700 transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-pink-600/20 text-pink-300 border border-pink-500/30 text-xs font-medium hover:bg-pink-600/30 transition-colors"
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

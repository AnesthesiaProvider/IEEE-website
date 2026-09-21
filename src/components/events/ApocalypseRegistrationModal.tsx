"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Users,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldAlert,
  Flame,
  UserCheck,
  Send,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";

interface TeamMemberInput {
  name: string;
  enrollmentNumber: string;
  email?: string;
  phone?: string;
}

interface ApocalypseRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApocalypseRegistrationModal({
  isOpen,
  onClose,
}: ApocalypseRegistrationModalProps) {
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<TeamMemberInput[]>([
    { name: "", enrollmentNumber: "", email: "", phone: "" }, // Leader (Member 1)
    { name: "", enrollmentNumber: "" }, // Member 2
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    id: string;
    teamName: string;
    membersCount: number;
    createdAt: string;
  } | null>(null);

  // Add a member (up to max 4)
  const handleAddMember = () => {
    if (members.length < 4) {
      setMembers([...members, { name: "", enrollmentNumber: "" }]);
    }
  };

  // Remove member (down to min 2)
  const handleRemoveMember = (index: number) => {
    if (members.length > 2) {
      setMembers(members.filter((_, i) => i !== index));
      // Clear associated field errors
      const newErrors = { ...errors };
      delete newErrors[`name_${index}`];
      delete newErrors[`enroll_${index}`];
      setErrors(newErrors);
    }
  };

  const updateMember = (index: number, field: keyof TeamMemberInput, value: string) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);

    // Clear error for that field
    if (errors[`${field}_${index}`]) {
      const newErrors = { ...errors };
      delete newErrors[`${field}_${index}`];
      setErrors(newErrors);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!teamName.trim() || teamName.trim().length < 2) {
      errs.teamName = "Please provide a team name (at least 2 characters).";
    }

    if (members.length < 2) {
      errs.general = "Your team must have at least 2 members.";
    }

    if (members.length > 4) {
      errs.general = "Your team cannot exceed 4 members.";
    }

    const seenEnrolls = new Set<string>();

    members.forEach((m, idx) => {
      const isLeader = idx === 0;

      if (!m.name.trim() || m.name.trim().length < 2) {
        errs[`name_${idx}`] = "Please enter full name.";
      }

      const cleanEnroll = m.enrollmentNumber.trim().toUpperCase();
      if (!cleanEnroll || cleanEnroll.length < 5) {
        errs[`enroll_${idx}`] = "Valid enrollment number required (e.g. E23CSEU0123).";
      } else if (seenEnrolls.has(cleanEnroll)) {
        errs[`enroll_${idx}`] = "Duplicate enrollment number in this team.";
      } else {
        seenEnrolls.add(cleanEnroll);
      }

      if (isLeader) {
        if (!m.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.email.trim())) {
          errs.leaderEmail = "Leader must provide a valid email address.";
        }
        if (!m.phone?.trim() || m.phone.replace(/[^0-9]/g, "").length < 10) {
          errs.leaderPhone = "Leader must provide a valid 10-digit phone number.";
        }
      }
    });

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        teamName: teamName.trim(),
        members: members.map((m, idx) => ({
          name: m.name.trim(),
          enrollmentNumber: m.enrollmentNumber.trim().toUpperCase(),
          email: m.email?.trim() || undefined,
          phone: m.phone?.trim() || undefined,
          isLeader: idx === 0,
        })),
      };

      const res = await fetch("/api/events/apocalypse/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setSubmitError(data.error || "Failed to register team. Please check the details.");
        setIsSubmitting(false);
        return;
      }

      // Celebrate success
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#7A1833", "#C75491", "#914B91", "#E07AB0", "#FFFFFF"],
      });

      setSubmittedData({
        id: data.registration.id,
        teamName: data.registration.teamName,
        membersCount: data.registration.membersCount,
        createdAt: data.registration.createdAt,
      });
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError("Network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setTeamName("");
    setMembers([
      { name: "", enrollmentNumber: "", email: "", phone: "" },
      { name: "", enrollmentNumber: "" },
    ]);
    setErrors({});
    setSubmitError(null);
    setSubmittedData(null);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Apocalypse 2026 — Team Registration"
      maxWidth="max-w-2xl"
    >
      {submittedData ? (
        /* Confirmation Screen */
        <div className="space-y-6 py-2 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#7A1833] via-[#8F2450] to-[#C75491] p-0.5 mx-auto flex items-center justify-center shadow-lg shadow-[#7A1833]/40">
            <div className="w-full h-full bg-[#121015] rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#E07AB0]" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-[#18131B] border border-[#5C2948] text-xs font-semibold text-[#E07AB0]">
              Official Registration Confirmed
            </span>
            <h3 className="text-2xl font-bold text-[#F5F1F5]">
              Squad &quot;{submittedData.teamName}&quot; Registered!
            </h3>
            <p className="text-xs text-[#A79EAB] max-w-md mx-auto">
              Your team has been successfully entered into the official Apocalypse 2026 tournament bracket.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#121015] border border-[#2A202D] text-left text-xs space-y-2.5 max-w-md mx-auto">
            <div className="flex justify-between items-center pb-2 border-b border-[#2A202D]">
              <span className="text-[#A79EAB]">Registration ID:</span>
              <span className="font-mono text-[#E07AB0] font-bold">{submittedData.id}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-[#2A202D]">
              <span className="text-[#A79EAB]">Team Name:</span>
              <span className="font-semibold text-[#F5F1F5]">{submittedData.teamName}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-[#2A202D]">
              <span className="text-[#A79EAB]">Total Members:</span>
              <span className="font-semibold text-[#C75491]">{submittedData.membersCount} Persons</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#A79EAB]">Event Date:</span>
              <span className="font-semibold text-[#F5F1F5]">23 SEP 2026 • Bennett University</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#18131B] border border-[#39283D] text-xs text-[#D8D0DA] max-w-md mx-auto">
            <p className="flex items-center justify-center space-x-1.5 text-[#E07AB0] font-medium mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Next Steps: Event Day Briefing</span>
            </p>
            Further instructions, round timings, and rulebook will be dispatched to the Team Leader&apos;s registered email.
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#5A1025] via-[#7A1833] to-[#8F2450] hover:from-[#7A1833] hover:to-[#914B91] text-[#F5F1F5] font-semibold text-xs transition-all shadow-md shadow-[#7A1833]/30"
            >
              Done & Close
            </button>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-[#18131B] hover:bg-[#2A202D] text-[#D8D0DA] border border-[#2A202D] text-xs font-medium transition-colors"
            >
              Register Another Team
            </button>
          </div>
        </div>
      ) : (
        /* Registration Form */
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Top Banner */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#4A1028]/30 via-[#632C70]/20 to-[#121015] border border-[#5C2948]/50 flex items-center justify-between gap-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#18131B] border border-[#5C2948] flex items-center justify-center text-[#E07AB0] shrink-0">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#F5F1F5]">
                  Apocalypse Arena Team Format
                </p>
                <p className="text-[11px] text-[#A79EAB]">
                  Min 2 persons &bull; Max 4 persons per team
                </p>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-[#18131B] border border-[#39283D] text-[11px] font-semibold text-[#E07AB0] whitespace-nowrap">
              {members.length} / 4 Members
            </span>
          </div>

          {/* Submission Error Banner */}
          {submitError && (
            <div className="p-3 rounded-xl bg-[#4A1028]/50 border border-[#8F2450] text-[#E07AB0] text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{submitError}</span>
            </div>
          )}

          {errors.general && (
            <div className="p-3 rounded-xl bg-[#4A1028]/50 border border-[#8F2450] text-[#E07AB0] text-xs flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{errors.general}</span>
            </div>
          )}

          {/* Team Name Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#D8D0DA]">
              Team Name <span className="text-[#E07AB0]">*</span>
            </label>
            <input
              type="text"
              value={teamName}
              onChange={(e) => {
                setTeamName(e.target.value);
                if (errors.teamName) {
                  const newErrs = { ...errors };
                  delete newErrs.teamName;
                  setErrors(newErrs);
                }
              }}
              placeholder="e.g. CyberValkyries, ByteForce, Quantum Titans"
              className="w-full px-4 py-2.5 rounded-xl bg-[#121015] border border-[#2A202D] text-[#F5F1F5] placeholder-[#756B7A] text-xs focus:outline-none focus:border-[#C75491] focus:ring-1 focus:ring-[#C75491]"
            />
            {errors.teamName && (
              <p className="text-[11px] text-[#E07AB0]">{errors.teamName}</p>
            )}
          </div>

          {/* Dynamic Members List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#A79EAB]">
                Squad Roster ({members.length} Members)
              </h4>
              {members.length < 4 && (
                <button
                  type="button"
                  onClick={handleAddMember}
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#E07AB0] hover:text-[#F5F1F5] transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Member ({members.length + 1} of 4)</span>
                </button>
              )}
            </div>

            <div className="space-y-3.5">
              {members.map((member, idx) => {
                const isLeader = idx === 0;

                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#121015] border border-[#2A202D] space-y-3 relative group hover:border-[#39283D] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-[#18131B] border border-[#39283D] text-[11px] font-bold text-[#E07AB0] flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-[#F5F1F5]">
                          {isLeader ? "Team Leader (Member 1)" : `Team Member ${idx + 1}`}
                        </span>
                        {isLeader && (
                          <span className="px-2 py-0.5 rounded-full bg-[#4A1028]/40 border border-[#5C2948] text-[10px] text-[#E07AB0] font-semibold">
                            Primary Contact
                          </span>
                        )}
                      </div>

                      {/* Remove button (only allowed for member 3 and 4) */}
                      {!isLeader && idx >= 2 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveMember(idx)}
                          className="p-1.5 rounded-lg text-[#756B7A] hover:text-[#E07AB0] hover:bg-[#4A1028]/30 transition-colors"
                          title="Remove Member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Member Name and Enrollment Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-[#D8D0DA]">
                          Full Name <span className="text-[#E07AB0]">*</span>
                        </label>
                        <input
                          type="text"
                          value={member.name}
                          onChange={(e) => updateMember(idx, "name", e.target.value)}
                          placeholder="Student Name"
                          className="w-full px-3.5 py-2 rounded-xl bg-[#0D0B0F] border border-[#2A202D] text-[#F5F1F5] placeholder-[#756B7A] text-xs focus:outline-none focus:border-[#C75491]"
                        />
                        {errors[`name_${idx}`] && (
                          <p className="text-[10px] text-[#E07AB0]">{errors[`name_${idx}`]}</p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-[#D8D0DA]">
                          Enrollment Number <span className="text-[#E07AB0]">*</span>
                        </label>
                        <input
                          type="text"
                          value={member.enrollmentNumber}
                          onChange={(e) =>
                            updateMember(idx, "enrollmentNumber", e.target.value)
                          }
                          placeholder="e.g. E23CSEU0123"
                          className="w-full px-3.5 py-2 rounded-xl bg-[#0D0B0F] border border-[#2A202D] text-[#F5F1F5] placeholder-[#756B7A] text-xs font-mono uppercase focus:outline-none focus:border-[#C75491]"
                        />
                        {errors[`enroll_${idx}`] && (
                          <p className="text-[10px] text-[#E07AB0]">{errors[`enroll_${idx}`]}</p>
                        )}
                      </div>
                    </div>

                    {/* Leader Contact Details (Email & Phone) */}
                    {isLeader && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-[#2A202D]/60">
                        <div className="space-y-1">
                          <label className="block text-[11px] font-medium text-[#D8D0DA]">
                            Leader Email (for event updates) <span className="text-[#E07AB0]">*</span>
                          </label>
                          <input
                            type="email"
                            value={member.email || ""}
                            onChange={(e) => updateMember(idx, "email", e.target.value)}
                            placeholder="student@bennett.edu.in"
                            className="w-full px-3.5 py-2 rounded-xl bg-[#0D0B0F] border border-[#2A202D] text-[#F5F1F5] placeholder-[#756B7A] text-xs focus:outline-none focus:border-[#C75491]"
                          />
                          {errors.leaderEmail && (
                            <p className="text-[10px] text-[#E07AB0]">{errors.leaderEmail}</p>
                          )}
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[11px] font-medium text-[#D8D0DA]">
                            Leader WhatsApp / Phone <span className="text-[#E07AB0]">*</span>
                          </label>
                          <input
                            type="tel"
                            value={member.phone || ""}
                            onChange={(e) => updateMember(idx, "phone", e.target.value)}
                            placeholder="+91 9876543210"
                            className="w-full px-3.5 py-2 rounded-xl bg-[#0D0B0F] border border-[#2A202D] text-[#F5F1F5] placeholder-[#756B7A] text-xs focus:outline-none focus:border-[#C75491]"
                          />
                          {errors.leaderPhone && (
                            <p className="text-[10px] text-[#E07AB0]">{errors.leaderPhone}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add member button helper if less than 4 */}
          {members.length < 4 && (
            <button
              type="button"
              onClick={handleAddMember}
              className="w-full py-2.5 rounded-xl border border-dashed border-[#39283D] hover:border-[#5C2948] bg-[#121015]/60 hover:bg-[#18131B] text-xs font-semibold text-[#D8D0DA] hover:text-[#E07AB0] flex items-center justify-center space-x-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add Member {members.length + 1} (Max 4 Members)</span>
            </button>
          )}

          {/* Action Row */}
          <div className="pt-3 border-t border-[#2A202D] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#A79EAB] hover:text-[#F5F1F5] transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#5A1025] via-[#7A1833] via-[#8F2450] to-[#7B3F8C] hover:from-[#7A1833] hover:to-[#914B91] disabled:opacity-60 text-[#F5F1F5] font-semibold text-xs shadow-lg shadow-[#7A1833]/30 flex items-center space-x-2 transition-all"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Registering Team...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Team Registration</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}

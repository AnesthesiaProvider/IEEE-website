"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Users,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Flame,
  Send,
  Phone,
  User,
  Hash,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";

interface TeamMemberInput {
  name: string;
  enrollmentNumber: string;
  phone: string;
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
    { name: "", enrollmentNumber: "", phone: "" },
    { name: "", enrollmentNumber: "", phone: "" },
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    id: string;
    teamName: string;
    members: TeamMemberInput[];
    createdAt: string;
  } | null>(null);

  // Add candidate (+) button up to max 4
  const handleAddCandidate = () => {
    if (members.length < 4) {
      setMembers((prev) => [...prev, { name: "", enrollmentNumber: "", phone: "" }]);
    }
  };

  // Subtract candidate (-) button down to min 2
  const handleSubtractCandidate = () => {
    if (members.length > 2) {
      const updated = members.slice(0, -1);
      setMembers(updated);

      // Clear any errors for the removed index
      const removedIndex = members.length - 1;
      const newErrors = { ...errors };
      delete newErrors[`name_${removedIndex}`];
      delete newErrors[`enroll_${removedIndex}`];
      delete newErrors[`phone_${removedIndex}`];
      setErrors(newErrors);
    }
  };

  // Remove specific member if more than 2
  const handleRemoveCandidate = (index: number) => {
    if (members.length > 2) {
      setMembers(members.filter((_, i) => i !== index));
      const newErrors = { ...errors };
      delete newErrors[`name_${index}`];
      delete newErrors[`enroll_${index}`];
      delete newErrors[`phone_${index}`];
      setErrors(newErrors);
    }
  };

  const updateMember = (index: number, field: keyof TeamMemberInput, value: string) => {
    const updated = [...members];
    updated[index] = { ...updated[index], [field]: value };
    setMembers(updated);

    if (errors[`${field}_${index}`]) {
      const newErrors = { ...errors };
      delete newErrors[`${field}_${index}`];
      setErrors(newErrors);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!teamName.trim() || teamName.trim().length < 2) {
      errs.teamName = "Please provide your team name (at least 2 characters).";
    }

    if (members.length < 2) {
      errs.general = "Your team must have at least 2 members.";
    }

    if (members.length > 4) {
      errs.general = "Your team cannot exceed 4 members.";
    }

    const seenEnrolls = new Set<string>();

    members.forEach((m, idx) => {
      const memberNumber = idx + 1;

      if (!m.name.trim() || m.name.trim().length < 2) {
        errs[`name_${idx}`] = `Member ${memberNumber}'s name is required.`;
      }

      const cleanEnroll = m.enrollmentNumber.trim().toUpperCase();
      if (!cleanEnroll || cleanEnroll.length < 5) {
        errs[`enroll_${idx}`] = `Member ${memberNumber}'s enrollment number is required (e.g. E23CSEU0123).`;
      } else if (seenEnrolls.has(cleanEnroll)) {
        errs[`enroll_${idx}`] = `Duplicate enrollment number in team.`;
      } else {
        seenEnrolls.add(cleanEnroll);
      }

      const cleanPhone = m.phone.replace(/[^0-9]/g, "");
      if (!m.phone.trim() || cleanPhone.length < 10) {
        errs[`phone_${idx}`] = `Member ${memberNumber}'s 10-digit phone number is required.`;
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
          phone: m.phone.trim(),
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

      // Confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#7A1833", "#C75491", "#914B91", "#E07AB0", "#FFFFFF"],
      });

      setSubmittedData({
        id: data.registration.id,
        teamName: data.registration.teamName,
        members: [...members],
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
      { name: "", enrollmentNumber: "", phone: "" },
      { name: "", enrollmentNumber: "", phone: "" },
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
              Team &quot;{submittedData.teamName}&quot; Registered!
            </h3>
            <p className="text-xs text-[#A79EAB] max-w-md mx-auto">
              Your squad has been successfully entered into the official Apocalypse 2026 roster.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#121015] border border-[#2A202D] text-left text-xs space-y-3 max-w-md mx-auto">
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
              <span className="font-semibold text-[#C75491]">{submittedData.members.length} Candidates</span>
            </div>

            {/* Members summary */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[#A79EAB] font-bold uppercase text-[10px] tracking-wider block">
                Registered Candidates:
              </span>
              {submittedData.members.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#18131B] border border-[#2A202D] text-[11px]"
                >
                  <span className="font-medium text-[#F5F1F5]">
                    {i + 1}. {m.name}
                  </span>
                  <span className="font-mono text-[#C75491]">{m.enrollmentNumber}</span>
                  <span className="text-[#A79EAB]">{m.phone}</span>
                </div>
              ))}
            </div>
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
          {/* Submission Error Banner */}
          {submitError && (
            <div className="p-3 rounded-xl bg-[#4A1028]/50 border border-[#8F2450] text-[#E07AB0] text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{submitError}</span>
            </div>
          )}

          {errors.general && (
            <div className="p-3 rounded-xl bg-[#4A1028]/50 border border-[#8F2450] text-[#E07AB0] text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errors.general}</span>
            </div>
          )}

          {/* 1. Team Name Input */}
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

          {/* 2. Number of Candidates Stepper with Add (+) and Subtract (-) Buttons */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#121015] border border-[#2A202D]">
            <div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-[#E07AB0]" />
                <span className="text-xs font-bold text-[#F5F1F5]">Number of Candidates</span>
              </div>
              <span className="text-[11px] text-[#A79EAB] mt-0.5 block">
                Minimum 2 candidates &bull; Maximum 4 candidates
              </span>
            </div>

            {/* Stepper with - and + */}
            <div className="flex items-center space-x-2 bg-[#0D0B0F] p-1 rounded-xl border border-[#39283D]">
              <button
                type="button"
                onClick={handleSubtractCandidate}
                disabled={members.length <= 2}
                className="w-8 h-8 rounded-lg bg-[#18131B] hover:bg-[#2A202D] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#18131B] text-[#E07AB0] hover:text-[#F5F1F5] flex items-center justify-center font-bold text-lg transition-all"
                title="Subtract candidate (min 2)"
                aria-label="Subtract candidate"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="px-3 min-w-[76px] text-center">
                <span className="font-mono text-sm font-bold text-[#F5F1F5]">
                  {members.length}
                </span>
                <span className="text-[10px] text-[#A79EAB] block">
                  {members.length === 1 ? "Member" : "Members"}
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddCandidate}
                disabled={members.length >= 4}
                className="w-8 h-8 rounded-lg bg-[#18131B] hover:bg-[#2A202D] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#18131B] text-[#E07AB0] hover:text-[#F5F1F5] flex items-center justify-center font-bold text-lg transition-all"
                title="Add candidate (max 4)"
                aria-label="Add candidate"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3. Members Form Fields (Candidate Name, Enrollment Number, Phone Number) */}
          <div className="space-y-4">
            <div className="space-y-3.5">
              {members.map((member, idx) => (
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
                        Candidate {idx + 1}
                      </span>
                    </div>

                    {/* Quick remove button if more than 2 members */}
                    {members.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCandidate(idx)}
                        className="p-1 rounded-lg text-[#756B7A] hover:text-[#E07AB0] hover:bg-[#4A1028]/30 transition-colors"
                        title="Remove Candidate"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* 3 Fields: Name, Enrollment Number, Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Member's Name */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-medium text-[#D8D0DA]">
                        Member Name <span className="text-[#E07AB0]">*</span>
                      </label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => updateMember(idx, "name", e.target.value)}
                        placeholder="Candidate Name"
                        className="w-full px-3 py-2 rounded-xl bg-[#0D0B0F] border border-[#2A202D] text-[#F5F1F5] placeholder-[#756B7A] text-xs focus:outline-none focus:border-[#C75491]"
                      />
                      {errors[`name_${idx}`] && (
                        <p className="text-[10px] text-[#E07AB0]">{errors[`name_${idx}`]}</p>
                      )}
                    </div>

                    {/* Member Enrollment Number */}
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
                        className="w-full px-3 py-2 rounded-xl bg-[#0D0B0F] border border-[#2A202D] text-[#F5F1F5] placeholder-[#756B7A] text-xs font-mono uppercase focus:outline-none focus:border-[#C75491]"
                      />
                      {errors[`enroll_${idx}`] && (
                        <p className="text-[10px] text-[#E07AB0]">{errors[`enroll_${idx}`]}</p>
                      )}
                    </div>

                    {/* Member Phone Number */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-medium text-[#D8D0DA]">
                        Phone Number <span className="text-[#E07AB0]">*</span>
                      </label>
                      <input
                        type="tel"
                        value={member.phone}
                        onChange={(e) => updateMember(idx, "phone", e.target.value)}
                        placeholder="10-digit number"
                        className="w-full px-3 py-2 rounded-xl bg-[#0D0B0F] border border-[#2A202D] text-[#F5F1F5] placeholder-[#756B7A] text-xs focus:outline-none focus:border-[#C75491]"
                      />
                      {errors[`phone_${idx}`] && (
                        <p className="text-[10px] text-[#E07AB0]">{errors[`phone_${idx}`]}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

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

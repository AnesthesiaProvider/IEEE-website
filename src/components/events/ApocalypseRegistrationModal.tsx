"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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
  Smartphone,
  Copy,
  Check,
  ShieldAlert,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";

interface TeamMemberInput {
  name: string;
  enrollmentNumber: string;
  phone: string;
}

interface SavedTeamData {
  id: string;
  teamName: string;
  members: TeamMemberInput[];
  createdAt: string;
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
  const [submittedData, setSubmittedData] = useState<SavedTeamData | null>(null);
  const [existingDeviceRegistration, setExistingDeviceRegistration] = useState<SavedTeamData | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Check if this phone / browser has already registered a team
  useEffect(() => {
    if (typeof window !== "undefined" && isOpen) {
      try {
        const stored = localStorage.getItem("apocalypse_registered_team");
        if (stored) {
          const parsed: SavedTeamData = JSON.parse(stored);
          if (parsed && parsed.id && parsed.teamName) {
            setExistingDeviceRegistration(parsed);
          }
        }
      } catch (e) {
        console.warn("Could not read apocalypse_registered_team from storage", e);
      }
    }
  }, [isOpen]);

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
    const seenPhones = new Set<string>();

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

      const cleanPhone = m.phone.replace(/[^0-9]/g, "").slice(-10);
      if (!m.phone.trim() || cleanPhone.length < 10) {
        errs[`phone_${idx}`] = `Member ${memberNumber}'s 10-digit phone number is required.`;
      } else if (seenPhones.has(cleanPhone)) {
        errs[`phone_${idx}`] = `Duplicate phone number in team. Each candidate must have a unique phone number.`;
      } else {
        seenPhones.add(cleanPhone);
      }
    });

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const copyRegistrationId = (id: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Enforce 1 registration per phone client-side
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("apocalypse_registered_team");
      if (stored) {
        setSubmitError(
          "A team has already been registered from this phone. Only one team registration is allowed per device."
        );
        return;
      }
    }

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

      const savedData: SavedTeamData = {
        id: data.registration.id,
        teamName: data.registration.teamName,
        members: [...members],
        createdAt: data.registration.createdAt,
      };

      // Lock device: save registration to localStorage
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem("apocalypse_registered_team", JSON.stringify(savedData));
        }
      } catch (err) {
        console.warn("Could not save registration to localStorage:", err);
      }

      // Confetti celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#712EB7", "#664BA3", "#876DBF", "#8A38D4", "#FAF8FD"],
      });

      setSubmittedData(savedData);
      setExistingDeviceRegistration(savedData);
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
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Apocalypse WIE X BC3 — Team Registration"
      maxWidth="max-w-2xl"
    >
      {submittedData ? (
        /* Fresh Confirmation Screen */
        <div className="space-y-6 py-2 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#664BA3] via-[#712EB7] to-[#8A38D4] p-0.5 mx-auto flex items-center justify-center shadow-lg shadow-[#712EB7]/40">
            <div className="w-full h-full bg-[#120E1C] rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#C4B5FD]" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-[#1A1428] border border-[#664BA3] text-xs font-semibold text-[#C4B5FD]">
              Official Registration Confirmed
            </span>
            <h3 className="text-2xl font-bold text-[#FAF8FD]">
              Team &quot;{submittedData.teamName}&quot; Registered!
            </h3>
            <p className="text-xs text-[#CAC4D1] max-w-md mx-auto">
              Your squad has been registered for Apocalypse WIE X BC3. This registration is linked to this phone (1 registration per phone limit active).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#120E1C] border border-[#231B32] text-left text-xs space-y-3 max-w-md mx-auto">
            <div className="flex justify-between items-center pb-2 border-b border-[#231B32]">
              <span className="text-[#CAC4D1]">Registration ID:</span>
              <div className="flex items-center space-x-1.5">
                <span className="font-mono text-[#C4B5FD] font-bold">{submittedData.id}</span>
                <button
                  type="button"
                  onClick={() => copyRegistrationId(submittedData.id)}
                  className="p-1 rounded hover:bg-[#1A1428] text-[#CAC4D1] hover:text-[#C4B5FD] transition-colors"
                  title="Copy ID"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-[#231B32]">
              <span className="text-[#CAC4D1]">Team Name:</span>
              <span className="font-semibold text-[#FAF8FD]">{submittedData.teamName}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-[#231B32]">
              <span className="text-[#CAC4D1]">Total Members:</span>
              <span className="font-semibold text-[#876DBF]">{submittedData.members.length} Candidates</span>
            </div>

            {/* Members summary */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[#CAC4D1] font-bold uppercase text-[10px] tracking-wider block">
                Registered Candidates:
              </span>
              {submittedData.members.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#1A1428] border border-[#231B32] text-[11px]"
                >
                  <span className="font-medium text-[#FAF8FD]">
                    {i + 1}. {m.name}
                  </span>
                  <span className="font-mono text-[#C4B5FD]">{m.enrollmentNumber}</span>
                  <span className="text-[#CAC4D1]">{m.phone}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#664BA3] via-[#712EB7] to-[#876DBF] hover:from-[#712EB7] hover:to-[#A855F7] text-[#FFFFFF] font-semibold text-xs transition-all shadow-md shadow-[#712EB7]/30"
            >
              Done & Close
            </button>
          </div>
        </div>
      ) : existingDeviceRegistration ? (
        /* Device Already Registered Screen */
        <div className="space-y-6 py-2 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#664BA3] via-[#712EB7] to-[#8A38D4] p-0.5 mx-auto flex items-center justify-center shadow-lg shadow-[#712EB7]/40">
            <div className="w-full h-full bg-[#120E1C] rounded-full flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-[#C4B5FD]" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#1A1428] border border-[#664BA3] text-xs font-semibold text-[#C4B5FD] space-x-1.5">
              <ShieldAlert className="w-3.5 h-3.5 mr-1 text-[#C4B5FD]" />
              1 Team Per Phone Enforced
            </span>
            <h3 className="text-2xl font-bold text-[#FAF8FD]">
              Team &quot;{existingDeviceRegistration.teamName}&quot; Already Registered
            </h3>
            <p className="text-xs text-[#CAC4D1] max-w-md mx-auto leading-relaxed">
              A team has already been registered from this phone. Per Apocalypse WIE X BC3 rules, only one team registration is permitted per device/phone.
            </p>
          </div>

          {/* Registered Team Card */}
          <div className="p-4 rounded-xl bg-[#120E1C] border border-[#231B32] text-left text-xs space-y-3 max-w-md mx-auto">
            <div className="flex justify-between items-center pb-2 border-b border-[#231B32]">
              <span className="text-[#CAC4D1]">Registration ID:</span>
              <div className="flex items-center space-x-1.5">
                <span className="font-mono text-[#C4B5FD] font-bold">{existingDeviceRegistration.id}</span>
                <button
                  type="button"
                  onClick={() => copyRegistrationId(existingDeviceRegistration.id)}
                  className="p-1 rounded hover:bg-[#1A1428] text-[#CAC4D1] hover:text-[#C4B5FD] transition-colors"
                  title="Copy ID"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-[#231B32]">
              <span className="text-[#CAC4D1]">Team Name:</span>
              <span className="font-semibold text-[#FAF8FD]">{existingDeviceRegistration.teamName}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-[#231B32]">
              <span className="text-[#CAC4D1]">Total Members:</span>
              <span className="font-semibold text-[#876DBF]">{existingDeviceRegistration.members.length} Candidates</span>
            </div>

            {/* Members summary */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[#CAC4D1] font-bold uppercase text-[10px] tracking-wider block">
                Registered Candidates:
              </span>
              {existingDeviceRegistration.members.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#1A1428] border border-[#231B32] text-[11px]"
                >
                  <span className="font-medium text-[#FAF8FD]">
                    {i + 1}. {m.name}
                  </span>
                  <span className="font-mono text-[#C4B5FD]">{m.enrollmentNumber}</span>
                  <span className="text-[#CAC4D1]">{m.phone}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-[#797380] max-w-sm mx-auto">
            Need to update candidate information? Please reach out directly to the IEEE WIE Bennett University organizing committee.
          </p>

          <div className="pt-2 flex justify-center">
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#664BA3] via-[#712EB7] to-[#876DBF] hover:from-[#712EB7] hover:to-[#A855F7] text-[#FFFFFF] font-semibold text-xs transition-all shadow-md shadow-[#712EB7]/30"
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        /* Registration Form */
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dual Official Posters Banner */}
          <div className="grid grid-cols-2 gap-3 p-2 rounded-xl bg-[#120E1C] border border-[#231B32]">
            <div className="relative h-32 sm:h-44 rounded-lg overflow-hidden bg-[#0A0C15] border border-[#34224E]/50">
              <Image
                src="/images/events/apocalypse.png"
                alt="Apocalypse WIE X BC3 Official Banner"
                fill
                className="object-cover"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0A0C15]/85 text-[10px] text-[#C4B5FD] font-semibold border border-[#34224E]">
                Poster 1
              </div>
            </div>
            <div className="relative h-32 sm:h-44 rounded-lg overflow-hidden bg-[#0A0C15] border border-[#34224E]/50">
              <Image
                src="/images/events/apocalypse-2.jpg"
                alt="Apocalypse WIE X BC3 Resident Evil Poster"
                fill
                className="object-contain"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0A0C15]/85 text-[10px] text-[#C4B5FD] font-semibold border border-[#34224E]">
                Poster 2
              </div>
            </div>
          </div>

          {/* Policy Banner */}
          <div className="p-3 rounded-xl bg-[#1A1428] border border-[#664BA3] text-xs text-[#FAF8FD]/90 flex items-start space-x-2.5">
            <Smartphone className="w-4 h-4 text-[#C4B5FD] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#FAF8FD] block">Device Restriction Policy</span>
              <span className="text-[#CAC4D1]">
                Only 1 team registration is allowed per phone. Please ensure team and candidate details are final before submitting.
              </span>
            </div>
          </div>
          {/* Submission Error Banner */}
          {submitError && (
            <div className="p-3 rounded-xl bg-[#34224E]/70 border border-[#712EB7] text-[#C4B5FD] text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{submitError}</span>
            </div>
          )}

          {errors.general && (
            <div className="p-3 rounded-xl bg-[#34224E]/70 border border-[#712EB7] text-[#C4B5FD] text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errors.general}</span>
            </div>
          )}

          {/* 1. Team Name Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#FAF8FD]/90">
              Team Name <span className="text-[#C4B5FD]">*</span>
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
              className="w-full px-4 py-2.5 rounded-xl bg-[#120E1C] border border-[#231B32] text-[#FAF8FD] placeholder-[#797380] text-xs focus:outline-none focus:border-[#712EB7] focus:ring-1 focus:ring-[#712EB7]"
            />
            {errors.teamName && (
              <p className="text-[11px] text-[#C4B5FD]">{errors.teamName}</p>
            )}
          </div>

          {/* 2. Number of Candidates Stepper with Add (+) and Subtract (-) Buttons */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#120E1C] border border-[#231B32]">
            <div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-[#C4B5FD]" />
                <span className="text-xs font-bold text-[#FAF8FD]">Number of Candidates</span>
              </div>
              <span className="text-[11px] text-[#CAC4D1] mt-0.5 block">
                Minimum 2 candidates &bull; Maximum 4 candidates
              </span>
            </div>

            {/* Stepper with - and + */}
            <div className="flex items-center space-x-2 bg-[#0A0C15] p-1 rounded-xl border border-[#34224E]">
              <button
                type="button"
                onClick={handleSubtractCandidate}
                disabled={members.length <= 2}
                className="w-8 h-8 rounded-lg bg-[#1A1428] hover:bg-[#231B32] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#1A1428] text-[#C4B5FD] hover:text-[#FAF8FD] flex items-center justify-center font-bold text-lg transition-all"
                title="Subtract candidate (min 2)"
                aria-label="Subtract candidate"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="px-3 min-w-[76px] text-center">
                <span className="font-mono text-sm font-bold text-[#FAF8FD]">
                  {members.length}
                </span>
                <span className="text-[10px] text-[#CAC4D1] block">
                  {members.length === 1 ? "Member" : "Members"}
                </span>
              </div>

              <button
                type="button"
                onClick={handleAddCandidate}
                disabled={members.length >= 4}
                className="w-8 h-8 rounded-lg bg-[#1A1428] hover:bg-[#231B32] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-[#1A1428] text-[#C4B5FD] hover:text-[#FAF8FD] flex items-center justify-center font-bold text-lg transition-all"
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
                  className="p-4 rounded-2xl bg-[#120E1C] border border-[#231B32] space-y-3 relative group hover:border-[#664BA3]/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-5 h-5 rounded-full bg-[#1A1428] border border-[#34224E] text-[11px] font-bold text-[#C4B5FD] flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold text-[#FAF8FD]">
                        Candidate {idx + 1}
                      </span>
                    </div>

                    {/* Quick remove button if more than 2 members */}
                    {members.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCandidate(idx)}
                        className="p-1 rounded-lg text-[#797380] hover:text-[#C4B5FD] hover:bg-[#34224E]/40 transition-colors"
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
                      <label className="block text-[11px] font-medium text-[#FAF8FD]/90">
                        Member Name <span className="text-[#C4B5FD]">*</span>
                      </label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => updateMember(idx, "name", e.target.value)}
                        placeholder="Candidate Name"
                        className="w-full px-3 py-2 rounded-xl bg-[#0A0C15] border border-[#231B32] text-[#FAF8FD] placeholder-[#797380] text-xs focus:outline-none focus:border-[#712EB7]"
                      />
                      {errors[`name_${idx}`] && (
                        <p className="text-[10px] text-[#C4B5FD]">{errors[`name_${idx}`]}</p>
                      )}
                    </div>

                    {/* Member Enrollment Number */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-medium text-[#FAF8FD]/90">
                        Enrollment Number <span className="text-[#C4B5FD]">*</span>
                      </label>
                      <input
                        type="text"
                        value={member.enrollmentNumber}
                        onChange={(e) =>
                          updateMember(idx, "enrollmentNumber", e.target.value)
                        }
                        placeholder="e.g. E23CSEU0123"
                        className="w-full px-3 py-2 rounded-xl bg-[#0A0C15] border border-[#231B32] text-[#FAF8FD] placeholder-[#797380] text-xs font-mono uppercase focus:outline-none focus:border-[#712EB7]"
                      />
                      {errors[`enroll_${idx}`] && (
                        <p className="text-[10px] text-[#C4B5FD]">{errors[`enroll_${idx}`]}</p>
                      )}
                    </div>

                    {/* Member Phone Number */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-medium text-[#FAF8FD]/90">
                        Phone Number <span className="text-[#C4B5FD]">*</span>
                      </label>
                      <input
                        type="tel"
                        value={member.phone}
                        onChange={(e) => updateMember(idx, "phone", e.target.value)}
                        placeholder="10-digit number"
                        className="w-full px-3 py-2 rounded-xl bg-[#0A0C15] border border-[#231B32] text-[#FAF8FD] placeholder-[#797380] text-xs focus:outline-none focus:border-[#712EB7]"
                      />
                      {errors[`phone_${idx}`] && (
                        <p className="text-[10px] text-[#C4B5FD]">{errors[`phone_${idx}`]}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-3 border-t border-[#231B32] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#CAC4D1] hover:text-[#FAF8FD] transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-7 py-2.5 rounded-xl bg-gradient-to-r from-[#664BA3] via-[#712EB7] to-[#876DBF] hover:from-[#712EB7] hover:to-[#A855F7] disabled:opacity-60 text-[#FFFFFF] font-semibold text-xs shadow-lg shadow-[#712EB7]/30 flex items-center space-x-2 transition-all"
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

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ChevronLeft,
  Send,
  User,
  Mail,
  Phone,
  BookOpen,
  Layers,
  FileText,
  Link2,
  Check,
  Smartphone,
  ShieldAlert,
  Copy,
} from "lucide-react";
import { ApplicationDomain } from "@/lib/types";

interface SavedApplicationData {
  id: string;
  fullName: string;
  enrollmentNumber: string;
  domain: string;
  createdAt?: string;
}

const domainOptions: { label: ApplicationDomain; desc: string }[] = [
  { label: "Technical", desc: "Fullstack web dev, AI/ML, cloud systems, and open-source tooling." },
  { label: "Events", desc: "Organizing national hackathons, logistics, hospitality & speaker panels." },
  { label: "Design", desc: "UI/UX prototypes, branding, motion graphics, and creative assets." },
  { label: "Marketing", desc: "Growth campaigns, sponsor pitches, and university-wide outreach." },
  { label: "Public Relations", desc: "Corporate alliances, inter-college chapters, and media representation." },
  { label: "Content", desc: "Technical blogs, event scripts, articles, and chapter newsletters." },
  { label: "Social Media", desc: "Instagram reels, LinkedIn thought leadership, and digital presence." },
  { label: "Operations", desc: "Resource allocation, volunteer coordination, and project timelines." },
  { label: "Research", desc: "IEEE Explore papers, patent ideation, and literature studies." },
  { label: "Other", desc: "Cross-disciplinary contributions and emerging focus areas." },
];

export default function JuniorCorePage() {
  const [formData, setFormData] = useState({
    fullName: "",
    enrollmentNumber: "",
    email: "",
    phone: "",
    gender: "",
    course: "B.Tech",
    branch: "Computer Science & Engineering",
    year: "1st Year",
    semester: "2nd Semester",
    domain: "Technical" as ApplicationDomain,
    whyJoin: "",
    previousExperience: "",
    skills: "",
    portfolioUrl: "",
    linkedinUrl: "",
    githubUrl: "",
    additionalInfo: "",
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<SavedApplicationData | null>(null);
  const [existingDeviceApplication, setExistingDeviceApplication] = useState<SavedApplicationData | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Check if an application was already submitted on this phone / device
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("junior_core_application");
        if (stored) {
          const parsed: SavedApplicationData = JSON.parse(stored);
          if (parsed && parsed.id && parsed.enrollmentNumber) {
            setExistingDeviceApplication(parsed);
          }
        }
      } catch (err) {
        console.warn("Could not read junior_core_application from localStorage:", err);
      }
    }
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = "Please enter your full name.";
    }

    if (!formData.enrollmentNumber.trim()) {
      errs.enrollmentNumber = "Please enter your Bennett University enrollment number.";
    } else if (formData.enrollmentNumber.trim().length < 5) {
      errs.enrollmentNumber = "Please provide a valid enrollment number (e.g. E23CSEU0123).";
    }

    if (!formData.email.trim()) {
      errs.email = "Please enter your university email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      errs.phone = "Please enter your phone number.";
    } else if (formData.phone.replace(/[^0-9]/g, "").length < 10) {
      errs.phone = "Please enter a valid 10-digit phone number.";
    }

    if (!formData.whyJoin.trim() || formData.whyJoin.trim().length < 15) {
      errs.whyJoin = "Please elaborate why you wish to join IEEE WIE (at least 15 characters).";
    }

    if (!formData.skills.trim()) {
      errs.skills = "Please mention at least one key skill or software tool.";
    }

    if (!formData.consent) {
      errs.consent = "You must confirm the declaration to submit.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const copyRefId = (id: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(id);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // Device-level restriction: only 1 application per phone/device
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("junior_core_application");
      if (stored) {
        setSubmitError(
          "An application has already been submitted from this phone/device. Only one Junior Core application is allowed per device."
        );
        return;
      }
    }

    if (!validate()) {
      const firstErrorEl = document.querySelector(".field-error");
      if (firstErrorEl) {
        firstErrorEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/junior-core", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setSubmitError(result.error || "Submission failed. Please check your inputs.");
        setIsSubmitting(false);
        return;
      }

      const savedApp: SavedApplicationData = {
        id: result.application.id,
        fullName: formData.fullName,
        enrollmentNumber: formData.enrollmentNumber.toUpperCase(),
        domain: formData.domain,
        createdAt: result.application.createdAt || new Date().toISOString(),
      };

      // Lock device: save submission to localStorage
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem("junior_core_application", JSON.stringify(savedApp));
        }
      } catch (err) {
        console.warn("Could not save to localStorage:", err);
      }

      // Success celebration with brand palette!
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#712EB7", "#664BA3", "#876DBF", "#8A38D4", "#FAF8FD"],
        });
      } catch {
        // ignore if canvas unavailable
      }

      setSubmittedData(savedApp);
      setExistingDeviceApplication(savedApp);
    } catch {
      setSubmitError("Network connection error. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================================================================
  // SUCCESS CONFIRMATION SCREEN (Fresh Submission)
  // =========================================================================
  if (submittedData) {
    return (
      <div className="relative min-h-[75vh] flex items-center justify-center py-16 px-4">
        <div className="glow-orb-purple w-96 h-96 top-20 -left-20" />
        <div className="glow-orb-purple w-96 h-96 top-40 -right-20" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-xl w-full rounded-3xl bg-[#1A1428]/95 border border-[#664BA3] backdrop-blur-2xl p-8 sm:p-12 text-center shadow-2xl space-y-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#664BA3] via-[#712EB7] to-[#8A38D4] p-0.5 mx-auto shadow-lg shadow-[#712EB7]/30 flex items-center justify-center">
            <div className="w-full h-full bg-[#120E1C] rounded-[14px] flex items-center justify-center">
              <Check className="w-8 h-8 text-[#C4B5FD]" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FAF8FD] bg-[#34224E]/70 px-3 py-1 rounded-full border border-[#712EB7]">
              Application Received
            </span>
            <h1 className="text-3xl font-extrabold text-[#FAF8FD]">
              Application Submitted Successfully!
            </h1>
            <p className="text-sm text-[#FAF8FD]/80 leading-relaxed">
              Thank you for applying to the <strong>IEEE WIE Bennett University Junior Core Team</strong>. This submission is linked to this device (1 submission per phone active).
            </p>
          </div>

          {/* Applicant Receipt Card */}
          <div className="rounded-2xl bg-[#120E1C] border border-[#231B32] p-5 text-left space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between border-b border-[#231B32] pb-2">
              <span className="text-[#CAC4D1]">Applicant:</span>
              <span className="font-semibold text-[#FAF8FD]">{submittedData.fullName}</span>
            </div>
            <div className="flex justify-between border-b border-[#231B32] py-2">
              <span className="text-[#CAC4D1]">Enrollment No:</span>
              <span className="font-semibold text-[#C4B5FD]">{submittedData.enrollmentNumber}</span>
            </div>
            <div className="flex justify-between border-b border-[#231B32] py-2">
              <span className="text-[#CAC4D1]">Selected Domain:</span>
              <span className="font-semibold text-[#876DBF]">{submittedData.domain}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-[#CAC4D1]">Application Reference:</span>
              <div className="flex items-center space-x-1.5">
                <span className="font-mono text-[#FAF8FD]/90 font-semibold">{submittedData.id}</span>
                <button
                  type="button"
                  onClick={() => copyRefId(submittedData.id)}
                  className="p-1 rounded hover:bg-[#1A1428] text-[#CAC4D1] hover:text-[#C4B5FD] transition-colors"
                  title="Copy Reference ID"
                >
                  {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#CAC4D1]">
            A confirmation has been logged. Shortlisted applicants will receive follow-up interview notifications.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#664BA3] via-[#712EB7] to-[#876DBF] hover:from-[#712EB7] hover:to-[#A855F7] text-[#FFFFFF] font-semibold text-sm shadow-lg shadow-[#712EB7]/30 transition-all text-center"
            >
              Back to Home
            </Link>
            <Link
              href="/events"
              className="px-6 py-3 rounded-xl bg-[#1A1428] hover:bg-[#231B32] text-[#FAF8FD] text-sm font-semibold border border-[#231B32] transition-colors text-center"
            >
              Explore Upcoming Events
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // =========================================================================
  // DEVICE ALREADY SUBMITTED SCREEN
  // =========================================================================
  if (existingDeviceApplication) {
    return (
      <div className="relative min-h-[75vh] flex items-center justify-center py-16 px-4">
        <div className="glow-orb-purple w-96 h-96 top-20 -left-20" />
        <div className="glow-orb-purple w-96 h-96 top-40 -right-20" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-xl w-full rounded-3xl bg-[#1A1428]/95 border border-[#664BA3] backdrop-blur-2xl p-8 sm:p-12 text-center shadow-2xl space-y-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#664BA3] via-[#712EB7] to-[#8A38D4] p-0.5 mx-auto shadow-lg shadow-[#712EB7]/30 flex items-center justify-center">
            <div className="w-full h-full bg-[#120E1C] rounded-[14px] flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-[#C4B5FD]" />
            </div>
          </div>

          <div className="space-y-2">
            <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#C4B5FD] bg-[#1A1428] px-3.5 py-1 rounded-full border border-[#664BA3] space-x-1.5">
              <ShieldAlert className="w-3.5 h-3.5 mr-1 text-[#C4B5FD]" />
              1 Application Per Phone Enforced
            </span>
            <h1 className="text-3xl font-extrabold text-[#FAF8FD]">
              Application Already Submitted
            </h1>
            <p className="text-sm text-[#FAF8FD]/80 leading-relaxed">
              An application has already been submitted from this phone/device for applicant <strong>{existingDeviceApplication.fullName}</strong>. To ensure fair recruitment, each applicant may only submit once per phone.
            </p>
          </div>

          {/* Applicant Receipt Card */}
          <div className="rounded-2xl bg-[#120E1C] border border-[#231B32] p-5 text-left space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between border-b border-[#231B32] pb-2">
              <span className="text-[#CAC4D1]">Applicant Name:</span>
              <span className="font-semibold text-[#FAF8FD]">{existingDeviceApplication.fullName}</span>
            </div>
            <div className="flex justify-between border-b border-[#231B32] py-2">
              <span className="text-[#CAC4D1]">Enrollment No:</span>
              <span className="font-semibold text-[#C4B5FD] font-mono">{existingDeviceApplication.enrollmentNumber}</span>
            </div>
            <div className="flex justify-between border-b border-[#231B32] py-2">
              <span className="text-[#CAC4D1]">Selected Domain:</span>
              <span className="font-semibold text-[#876DBF]">{existingDeviceApplication.domain}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-[#CAC4D1]">Application Reference:</span>
              <div className="flex items-center space-x-1.5">
                <span className="font-mono text-[#FAF8FD]/90 font-semibold">{existingDeviceApplication.id}</span>
                <button
                  type="button"
                  onClick={() => copyRefId(existingDeviceApplication.id)}
                  className="p-1 rounded hover:bg-[#1A1428] text-[#CAC4D1] hover:text-[#C4B5FD] transition-colors"
                  title="Copy Reference ID"
                >
                  {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#797380] max-w-md mx-auto">
            Need to update your submitted information? Please contact the IEEE WIE Bennett University core team at wie.ieee@bennett.edu.in.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#664BA3] via-[#712EB7] to-[#876DBF] hover:from-[#712EB7] hover:to-[#A855F7] text-[#FFFFFF] font-semibold text-sm shadow-lg shadow-[#712EB7]/30 transition-all text-center"
            >
              Back to Home
            </Link>
            <Link
              href="/events"
              className="px-6 py-3 rounded-xl bg-[#1A1428] hover:bg-[#231B32] text-[#FAF8FD] text-sm font-semibold border border-[#231B32] transition-colors text-center"
            >
              Explore Upcoming Events
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // =========================================================================
  // APPLICATION FORM
  // =========================================================================
  return (
    <div className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Ambient glows */}
      <div className="glow-orb-purple w-96 h-96 top-10 -left-20" />
      <div className="glow-orb-purple w-96 h-96 top-96 -right-20" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1A1428] border border-[#34224E] text-xs font-semibold text-[#C4B5FD] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#C4B5FD]" />
            <span>Official Chapter Recruitment</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#FAF8FD] tracking-tight">
            Join the Junior Core Team
          </h1>

          <p className="text-[#FAF8FD]/80 text-base sm:text-lg leading-relaxed">
            Your opportunity to learn, contribute, lead, and grow with IEEE WIE Bennett University.
          </p>
        </div>

        {/* Device Restriction Policy Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-[#1A1428] border border-[#664BA3] text-xs text-[#FAF8FD]/90 flex items-start space-x-3">
          <Smartphone className="w-4 h-4 text-[#C4B5FD] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#FAF8FD] block">Device Restriction Notice</span>
            <span className="text-[#CAC4D1]">
              Only 1 application can be submitted from this phone/device. Please ensure your enrollment number, domain preference, and phone number are correct before submitting.
            </span>
          </div>
        </div>

        {/* Global Submission Error Alert */}
        {submitError && (
          <div className="mb-8 p-4 rounded-xl bg-[#34224E]/80 border border-[#712EB7] text-[#FAF8FD] text-sm flex items-start space-x-3 backdrop-blur-md">
            <AlertCircle className="w-5 h-5 text-[#C4B5FD] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Unable to submit application</p>
              <p className="text-xs text-[#CAC4D1] mt-0.5">{submitError}</p>
            </div>
          </div>
        )}

        {/* Application Form Card */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-3xl bg-[#120E1C]/90 border border-[#231B32] backdrop-blur-2xl p-6 sm:p-10 shadow-2xl space-y-10"
        >
          {/* ----------------------------------------------------------------- */}
          {/* SECTION 1: PERSONAL INFORMATION                                    */}
          {/* ----------------------------------------------------------------- */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 border-b border-[#231B32] pb-3">
              <User className="w-5 h-5 text-[#C4B5FD]" />
              <h2 className="text-xl font-bold text-[#FAF8FD]">Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-[#FAF8FD]/90 mb-1.5">
                  Full Name <span className="text-[#C4B5FD]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Aanya Sharma"
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#1A1428] border text-[#FAF8FD] text-sm placeholder-[#797380] focus:outline-none focus:ring-2 transition-all ${
                    errors.fullName
                      ? "border-[#712EB7] focus:ring-[#712EB7]/30 field-error"
                      : "border-[#231B32] focus:border-[#712EB7] focus:ring-[#712EB7]/20"
                  }`}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-[#C4B5FD]">{errors.fullName}</p>
                )}
              </div>

              {/* Enrollment Number */}
              <div>
                <label className="block text-xs font-medium text-[#FAF8FD]/90 mb-1.5">
                  Enrollment Number <span className="text-[#C4B5FD]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.enrollmentNumber}
                  onChange={(e) => setFormData({ ...formData, enrollmentNumber: e.target.value })}
                  placeholder="e.g. E24CSEU0101"
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#1A1428] border text-[#FAF8FD] text-sm placeholder-[#797380] uppercase focus:outline-none focus:ring-2 transition-all ${
                    errors.enrollmentNumber
                      ? "border-[#712EB7] focus:ring-[#712EB7]/30 field-error"
                      : "border-[#231B32] focus:border-[#712EB7] focus:ring-[#712EB7]/20"
                  }`}
                />
                {errors.enrollmentNumber && (
                  <p className="mt-1 text-xs text-[#C4B5FD]">{errors.enrollmentNumber}</p>
                )}
              </div>

              {/* University Email */}
              <div>
                <label className="block text-xs font-medium text-[#FAF8FD]/90 mb-1.5">
                  University Email <span className="text-[#C4B5FD]">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. student@bennett.edu.in"
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#1A1428] border text-[#FAF8FD] text-sm placeholder-[#797380] focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? "border-[#712EB7] focus:ring-[#712EB7]/30 field-error"
                      : "border-[#231B32] focus:border-[#712EB7] focus:ring-[#712EB7]/20"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-[#C4B5FD]">{errors.email}</p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-medium text-[#FAF8FD]/90 mb-1.5">
                  Phone Number <span className="text-[#C4B5FD]">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 9876543210"
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#1A1428] border text-[#FAF8FD] text-sm placeholder-[#797380] focus:outline-none focus:ring-2 transition-all ${
                    errors.phone
                      ? "border-[#712EB7] focus:ring-[#712EB7]/30 field-error"
                      : "border-[#231B32] focus:border-[#712EB7] focus:ring-[#712EB7]/20"
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-[#C4B5FD]">{errors.phone}</p>
                )}
              </div>

              {/* Course */}
              <div>
                <label className="block text-xs font-medium text-[#FAF8FD]/90 mb-1.5">
                  Course / Program <span className="text-[#C4B5FD]">*</span>
                </label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1A1428] border border-[#231B32] text-[#FAF8FD] text-sm focus:outline-none focus:border-[#712EB7] focus:ring-2 focus:ring-[#712EB7]/20"
                >
                  <option value="B.Tech">B.Tech</option>
                  <option value="BCA">BCA</option>
                  <option value="MCA">MCA</option>
                  <option value="M.Tech">M.Tech</option>
                  <option value="Ph.D">Ph.D</option>
                  <option value="B.Des">B.Des</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Branch / Specialization */}
              <div>
                <label className="block text-xs font-medium text-[#FAF8FD]/90 mb-1.5">
                  Branch / Specialization <span className="text-[#C4B5FD]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  placeholder="e.g. CSE / ECE / Biotech / Data Science"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1A1428] border border-[#231B32] text-[#FAF8FD] text-sm placeholder-[#797380] focus:outline-none focus:border-[#712EB7] focus:ring-2 focus:ring-[#712EB7]/20"
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-xs font-medium text-[#FAF8FD]/90 mb-1.5">
                  Academic Year <span className="text-[#C4B5FD]">*</span>
                </label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1A1428] border border-[#231B32] text-[#FAF8FD] text-sm focus:outline-none focus:border-[#712EB7] focus:ring-2 focus:ring-[#712EB7]/20"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              {/* Semester */}
              <div>
                <label className="block text-xs font-medium text-[#FAF8FD]/90 mb-1.5">
                  Current Semester <span className="text-[#C4B5FD]">*</span>
                </label>
                <select
                  value={formData.semester}
                  onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1A1428] border border-[#231B32] text-[#FAF8FD] text-sm focus:outline-none focus:border-[#712EB7] focus:ring-2 focus:ring-[#712EB7]/20"
                >
                  <option value="1st Semester">1st Semester</option>
                  <option value="2nd Semester">2nd Semester</option>
                  <option value="3rd Semester">3rd Semester</option>
                  <option value="4th Semester">4th Semester</option>
                  <option value="5th Semester">5th Semester</option>
                  <option value="6th Semester">6th Semester</option>
                  <option value="7th Semester">7th Semester</option>
                  <option value="8th Semester">8th Semester</option>
                </select>
              </div>

              {/* Gender (Optional) */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#CAC4D1] mb-1.5">
                  Gender (Optional)
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1A1428] border border-[#231B32] text-[#FAF8FD] text-sm focus:outline-none focus:border-[#712EB7]"
                >
                  <option value="">Prefer not to disclose</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-Binary">Non-Binary</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* SECTION 2: DOMAIN & APPLICATION DETAILS                          */}
          {/* ----------------------------------------------------------------- */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 border-b border-[#231B32] pb-3">
              <Layers className="w-5 h-5 text-[#876DBF]" />
              <h2 className="text-xl font-bold text-[#FAF8FD]">Domain & Statement of Purpose</h2>
            </div>

            {/* Domain Picker Cards */}
            <div>
              <label className="block text-xs font-medium text-[#FAF8FD]/90 mb-2">
                Which domain are you interested in? <span className="text-[#C4B5FD]">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {domainOptions.map((item) => {
                  const isSelected = formData.domain === item.label;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, domain: item.label })}
                      className={`p-3 rounded-xl text-left border transition-all text-xs font-medium flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#34224E]/80 border-[#712EB7] text-[#FAF8FD] shadow-md shadow-[#712EB7]/30"
                          : "bg-[#1A1428] border-[#231B32] text-[#FAF8FD]/80 hover:border-[#664BA3] hover:text-[#FAF8FD]"
                      }`}
                    >
                      <span className="font-bold">{item.label}</span>
                      <span className="text-[10px] text-[#CAC4D1] mt-1 line-clamp-2">
                        {item.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Why Join */}
            <div>
              <label className="block text-xs font-medium text-[#FAF8FD]/90 mb-1.5">
                Why do you want to join IEEE WIE Bennett University? <span className="text-[#C4B5FD]">*</span>
              </label>
              <textarea
                rows={4}
                value={formData.whyJoin}
                onChange={(e) => setFormData({ ...formData, whyJoin: e.target.value })}
                placeholder="Share your motivation, what you hope to learn or contribute, and your aspirations..."
                className={`w-full px-4 py-3 rounded-xl bg-[#1A1428] border text-[#FAF8FD] text-sm placeholder-[#797380] focus:outline-none focus:ring-2 transition-all ${
                  errors.whyJoin
                    ? "border-[#712EB7] focus:ring-[#712EB7]/30 field-error"
                    : "border-[#231B32] focus:border-[#712EB7] focus:ring-[#712EB7]/20"
                }`}
              />
              {errors.whyJoin && (
                <p className="mt-1 text-xs text-[#C4B5FD]">{errors.whyJoin}</p>
              )}
            </div>

            {/* Previous Experience */}
            <div>
              <label className="block text-xs font-medium text-[#FAF8FD]/90 mb-1.5">
                Previous Experience / Leadership Roles (Optional)
              </label>
              <textarea
                rows={3}
                value={formData.previousExperience}
                onChange={(e) => setFormData({ ...formData, previousExperience: e.target.value })}
                placeholder="Any clubs, hackathons, open source contributions, or school projects you've taken part in..."
                className="w-full px-4 py-3 rounded-xl bg-[#1A1428] border border-[#231B32] text-[#FAF8FD] text-sm placeholder-[#797380] focus:outline-none focus:border-[#712EB7]"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-xs font-medium text-[#FAF8FD]/90 mb-1.5">
                Skills & Technologies <span className="text-[#C4B5FD]">*</span>
              </label>
              <input
                type="text"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                placeholder="e.g. React, Python, Figma, Public Speaking, Video Editing, Event Management"
                className={`w-full px-4 py-2.5 rounded-xl bg-[#1A1428] border text-[#FAF8FD] text-sm placeholder-[#797380] focus:outline-none focus:ring-2 transition-all ${
                  errors.skills
                    ? "border-[#712EB7] focus:ring-[#712EB7]/30 field-error"
                    : "border-[#231B32] focus:border-[#712EB7] focus:ring-[#712EB7]/20"
                }`}
              />
              {errors.skills && (
                <p className="mt-1 text-xs text-[#C4B5FD]">{errors.skills}</p>
              )}
            </div>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* SECTION 3: LINKS, CONSENT & SUBMISSION                           */}
          {/* ----------------------------------------------------------------- */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3 border-b border-[#231B32] pb-3">
              <Link2 className="w-5 h-5 text-[#C4B5FD]" />
              <h2 className="text-xl font-bold text-[#FAF8FD]">Links & Declaration</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Portfolio */}
              <div>
                <label className="block text-xs font-medium text-[#FAF8FD]/90 mb-1.5">
                  Portfolio / Behance URL
                </label>
                <input
                  type="url"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#1A1428] border border-[#231B32] text-[#FAF8FD] text-xs placeholder-[#797380] focus:outline-none focus:border-[#712EB7]"
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label className="block text-xs font-medium text-[#FAF8FD]/90 mb-1.5">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#1A1428] border border-[#231B32] text-[#FAF8FD] text-xs placeholder-[#797380] focus:outline-none focus:border-[#712EB7]"
                />
              </div>

              {/* GitHub */}
              <div>
                <label className="block text-xs font-medium text-[#FAF8FD]/90 mb-1.5">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#1A1428] border border-[#231B32] text-[#FAF8FD] text-xs placeholder-[#797380] focus:outline-none focus:border-[#712EB7]"
                />
              </div>
            </div>

            {/* Additional Info */}
            <div>
              <label className="block text-xs font-medium text-[#FAF8FD]/90 mb-1.5">
                Anything else you&apos;d like us to know?
              </label>
              <textarea
                rows={2}
                value={formData.additionalInfo}
                onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                placeholder="Time commitments, specific interests, or questions for the core team..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#1A1428] border border-[#231B32] text-[#FAF8FD] text-sm placeholder-[#797380] focus:outline-none focus:border-[#712EB7]"
              />
            </div>

            {/* Privacy & Consent Checkbox */}
            <div className="pt-2">
              <label className="flex items-start space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded border-[#34224E] bg-[#1A1428] accent-[#712EB7] focus:ring-[#712EB7]/40"
                />
                <span className="text-xs text-[#FAF8FD]/80 group-hover:text-[#FAF8FD] transition-colors leading-relaxed">
                  I confirm that the information provided by me is accurate. Your information will only be used for IEEE WIE Bennett University recruitment and chapter communication purposes.
                </span>
              </label>
              {errors.consent && (
                <p className="mt-1 text-xs text-[#C4B5FD] field-error">{errors.consent}</p>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-6 border-t border-[#231B32] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#CAC4D1]">
                Fields marked with <span className="text-[#C4B5FD]">*</span> are mandatory.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#664BA3] via-[#712EB7] to-[#876DBF] hover:from-[#712EB7] hover:to-[#A855F7] disabled:opacity-60 text-[#FFFFFF] font-semibold text-sm shadow-xl shadow-[#712EB7]/35 flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-[1.02]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
}

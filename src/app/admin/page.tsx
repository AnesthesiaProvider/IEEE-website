"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Search,
  Download,
  Trash2,
  Eye,
  LogOut,
  Lock,
  Filter,
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Sparkles,
  Flame,
  UserCheck,
} from "lucide-react";
import { JuniorCoreApplication, ApplicationStatus, ApocalypseRegistration } from "@/lib/types";
import { Modal } from "@/components/ui/Modal";

const statusOptions: ApplicationStatus[] = ["Pending", "Shortlisted", "Selected", "Rejected"];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<"junior-core" | "apocalypse">("junior-core");

  // Junior Core Dashboard Data
  const [applications, setApplications] = useState<JuniorCoreApplication[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [domainFilter, setDomainFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApplicant, setSelectedApplicant] = useState<JuniorCoreApplication | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Apocalypse Dashboard Data
  const [apocalypseRegistrations, setApocalypseRegistrations] = useState<ApocalypseRegistration[]>([]);
  const [apocalypseSearch, setApocalypseSearch] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<ApocalypseRegistration | null>(null);


  // Check auth session
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/auth");
      const data = await res.json();
      setIsAuthenticated(data.isAuthenticated);
      if (data.isAuthenticated) {
        fetchApplications();
        fetchApocalypseRegistrations();
      }
    } catch {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Fetch applications
  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/applications");
      const data = await res.json();
      if (data.success) {
        setApplications(data.applications);
      }
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch Apocalypse team registrations
  const fetchApocalypseRegistrations = async () => {
    try {
      const res = await fetch("/api/admin/apocalypse");
      const data = await res.json();
      if (data.success) {
        setApocalypseRegistrations(data.registrations);
      }
    } catch (err) {
      console.error("Error fetching Apocalypse registrations:", err);
    }
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setAuthError(data.error || "Authentication failed.");
        setIsLoggingIn(false);
        return;
      }

      setIsAuthenticated(true);
      fetchApplications();
      fetchApocalypseRegistrations();
    } catch {
      setAuthError("Network error. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsAuthenticated(false);
    setApplications([]);
  };

  // Status changer
  const handleStatusChange = async (id: string, newStatus: ApplicationStatus) => {
    try {
      const res = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
        );
        if (selectedApplicant && selectedApplicant.id === id) {
          setSelectedApplicant({ ...selectedApplicant, status: newStatus });
        }
        setActionMessage(`Status updated to ${newStatus}`);
        setTimeout(() => setActionMessage(null), 3000);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  // Delete handler
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this application?")) return;

    try {
      const res = await fetch(`/api/admin/applications?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setApplications((prev) => prev.filter((app) => app.id !== id));
        if (selectedApplicant?.id === id) {
          setSelectedApplicant(null);
        }
        setActionMessage("Application deleted.");
        setTimeout(() => setActionMessage(null), 3000);
      }
    } catch (err) {
      console.error("Failed to delete application:", err);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (applications.length === 0) return;

    const headers = [
      "ID",
      "Full Name",
      "Enrollment Number",
      "Email",
      "Phone",
      "Gender",
      "Course",
      "Branch",
      "Year",
      "Semester",
      "Domain",
      "Status",
      "Skills",
      "Why Join",
      "Previous Experience",
      "Portfolio URL",
      "LinkedIn URL",
      "GitHub URL",
      "Submitted At",
    ];

    const escapeCsv = (val?: string) => {
      if (!val) return '""';
      const clean = String(val).replace(/"/g, '""');
      return `"${clean}"`;
    };

    const rows = applications.map((a) => [
      escapeCsv(a.id),
      escapeCsv(a.fullName),
      escapeCsv(a.enrollmentNumber),
      escapeCsv(a.email),
      escapeCsv(a.phone),
      escapeCsv(a.gender || ""),
      escapeCsv(a.course),
      escapeCsv(a.branch),
      escapeCsv(a.year),
      escapeCsv(a.semester),
      escapeCsv(a.domain),
      escapeCsv(a.status),
      escapeCsv(a.skills),
      escapeCsv(a.whyJoin),
      escapeCsv(a.previousExperience || ""),
      escapeCsv(a.portfolioUrl || ""),
      escapeCsv(a.linkedinUrl || ""),
      escapeCsv(a.githubUrl || ""),
      escapeCsv(a.createdAt),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `IEEE_WIE_BU_Junior_Core_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Delete Apocalypse team handler
  const handleDeleteTeam = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this Apocalypse team registration?")) return;

    try {
      const res = await fetch(`/api/admin/apocalypse?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setApocalypseRegistrations((prev) => prev.filter((team) => team.id !== id));
        if (selectedTeam?.id === id) {
          setSelectedTeam(null);
        }
        setActionMessage("Apocalypse team registration deleted.");
        setTimeout(() => setActionMessage(null), 3000);
      }
    } catch (err) {
      console.error("Failed to delete Apocalypse team:", err);
    }
  };

  // Export Apocalypse teams to CSV
  const handleExportApocalypseCSV = () => {
    if (apocalypseRegistrations.length === 0) return;

    const headers = [
      "Registration ID",
      "Team Name",
      "Total Members",
      "Candidate Index",
      "Member Name",
      "Enrollment Number",
      "Phone Number",
      "Submitted At",
    ];

    const escapeCsv = (val?: string) => {
      if (!val) return '""';
      const clean = String(val).replace(/"/g, '""');
      return `"${clean}"`;
    };

    const rows: string[][] = [];
    apocalypseRegistrations.forEach((team) => {
      team.members.forEach((member, idx) => {
        rows.push([
          escapeCsv(team.id),
          escapeCsv(team.teamName),
          escapeCsv(String(team.members.length)),
          escapeCsv(String(idx + 1)),
          escapeCsv(member.name),
          escapeCsv(member.enrollmentNumber),
          escapeCsv(member.phone || ""),
          escapeCsv(team.createdAt),
        ]);
      });
    });

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `IEEE_WIE_BU_Apocalypse_Teams_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtering applications
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.enrollmentNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDomain = domainFilter === "All" || app.domain === domainFilter;
    const matchesYear = yearFilter === "All" || app.year === yearFilter;
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;

    return matchesSearch && matchesDomain && matchesYear && matchesStatus;
  });

  // Filtering Apocalypse teams
  const filteredApocalypseTeams = apocalypseRegistrations.filter((team) => {
    const q = apocalypseSearch.toLowerCase();
    const matchesTeamName = team.teamName.toLowerCase().includes(q);
    const matchesMembers = team.members.some(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.enrollmentNumber.toLowerCase().includes(q) ||
        (m.email && m.email.toLowerCase().includes(q))
    );
    return matchesTeamName || matchesMembers;
  });

  // Junior Core Metrics summary
  const totalCount = applications.length;
  const shortlistedCount = applications.filter((a) => a.status === "Shortlisted").length;
  const selectedCount = applications.filter((a) => a.status === "Selected").length;
  const pendingCount = applications.filter((a) => a.status === "Pending").length;

  // Apocalypse Metrics summary
  const totalApocalypseTeams = apocalypseRegistrations.length;
  const totalApocalypseParticipants = apocalypseRegistrations.reduce(
    (acc, t) => acc + t.members.length,
    0
  );
  const avgTeamSize =
    totalApocalypseTeams > 0
      ? (totalApocalypseParticipants / totalApocalypseTeams).toFixed(1)
      : "0";


  // Status color helper
  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case "Selected":
        return "bg-[#7A1833]/40 text-[#F5F1F5] border-[#8F2450]";
      case "Shortlisted":
        return "bg-[#632C70]/30 text-[#E07AB0] border-[#914B91]";
      case "Rejected":
        return "bg-[#18131B] text-[#756B7A] border-[#2A202D]";
      default:
        return "bg-[#4A1028]/40 text-[#D8D0DA] border-[#5C2948]";
    }
  };

  // Loading initial auth state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#C75491] border-t-transparent animate-spin" />
      </div>
    );
  }

  // =========================================================================
  // 1. ADMIN LOGIN SCREEN
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
        <div className="glow-orb-purple w-96 h-96 top-20 -left-20" />
        <div className="glow-orb-wine w-96 h-96 top-40 -right-20" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-md w-full rounded-3xl bg-[#18131B]/95 border border-[#39283D] backdrop-blur-2xl p-8 shadow-2xl space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7A1833] via-[#8F2450] to-[#C75491] p-0.5 mx-auto flex items-center justify-center">
              <div className="w-full h-full bg-[#121015] rounded-[14px] flex items-center justify-center">
                <Lock className="w-6 h-6 text-[#C75491]" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[#F5F1F5]">Admin Authentication</h1>
            <p className="text-xs text-[#A79EAB]">
              Enter the chapter administrator passkey to access the Junior Core recruitment portal.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-[#4A1028]/60 border border-[#8F2450] text-[#E07AB0] text-xs text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#D8D0DA] mb-1.5">
                Administrator Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#121015] border border-[#2A202D] text-[#F5F1F5] placeholder-[#756B7A] text-sm focus:outline-none focus:border-[#C75491] focus:ring-1 focus:ring-[#C75491]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#5A1025] via-[#8F2450] to-[#7B3F8C] hover:from-[#7A1833] hover:via-[#C75491] hover:to-[#914B91] disabled:opacity-60 text-[#F5F1F5] font-semibold text-sm shadow-lg shadow-[#4A1028]/50 transition-all flex items-center justify-center space-x-2"
            >
              {isLoggingIn ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authorize Access</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // =========================================================================
  // 2. AUTHENTICATED DASHBOARD
  // =========================================================================
  return (
    <div className="relative py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2A202D] pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#18131B] text-[#C75491] border border-[#39283D] text-[11px] font-semibold">
              Admin Portal
            </span>
            <span className="text-xs text-[#A79EAB]">• IEEE WIE Bennett University</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F1F5] mt-1">
            {activeTab === "junior-core"
              ? "Junior Core Applications Management"
              : "Apocalypse WIE X BC3 Team Registrations"}
          </h1>
        </div>

        <div className="flex items-center space-x-3 self-start md:self-auto">
          <button
            onClick={() => {
              fetchApplications();
              fetchApocalypseRegistrations();
            }}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-[#121015] border border-[#2A202D] text-[#D8D0DA] hover:text-[#F5F1F5] hover:bg-[#18131B] hover:border-[#39283D] transition-colors"
            title="Refresh All Lists"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={activeTab === "junior-core" ? handleExportCSV : handleExportApocalypseCSV}
            className="px-4 py-2.5 rounded-xl bg-[#121015] hover:bg-[#18131B] border border-[#2A202D] hover:border-[#39283D] text-[#D8D0DA] text-xs font-semibold flex items-center space-x-2 transition-colors"
          >
            <Download className="w-4 h-4 text-[#C75491]" />
            <span>{activeTab === "junior-core" ? "Export Applications CSV" : "Export Teams CSV"}</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl bg-[#4A1028]/30 hover:bg-[#4A1028]/60 border border-[#5C2948] text-[#E07AB0] text-xs font-semibold flex items-center space-x-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={() => setActiveTab("junior-core")}
          className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
            activeTab === "junior-core"
              ? "bg-gradient-to-r from-[#5A1025] to-[#8F2450] text-[#F5F1F5] shadow-lg shadow-[#7A1833]/30 border border-[#8F2450]"
              : "bg-[#121015] hover:bg-[#18131B] text-[#A79EAB] hover:text-[#F5F1F5] border border-[#2A202D]"
          }`}
        >
          <Users className="w-4 h-4 text-[#E07AB0]" />
          <span>Junior Core Applications ({applications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("apocalypse")}
          className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
            activeTab === "apocalypse"
              ? "bg-gradient-to-r from-[#5A1025] to-[#8F2450] text-[#F5F1F5] shadow-lg shadow-[#7A1833]/30 border border-[#8F2450]"
              : "bg-[#121015] hover:bg-[#18131B] text-[#A79EAB] hover:text-[#F5F1F5] border border-[#2A202D]"
          }`}
        >
          <Flame className="w-4 h-4 text-[#E07AB0]" />
          <span>Apocalypse WIE X BC3 Teams ({apocalypseRegistrations.length})</span>
        </button>
      </div>

      {/* Notification Toast Alert */}
      {actionMessage && (
        <div className="p-3 rounded-xl bg-[#18131B] border border-[#5C2948] text-[#E07AB0] text-xs font-medium flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-[#C75491]" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2A. JUNIOR CORE APPLICATIONS VIEW                                          */}
      {/* ========================================================================= */}
      {activeTab === "junior-core" && (
        <div className="space-y-6">
          {/* Analytics Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-[#121015] border border-[#2A202D] p-5 space-y-1">
              <div className="text-xs font-medium text-[#A79EAB]">Total Applications</div>
              <div className="text-2xl sm:text-3xl font-bold text-[#F5F1F5]">{totalCount}</div>
            </div>
            <div className="rounded-2xl bg-[#121015] border border-[#2A202D] p-5 space-y-1">
              <div className="text-xs font-medium text-[#C75491]">Shortlisted</div>
              <div className="text-2xl sm:text-3xl font-bold text-[#E07AB0]">{shortlistedCount}</div>
            </div>
            <div className="rounded-2xl bg-[#121015] border border-[#2A202D] p-5 space-y-1">
              <div className="text-xs font-medium text-[#D05A9E]">Selected</div>
              <div className="text-2xl sm:text-3xl font-bold text-[#F5F1F5]">{selectedCount}</div>
            </div>
            <div className="rounded-2xl bg-[#121015] border border-[#2A202D] p-5 space-y-1">
              <div className="text-xs font-medium text-[#A79EAB]">Pending Review</div>
              <div className="text-2xl sm:text-3xl font-bold text-[#D8D0DA]">{pendingCount}</div>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="rounded-2xl bg-[#121015] border border-[#2A202D] p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A79EAB]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, enrollment, email..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0D0B0F] border border-[#2A202D] text-[#F5F1F5] placeholder-[#756B7A] text-xs focus:outline-none focus:border-[#C75491]"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              {/* Domain Filter */}
              <select
                value={domainFilter}
                onChange={(e) => setDomainFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#0D0B0F] border border-[#2A202D] text-[#F5F1F5] text-xs focus:outline-none focus:border-[#C75491]"
              >
                <option value="All">All Domains</option>
                <option value="Technical">Technical</option>
                <option value="Events">Events</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Public Relations">Public Relations</option>
                <option value="Content">Content</option>
                <option value="Social Media">Social Media</option>
                <option value="Operations">Operations</option>
                <option value="Research">Research</option>
                <option value="Other">Other</option>
              </select>

              {/* Year Filter */}
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#0D0B0F] border border-[#2A202D] text-[#F5F1F5] text-xs focus:outline-none focus:border-[#C75491]"
              >
                <option value="All">All Years</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#0D0B0F] border border-[#2A202D] text-[#F5F1F5] text-xs focus:outline-none focus:border-[#C75491]"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Selected">Selected</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Applications Data Table */}
          <div className="rounded-2xl bg-[#121015] border border-[#2A202D] overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#D8D0DA]">
                <thead className="bg-[#18131B] text-[#A79EAB] uppercase tracking-wider font-semibold border-b border-[#2A202D]">
                  <tr>
                    <th className="py-3.5 px-4">Applicant</th>
                    <th className="py-3.5 px-4">Enrollment</th>
                    <th className="py-3.5 px-4">Program & Year</th>
                    <th className="py-3.5 px-4">Domain</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A202D]">
                  {filteredApplications.length > 0 ? (
                    filteredApplications.map((app) => (
                      <tr
                        key={app.id}
                        className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                        onClick={() => setSelectedApplicant(app)}
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-[#F5F1F5] hover:text-[#C75491] transition-colors">
                            {app.fullName}
                          </div>
                          <div className="text-[11px] text-[#A79EAB]">{app.email}</div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[#E07AB0] font-semibold">
                          {app.enrollmentNumber}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-[#F5F1F5]">{app.course} ({app.branch})</div>
                          <div className="text-[11px] text-[#A79EAB]">{app.year} • {app.semester}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-md bg-[#18131B] border border-[#39283D] text-[#F5F1F5] font-medium">
                            {app.domain}
                          </span>
                        </td>
                        <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={app.status}
                            onChange={(e) =>
                              handleStatusChange(app.id, e.target.value as ApplicationStatus)
                            }
                            className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border focus:outline-none cursor-pointer bg-[#0D0B0F] ${getStatusBadge(
                              app.status
                            )}`}
                          >
                            {statusOptions.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-[#A79EAB] whitespace-nowrap">
                          {new Date(app.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </td>
                        <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end space-x-1">
                            <button
                              onClick={() => setSelectedApplicant(app)}
                              className="p-1.5 text-[#A79EAB] hover:text-[#C75491] rounded-lg hover:bg-white/5 transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(app.id)}
                              className="p-1.5 text-[#A79EAB] hover:text-[#E07AB0] rounded-lg hover:bg-[#4A1028]/30 transition-colors"
                              title="Delete Application"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-[#A79EAB]">
                        No applications match the current query or filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2B. APOCALYPSE 2026 TEAMS VIEW                                             */}
      {/* ========================================================================= */}
      {activeTab === "apocalypse" && (
        <div className="space-y-6">
          {/* Apocalypse Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-[#121015] border border-[#2A202D] p-5 space-y-1">
              <div className="text-xs font-medium text-[#A79EAB]">Registered Squads</div>
              <div className="text-2xl sm:text-3xl font-bold text-[#F5F1F5]">{totalApocalypseTeams}</div>
            </div>
            <div className="rounded-2xl bg-[#121015] border border-[#2A202D] p-5 space-y-1">
              <div className="text-xs font-medium text-[#C75491]">Total Competitors</div>
              <div className="text-2xl sm:text-3xl font-bold text-[#E07AB0]">
                {totalApocalypseParticipants}
              </div>
            </div>
            <div className="rounded-2xl bg-[#121015] border border-[#2A202D] p-5 space-y-1">
              <div className="text-xs font-medium text-[#D05A9E]">Avg. Squad Size</div>
              <div className="text-2xl sm:text-3xl font-bold text-[#F5F1F5]">{avgTeamSize} Members</div>
            </div>
            <div className="rounded-2xl bg-[#121015] border border-[#2A202D] p-5 space-y-1">
              <div className="text-xs font-medium text-[#A79EAB]">Event Schedule</div>
              <div className="text-xl sm:text-2xl font-bold text-[#D8D0DA]">24 SEP 2026</div>
            </div>
          </div>

          {/* Search Bar for Apocalypse */}
          <div className="rounded-2xl bg-[#121015] border border-[#2A202D] p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A79EAB]" />
              <input
                type="text"
                value={apocalypseSearch}
                onChange={(e) => setApocalypseSearch(e.target.value)}
                placeholder="Search by team name, member, enrollment, email..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0D0B0F] border border-[#2A202D] text-[#F5F1F5] placeholder-[#756B7A] text-xs focus:outline-none focus:border-[#C75491]"
              />
            </div>

            <div className="text-xs text-[#A79EAB]">
              Showing <span className="font-bold text-[#F5F1F5]">{filteredApocalypseTeams.length}</span> of{" "}
              {totalApocalypseTeams} squads
            </div>
          </div>

          {/* Apocalypse Teams Table */}
          <div className="rounded-2xl bg-[#121015] border border-[#2A202D] overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#D8D0DA]">
                <thead className="bg-[#18131B] text-[#A79EAB] uppercase tracking-wider font-semibold border-b border-[#2A202D]">
                  <tr>
                    <th className="py-3.5 px-4">Team Name</th>
                    <th className="py-3.5 px-4">Candidates</th>
                    <th className="py-3.5 px-4">Roster (Name &bull; Enrollment &bull; Phone)</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A202D]">
                  {filteredApocalypseTeams.length > 0 ? (
                    filteredApocalypseTeams.map((team) => (
                      <tr
                        key={team.id}
                        className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                        onClick={() => setSelectedTeam(team)}
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-[#F5F1F5] hover:text-[#C75491] transition-colors flex items-center space-x-1.5">
                            <Flame className="w-3.5 h-3.5 text-[#E07AB0]" />
                            <span>{team.teamName}</span>
                          </div>
                          <div className="text-[11px] text-[#A79EAB] font-mono">{team.id}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-full bg-[#18131B] border border-[#39283D] text-[#E07AB0] font-semibold text-[11px]">
                            {team.members.length} Candidates
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="space-y-1">
                            {team.members.map((m, i) => (
                              <div key={i} className="flex items-center space-x-2 text-[11px]">
                                <span className="font-medium text-[#F5F1F5]">{m.name}</span>
                                <span className="text-[#A79EAB]">&bull;</span>
                                <span className="font-mono text-[#C75491]">{m.enrollmentNumber}</span>
                                <span className="text-[#A79EAB]">&bull;</span>
                                <span className="text-[#D8D0DA]">{m.phone}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-[#A79EAB] whitespace-nowrap">
                          {new Date(team.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </td>
                        <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end space-x-1">
                            <button
                              onClick={() => setSelectedTeam(team)}
                              className="p-1.5 text-[#A79EAB] hover:text-[#C75491] rounded-lg hover:bg-white/5 transition-colors"
                              title="View Roster"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteTeam(team.id)}
                              className="p-1.5 text-[#A79EAB] hover:text-[#E07AB0] rounded-lg hover:bg-[#4A1028]/30 transition-colors"
                              title="Delete Team"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-[#A79EAB]">
                        No Apocalypse squads match your search query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. JUNIOR CORE APPLICANT DETAILS MODAL                                    */}
      {/* ========================================================================= */}
      {selectedApplicant && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedApplicant(null)}
          title={`Application Details - ${selectedApplicant.fullName}`}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-6 text-sm">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2A202D] pb-4">
              <div>
                <h3 className="text-xl font-bold text-[#F5F1F5]">{selectedApplicant.fullName}</h3>
                <p className="text-xs text-[#E07AB0] font-mono">
                  {selectedApplicant.enrollmentNumber} • {selectedApplicant.email} • {selectedApplicant.phone}
                </p>
                <p className="text-xs text-[#A79EAB] mt-0.5">
                  {selectedApplicant.course} in {selectedApplicant.branch} ({selectedApplicant.year}, {selectedApplicant.semester})
                </p>
              </div>

              {/* Status changer in modal */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-[#A79EAB]">Status:</span>
                <select
                  value={selectedApplicant.status}
                  onChange={(e) =>
                    handleStatusChange(selectedApplicant.id, e.target.value as ApplicationStatus)
                  }
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border bg-[#0D0B0F] focus:outline-none ${getStatusBadge(
                    selectedApplicant.status
                  )}`}
                >
                  {statusOptions.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Motivation */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#C75491]">
                Why do you want to join IEEE WIE?
              </h4>
              <p className="p-3.5 rounded-xl bg-[#121015] border border-[#2A202D] text-[#D8D0DA] leading-relaxed whitespace-pre-line text-xs">
                {selectedApplicant.whyJoin}
              </p>
            </div>

            {/* Skills & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#C75491]">
                  Skills & Tools
                </h4>
                <p className="p-3.5 rounded-xl bg-[#121015] border border-[#2A202D] text-[#D8D0DA] text-xs">
                  {selectedApplicant.skills}
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#D05A9E]">
                  Previous Experience
                </h4>
                <p className="p-3.5 rounded-xl bg-[#121015] border border-[#2A202D] text-[#D8D0DA] text-xs">
                  {selectedApplicant.previousExperience || "None specified"}
                </p>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#A79EAB]">
                Portfolio & Profiles
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedApplicant.portfolioUrl && (
                  <a
                    href={selectedApplicant.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#18131B] text-[#E07AB0] border border-[#39283D] text-xs hover:border-[#5C2948] transition-colors"
                  >
                    <span>Portfolio</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {selectedApplicant.linkedinUrl && (
                  <a
                    href={selectedApplicant.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#18131B] text-[#C75491] border border-[#39283D] text-xs hover:border-[#5C2948] transition-colors"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {selectedApplicant.githubUrl && (
                  <a
                    href={selectedApplicant.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#18131B] text-[#D05A9E] border border-[#39283D] text-xs hover:border-[#5C2948] transition-colors"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {!selectedApplicant.portfolioUrl &&
                  !selectedApplicant.linkedinUrl &&
                  !selectedApplicant.githubUrl && (
                    <span className="text-xs text-[#756B7A]">No profile links provided.</span>
                  )}
              </div>
            </div>

            {/* Additional info */}
            {selectedApplicant.additionalInfo && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#A79EAB]">
                  Additional Notes
                </h4>
                <p className="text-xs text-[#D8D0DA] bg-[#121015] p-3 rounded-xl border border-[#2A202D]">
                  {selectedApplicant.additionalInfo}
                </p>
              </div>
            )}

            {/* Bottom action row */}
            <div className="pt-4 border-t border-[#2A202D] flex items-center justify-between">
              <span className="text-xs text-[#756B7A]">
                Submitted: {new Date(selectedApplicant.createdAt).toLocaleString()}
              </span>
              <button
                onClick={() => handleDelete(selectedApplicant.id)}
                className="px-4 py-1.5 rounded-lg bg-[#4A1028]/30 text-[#E07AB0] hover:bg-[#4A1028]/60 border border-[#5C2948] text-xs font-medium flex items-center space-x-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ========================================================================= */}
      {/* 4. APOCALYPSE SQUAD ROSTER MODAL                                          */}
      {/* ========================================================================= */}
      {selectedTeam && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedTeam(null)}
          title={`Squad Details — ${selectedTeam.teamName}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-6 text-sm">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2A202D] pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-[#E07AB0]" />
                  <h3 className="text-xl font-bold text-[#F5F1F5]">{selectedTeam.teamName}</h3>
                </div>
                <p className="text-xs text-[#A79EAB] font-mono mt-1">
                  ID: <span className="text-[#E07AB0]">{selectedTeam.id}</span> • Registered:{" "}
                  {new Date(selectedTeam.createdAt).toLocaleString()}
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-[#18131B] border border-[#5C2948] text-xs font-semibold text-[#E07AB0]">
                {selectedTeam.members.length} Competitors (Min 2, Max 4)
              </span>
            </div>

            {/* Members List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#A79EAB]">
                Squad Roster
              </h4>

              <div className="space-y-2.5">
                {selectedTeam.members.map((member, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#121015] border border-[#2A202D] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-6 h-6 rounded-full bg-[#18131B] border border-[#39283D] text-xs font-bold text-[#E07AB0] flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="font-bold text-[#F5F1F5]">
                          {member.name}
                        </div>
                        <div className="text-xs font-mono text-[#C75491]">
                          {member.enrollmentNumber}
                        </div>
                      </div>
                    </div>

                    <div className="text-left sm:text-right text-xs">
                      <span className="text-[#A79EAB] block text-[10px]">Phone Number</span>
                      <span className="text-[#F5F1F5] font-mono">{member.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom action row */}
            <div className="pt-4 border-t border-[#2A202D] flex items-center justify-between">
              <span className="text-xs text-[#756B7A]">
                Event: 23 SEP 2026 • Apocalypse Arena
              </span>
              <button
                onClick={() => handleDeleteTeam(selectedTeam.id)}
                className="px-4 py-1.5 rounded-lg bg-[#4A1028]/30 text-[#E07AB0] hover:bg-[#4A1028]/60 border border-[#5C2948] text-xs font-medium flex items-center space-x-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Squad</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

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
} from "lucide-react";
import { JuniorCoreApplication, ApplicationStatus } from "@/lib/types";
import { Modal } from "@/components/ui/Modal";

const statusOptions: ApplicationStatus[] = ["Pending", "Shortlisted", "Selected", "Rejected"];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard Data
  const [applications, setApplications] = useState<JuniorCoreApplication[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [domainFilter, setDomainFilter] = useState("All");
  const [yearFilter, setYearFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApplicant, setSelectedApplicant] = useState<JuniorCoreApplication | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Check auth session
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/auth");
      const data = await res.json();
      setIsAuthenticated(data.isAuthenticated);
      if (data.isAuthenticated) {
        fetchApplications();
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

  // Metrics summary
  const totalCount = applications.length;
  const shortlistedCount = applications.filter((a) => a.status === "Shortlisted").length;
  const selectedCount = applications.filter((a) => a.status === "Selected").length;
  const pendingCount = applications.filter((a) => a.status === "Pending").length;

  // Status color helper
  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case "Selected":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
      case "Shortlisted":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/40";
      case "Rejected":
        return "bg-rose-500/20 text-rose-300 border-rose-500/40";
      default:
        return "bg-amber-500/20 text-amber-300 border-amber-500/40";
    }
  };

  // Loading initial auth state
  if (isAuthenticated === null) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-violet-500 border-t-transparent animate-spin" />
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
        <div className="glow-orb-cyan w-96 h-96 top-40 -right-20" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-md w-full rounded-3xl bg-slate-900/90 border border-violet-500/30 backdrop-blur-2xl p-8 shadow-2xl space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-cyan-500 p-0.5 mx-auto flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Lock className="w-6 h-6 text-violet-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Authentication</h1>
            <p className="text-xs text-slate-400">
              Enter the chapter administrator passkey to access the Junior Core recruitment portal.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Administrator Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 disabled:opacity-60 text-white font-semibold text-sm shadow-lg shadow-violet-600/30 transition-all flex items-center justify-center space-x-2"
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-violet-950 text-violet-300 border border-violet-500/30 text-[11px] font-semibold">
              Admin Portal
            </span>
            <span className="text-xs text-slate-400">• IEEE WIE Bennett University</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Junior Core Applications Management
          </h1>
        </div>

        <div className="flex items-center space-x-3 self-start md:self-auto">
          <button
            onClick={fetchApplications}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Refresh List"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-200 text-xs font-semibold flex items-center space-x-2 transition-colors"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center space-x-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Notification Toast Alert */}
      {actionMessage && (
        <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-slate-900/80 border border-white/8 p-5 space-y-1">
          <div className="text-xs font-medium text-slate-400">Total Applications</div>
          <div className="text-2xl sm:text-3xl font-bold text-white">{totalCount}</div>
        </div>
        <div className="rounded-2xl bg-slate-900/80 border border-white/8 p-5 space-y-1">
          <div className="text-xs font-medium text-cyan-400">Shortlisted</div>
          <div className="text-2xl sm:text-3xl font-bold text-cyan-300">{shortlistedCount}</div>
        </div>
        <div className="rounded-2xl bg-slate-900/80 border border-white/8 p-5 space-y-1">
          <div className="text-xs font-medium text-emerald-400">Selected</div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-300">{selectedCount}</div>
        </div>
        <div className="rounded-2xl bg-slate-900/80 border border-white/8 p-5 space-y-1">
          <div className="text-xs font-medium text-amber-400">Pending Review</div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-300">{pendingCount}</div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, enrollment, email..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-violet-500"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Domain Filter */}
          <select
            value={domainFilter}
            onChange={(e) => setDomainFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-violet-500"
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
            className="px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-violet-500"
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
            className="px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:border-violet-500"
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
      <div className="rounded-2xl bg-slate-900/80 border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
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
            <tbody className="divide-y divide-white/5">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                    onClick={() => setSelectedApplicant(app)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white hover:text-cyan-300 transition-colors">
                        {app.fullName}
                      </div>
                      <div className="text-[11px] text-slate-400">{app.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-cyan-300 font-semibold">
                      {app.enrollmentNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div>{app.course} ({app.branch})</div>
                      <div className="text-[11px] text-slate-400">{app.year} • {app.semester}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white font-medium">
                        {app.domain}
                      </span>
                    </td>
                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={app.status}
                        onChange={(e) =>
                          handleStatusChange(app.id, e.target.value as ApplicationStatus)
                        }
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border focus:outline-none cursor-pointer bg-slate-950 ${getStatusBadge(
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
                    <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                      {new Date(app.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() => setSelectedApplicant(app)}
                          className="p-1.5 text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-white/5"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(app.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-white/5"
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
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No applications match the current query or filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Applicant Details Modal */}
      {selectedApplicant && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedApplicant(null)}
          title={`Application Details - ${selectedApplicant.fullName}`}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-6 text-sm">
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedApplicant.fullName}</h3>
                <p className="text-xs text-cyan-300 font-mono">
                  {selectedApplicant.enrollmentNumber} • {selectedApplicant.email} • {selectedApplicant.phone}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {selectedApplicant.course} in {selectedApplicant.branch} ({selectedApplicant.year}, {selectedApplicant.semester})
                </p>
              </div>

              {/* Status changer in modal */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400">Status:</span>
                <select
                  value={selectedApplicant.status}
                  onChange={(e) =>
                    handleStatusChange(selectedApplicant.id, e.target.value as ApplicationStatus)
                  }
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border bg-slate-950 focus:outline-none ${getStatusBadge(
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
              <h4 className="text-xs font-bold uppercase tracking-wider text-violet-400">
                Why do you want to join IEEE WIE?
              </h4>
              <p className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 text-slate-200 leading-relaxed whitespace-pre-line text-xs">
                {selectedApplicant.whyJoin}
              </p>
            </div>

            {/* Skills & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Skills & Tools
                </h4>
                <p className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 text-slate-200 text-xs">
                  {selectedApplicant.skills}
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-pink-400">
                  Previous Experience
                </h4>
                <p className="p-3.5 rounded-xl bg-slate-950/70 border border-white/5 text-slate-200 text-xs">
                  {selectedApplicant.previousExperience || "None specified"}
                </p>
              </div>
            </div>

            {/* Links */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Portfolio & Profiles
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedApplicant.portfolioUrl && (
                  <a
                    href={selectedApplicant.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-cyan-300 border border-white/10 text-xs hover:bg-slate-700"
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
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-blue-300 border border-white/10 text-xs hover:bg-slate-700"
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
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-violet-300 border border-white/10 text-xs hover:bg-slate-700"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {!selectedApplicant.portfolioUrl &&
                  !selectedApplicant.linkedinUrl &&
                  !selectedApplicant.githubUrl && (
                    <span className="text-xs text-slate-500">No profile links provided.</span>
                  )}
              </div>
            </div>

            {/* Additional info */}
            {selectedApplicant.additionalInfo && (
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Additional Notes
                </h4>
                <p className="text-xs text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-white/5">
                  {selectedApplicant.additionalInfo}
                </p>
              </div>
            )}

            {/* Bottom action row */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Submitted: {new Date(selectedApplicant.createdAt).toLocaleString()}
              </span>
              <button
                onClick={() => handleDelete(selectedApplicant.id)}
                className="px-4 py-1.5 rounded-lg bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 border border-rose-500/30 text-xs font-medium flex items-center space-x-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

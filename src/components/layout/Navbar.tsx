"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on route transition
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#080B14]/85 backdrop-blur-xl border-b border-white/8 py-3 shadow-lg shadow-black/30"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Emblem */}
          <Link
            href="/"
            className="group flex items-center space-x-3 focus:outline-none"
            aria-label="IEEE Women in Engineering Bennett University Home"
          >
            {/* Custom IEEE WIE Emblem */}
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-lg shadow-violet-600/20 group-hover:shadow-violet-600/40 transition-shadow">
              <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
                <span className="font-extrabold text-sm tracking-tighter bg-gradient-to-r from-violet-300 via-white to-cyan-300 bg-clip-text text-transparent">
                  WIE
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-base tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  IEEE WIE
                </span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-violet-950/80 border border-violet-500/30 text-violet-300">
                  BU
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium tracking-wide">
                Bennett University
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-900/60 border border-white/8 backdrop-blur-md px-4 py-1.5 rounded-full">
            {siteConfig.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-violet-600/30 border border-violet-500/40 -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action & Admin Access */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/admin"
              className="p-2 text-slate-400 hover:text-white transition-colors"
              title="Admin Portal"
              aria-label="Admin Portal"
            >
              <ShieldCheck className="w-5 h-5" />
            </Link>

            <Link
              href="/junior-core"
              className="relative group inline-flex items-center space-x-2 px-5 py-2.5 rounded-full font-semibold text-xs tracking-wide uppercase overflow-hidden shadow-lg shadow-violet-600/25 transition-all duration-300 hover:shadow-violet-600/50 hover:scale-[1.02] focus:outline-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 transition-all duration-300 group-hover:opacity-90" />
              <span className="relative z-10 text-white flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                <span>Join Junior Core</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#080B14]/95 border-b border-white/10 backdrop-blur-2xl overflow-hidden px-4 pt-3 pb-6 space-y-4"
          >
            <div className="flex flex-col space-y-1">
              {siteConfig.navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                      isActive
                        ? "bg-violet-600/20 text-white border border-violet-500/30"
                        : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && <div className="w-2 h-2 rounded-full bg-cyan-400" />}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col space-y-3">
              <Link
                href="/junior-core"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-center text-sm shadow-md flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>Apply for Junior Core</span>
              </Link>

              <Link
                href="/admin"
                className="w-full py-2.5 rounded-xl bg-slate-900 border border-white/10 text-slate-300 text-xs font-medium text-center flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>Admin Login Portal</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

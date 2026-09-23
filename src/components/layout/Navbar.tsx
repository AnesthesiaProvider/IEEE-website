"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
          ? "bg-[#0A0C15]/90 backdrop-blur-xl border-b border-[#231B32] py-3 shadow-lg shadow-black/40"
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
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-[#34224E] via-[#712EB7] to-[#8A38D4] p-[1.5px] shadow-lg shadow-[#712EB7]/25 group-hover:shadow-[#712EB7]/40 transition-all duration-300 group-hover:scale-105 shrink-0 overflow-hidden">
              <div className="w-full h-full rounded-[10px] bg-[#0A0C15] flex items-center justify-center p-1">
                <Image
                  src="/images/wie-logo.png"
                  alt="IEEE WIE Bennett University"
                  width={38}
                  height={38}
                  className="w-full h-full object-contain filter drop-shadow-[0_0_4px_rgba(138,56,212,0.4)]"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-base tracking-tight text-[#FAF8FD] group-hover:text-[#C4B5FD] transition-colors">
                  IEEE WIE
                </span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-[#1A1428] border border-[#712EB7]/60 text-[#C4B5FD]">
                  BU
                </span>
              </div>
              <span className="text-[11px] text-[#797380] font-medium tracking-wide">
                Bennett University
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-[#0A0C15]/80 border border-[#231B32] backdrop-blur-md px-4 py-1.5 rounded-full">
            {siteConfig.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-colors duration-200 ${
                    isActive
                      ? "text-[#FAF8FD]"
                      : "text-[#CAC4D1] hover:text-[#FAF8FD] hover:bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-[#712EB7]/30 border border-[#712EB7]/50 -z-10"
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
              className="p-2 text-[#797380] hover:text-[#FAF8FD] transition-colors"
              title="Admin Portal"
              aria-label="Admin Portal"
            >
              <ShieldCheck className="w-5 h-5" />
            </Link>

            <Link
              href="/junior-core"
              className="relative group inline-flex items-center space-x-2 px-5 py-2.5 rounded-full font-semibold text-xs tracking-wide uppercase overflow-hidden shadow-lg shadow-[#712EB7]/30 transition-all duration-300 hover:shadow-[#712EB7]/50 hover:scale-[1.02] focus:outline-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#712EB7] via-[#8A38D4] to-[#712EB7] transition-all duration-300 group-hover:from-[#8A38D4] group-hover:to-[#A855F7]" />
              <span className="relative z-10 text-[#FFFFFF] flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C4B5FD]" />
                <span>Join Junior Core</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-[#120E1C]/90 border border-[#231B32] text-[#CAC4D1] hover:text-[#FAF8FD] focus:outline-none"
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
            className="md:hidden bg-[#0A0C15]/98 border-b border-[#231B32] backdrop-blur-2xl overflow-hidden px-4 pt-3 pb-6 space-y-4"
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
                        ? "bg-[#712EB7]/25 text-[#FAF8FD] border border-[#712EB7]/50"
                        : "text-[#CAC4D1] hover:bg-white/5"
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && <div className="w-2 h-2 rounded-full bg-[#8A38D4]" />}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#231B32] flex flex-col space-y-3">
              <Link
                href="/junior-core"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#712EB7] via-[#8A38D4] to-[#712EB7] hover:from-[#8A38D4] hover:to-[#A855F7] text-[#FFFFFF] font-semibold text-center text-sm shadow-md shadow-[#712EB7]/25 flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-[#C4B5FD]" />
                <span>Apply for Junior Core</span>
              </Link>

              <Link
                href="/admin"
                className="w-full py-2.5 rounded-xl bg-[#1A1428] border border-[#231B32] text-[#CAC4D1] text-xs font-medium text-center flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#797380]" />
                <span>Admin Login Portal</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

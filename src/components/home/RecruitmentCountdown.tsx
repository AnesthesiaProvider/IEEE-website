"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Flame, Clock, Lock } from "lucide-react";

// Target deadline: 23 September 2026 at 11:59:59 PM IST (Asia/Kolkata timezone)
const DEADLINE_ISO = "2026-09-23T23:59:59+05:30";
const DEADLINE_TIMESTAMP = new Date(DEADLINE_ISO).getTime();

interface TimeRemaining {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function calculateTimeRemaining(): TimeRemaining {
  const now = Date.now();
  const total = Math.max(0, DEADLINE_TIMESTAMP - now);
  const isExpired = total <= 0;

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
    isExpired,
  };
}

export function RecruitmentCountdown() {
  const [isMounted, setIsMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    total: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(calculateTimeRemaining());

    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeLeft(remaining);

      if (remaining.isExpired) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <section
      aria-label="Junior Core Recruitment Countdown"
      className="relative py-12 sm:py-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#1D162A]/95 via-[#161024]/90 to-[#0A0C15]/95 border border-[#34224E] shadow-2xl backdrop-blur-xl p-6 sm:p-10 lg:p-12 text-center">
          {/* Ambient Glow Accents */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#712EB7]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 right-10 w-72 h-72 bg-[#34224E]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Section Content */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            
            {/* Catchphrase / Urgency Flame Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1D162A]/80 border border-[#712EB7]/70 text-[#D88CF5] text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-[#712EB7]/20 animate-pulse">
              <Flame className="w-4 h-4 text-[#D88CF5] fill-[#D88CF5] animate-bounce" />
              <span>🔥 LESS THAN 50 SEATS LEFT FOR JUNIOR CORE!</span>
            </div>

            {/* Main Headings */}
            <div className="space-y-3">
              <span className="block text-xs font-extrabold uppercase tracking-widest text-[#D88CF5]">
                Bennett University Chapter
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#FAF8FD] tracking-tight">
                JUNIOR CORE RECRUITMENT
              </h2>
              <p className="text-sm sm:text-base text-[#CAC4D1] max-w-xl mx-auto leading-relaxed">
                &ldquo;Your opportunity to become a part of IEEE WIE Bennett University.&rdquo;
              </p>
            </div>

            {/* Countdown Grid or Closed Banner */}
            {isMounted && timeLeft.isExpired ? (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#1A1428] border border-[#34224E] max-w-lg mx-auto space-y-3">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1D162A] border border-[#712EB7] text-[#D88CF5] text-xs font-bold uppercase tracking-wider">
                  <Lock className="w-3.5 h-3.5" />
                  <span>APPLICATIONS CLOSED</span>
                </div>
                <p className="text-xs sm:text-sm text-[#CAC4D1]">
                  The recruitment deadline for this cohort has passed. Follow our official channels for future openings and community events!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* 4-Box Countdown Units */}
                <div
                  role="timer"
                  aria-live="polite"
                  className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-xl mx-auto"
                >
                  {[
                    { label: "DAYS", value: isMounted ? formatNumber(timeLeft.days) : "--" },
                    { label: "HOURS", value: isMounted ? formatNumber(timeLeft.hours) : "--" },
                    { label: "MINS", value: isMounted ? formatNumber(timeLeft.minutes) : "--" },
                    { label: "SECS", value: isMounted ? formatNumber(timeLeft.seconds) : "--" },
                  ].map((unit, idx) => (
                    <motion.div
                      key={unit.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="group relative flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-[#120E1C]/90 border border-[#34224E] shadow-inner transition-all duration-300 hover:border-[#712EB7] hover:shadow-[0_8px_24px_-8px_rgba(113,46,183,0.4)]"
                    >
                      {/* Subtle Top Gradient Accent */}
                      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#D88CF5]/60 to-transparent rounded-t-2xl" />

                      <span className="text-2xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight text-[#FAF8FD] tabular-nums group-hover:text-[#D88CF5] transition-colors">
                        {unit.value}
                      </span>
                      <span className="mt-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#797380] group-hover:text-[#CAC4D1] transition-colors">
                        {unit.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Deadline Notice */}
                <div className="flex items-center justify-center space-x-2 text-xs text-[#797380]">
                  <Clock className="w-3.5 h-3.5 text-[#712EB7]" />
                  <span>Applications close on 23 Sept 2026 at 11:59 PM IST</span>
                </div>
              </div>
            )}

            {/* CTA Application Button */}
            <div className="pt-3">
              {isMounted && timeLeft.isExpired ? (
                <button
                  disabled
                  className="px-8 py-3.5 rounded-full bg-[#1A1428] text-[#797380] font-semibold text-sm border border-[#34224E] cursor-not-allowed inline-flex items-center space-x-2 opacity-80"
                >
                  <Lock className="w-4 h-4" />
                  <span>APPLICATIONS CLOSED</span>
                </button>
              ) : (
                <Link
                  href="/junior-core"
                  className="relative group inline-flex items-center space-x-2.5 px-8 py-3.5 sm:px-10 sm:py-4 rounded-full font-bold text-sm sm:text-base tracking-wide text-[#FAF8FD] uppercase overflow-hidden shadow-xl shadow-[#712EB7]/40 transition-all duration-300 hover:scale-105 hover:shadow-[#712EB7]/60 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#712EB7] focus:ring-offset-2 focus:ring-offset-[#0A0C15]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#34224E] via-[#712EB7] to-[#876DBF] transition-all duration-300 group-hover:from-[#712EB7] group-hover:to-[#D88CF5]" />
                  <span className="relative z-10 flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-[#D88CF5]" />
                    <span>APPLY FOR JUNIOR CORE</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

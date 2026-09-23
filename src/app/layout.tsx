import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IEEE WIE Bennett University | Empowering Women in Engineering",
  description:
    "IEEE Women in Engineering at Bennett University — a community empowering students through technology, leadership, innovation, events, and collaboration.",
  keywords: [
    "IEEE WIE",
    "IEEE Women in Engineering",
    "Bennett University",
    "BU IEEE",
    "Engineering",
    "Computer Science",
    "Student Chapter",
    "Hackathon",
    "Workshops",
  ],
  authors: [{ name: "IEEE WIE Bennett University" }],
  creator: "IEEE WIE Bennett University Technical Team",
  openGraph: {
    title: "IEEE WIE Bennett University | Empowering Women in Engineering",
    description:
      "A community of innovators, creators, leaders, and future engineers working together to learn, build, and inspire at Bennett University.",
    url: "https://wie-bennett.edu.in",
    siteName: "IEEE WIE Bennett University",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IEEE WIE Bennett University | Empowering Women in Engineering",
    description:
      "IEEE Women in Engineering at Bennett University — empowering students to build fearlessly.",
  },
  icons: {
    icon: "/images/wie-logo.png",
    shortcut: "/favicon.ico",
    apple: "/images/wie-logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0C15",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} dark scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#0A0C15] text-[#FAF8FD] font-sans selection:bg-[#712EB7]/40 selection:text-[#D88CF5]">
        <Navbar />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

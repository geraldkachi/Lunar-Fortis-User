"use client";

import Link from "next/link";
import { Bell, User, ChevronDown } from "lucide-react";

interface NavbarProps {
  isLoggedIn?: boolean;
  hasIssue?: boolean;
}

export default function Navbar({ isLoggedIn = false, hasIssue = true }: NavbarProps) {
  return (
    <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#0D1B2A] rounded-sm" />
          <span className="font-bold text-[#0D1B2A] text-lg tracking-tight">
            Lunar Fortis
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link
                href="/become-provider"
                className="hidden sm:block border border-[#0D1B2A] text-[#0D1B2A] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#0D1B2A] hover:text-white transition-all duration-200"
              >
                Become A Service Provider
              </Link>
              <button className="relative w-9 h-9 rounded-full border border-[#E5E7EB] flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Bell size={16} className="text-[#0D1B2A]" />
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#E8392A] rounded-full text-white text-[8px] flex items-center justify-center font-bold">
                  1
                </span>
              </button>
              <button className="w-9 h-9 rounded-full bg-[#0D1B2A] flex items-center justify-center text-white text-xs font-bold hover:bg-[#1a2d40] transition-colors">
                AA
              </button>
            </>
          ) : (
            <span className="text-sm text-[#6B7280]">
              Having an issue?{" "}
              <Link href="/support" className="font-bold text-[#0D1B2A] hover:underline">
                Support
              </Link>
            </span>
          )}
        </div>
      </div>
    </header>
  );
}

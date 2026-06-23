"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, ShoppingCart, User, LogOut, BookOpen, ChevronDown } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { useState } from "react";

interface NavbarProps {
  variant?: "public" | "auth";
}

export default function Navbar({ variant = "public" }: NavbarProps) {
  const { user, cart, logout, isLoggedIn } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    router.push("/");
  };

  return (
    <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#0D1B2A] rounded-sm" />
          <span className="font-bold text-[#0D1B2A] text-lg tracking-tight">Lunar Fortis</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link
                href="/become-provider"
                className="hidden sm:block border border-[#0D1B2A] text-[#0D1B2A] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#0D1B2A] hover:text-white transition-all duration-200"
              >
                Become A Service Provider
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative w-9 h-9 rounded-full border border-[#E5E7EB] flex items-center justify-center hover:bg-gray-50 transition-colors">
                <ShoppingCart size={16} className="text-[#0D1B2A]" />
                {cart.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#E8392A] rounded-full text-white text-[9px] flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
              </Link>

              {/* Notifications */}
              <button className="relative w-9 h-9 rounded-full border border-[#E5E7EB] flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Bell size={16} className="text-[#0D1B2A]" />
              </button>

              {/* User dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1.5 w-9 h-9 rounded-full bg-[#0D1B2A] items-center justify-center text-white text-xs font-bold hover:bg-[#1a2d40] transition-colors"
                >
                  {user?.initials}
                </button>
                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                    <div className="absolute right-0 top-11 w-52 bg-white border border-[#E5E7EB] rounded-xl shadow-modal z-20 py-1 overflow-hidden">
                      <div className="px-4 py-3 border-b border-[#E5E7EB]">
                        <p className="text-sm font-semibold text-[#0D1B2A]">{user?.name}</p>
                        <p className="text-xs text-[#6B7280] truncate">{user?.email}</p>
                      </div>
                      <Link href="/my-bookings" onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#0D1B2A] hover:bg-[#F9FAFB] transition-colors">
                        <BookOpen size={15} />
                        My Bookings
                      </Link>
                      <Link href="/cart" onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#0D1B2A] hover:bg-[#F9FAFB] transition-colors">
                        <ShoppingCart size={15} />
                        Cart {cart.length > 0 && <span className="ml-auto text-xs bg-[#E8392A] text-white px-1.5 py-0.5 rounded-full">{cart.length}</span>}
                      </Link>
                      <div className="border-t border-[#E5E7EB] mt-1">
                        <button onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#E8392A] hover:bg-[#FEE2E2] transition-colors">
                          <LogOut size={15} />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#6B7280]">
                Having an issue?{" "}
                <Link href="/support" className="font-bold text-[#0D1B2A] hover:underline">Support</Link>
              </span>
              <Link href="/login"
                className="bg-[#0D1B2A] hover:bg-[#1a2d40] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

"use client";

import { Info } from "lucide-react";
import Link from "next/link";

interface SecureBookingModalProps {
  onClose?: () => void;
}

export default function SecureBookingModal({ onClose }: SecureBookingModalProps) {
  return (
    <div className="fixed inset-0 bg-[#0D1B2A]/60 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-modal">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-[#EEF3F8] flex items-center justify-center">
            <Info size={28} className="text-[#0D1B2A]" />
          </div>
        </div>

        <h3 className="text-base font-bold text-[#0D1B2A] text-center mb-2">
          Secure Your Booking
        </h3>
        <p className="text-xs text-[#6B7280] text-center mb-6">
          To continue, please log in or create an account. This helps us verify your identity and ensure a safe, seamless experience across all services.
        </p>

        <Link
          href="/login"
          className="block w-full bg-[#0D1B2A] hover:bg-[#1a2d40] text-white font-semibold py-3.5 px-6 rounded-xl text-center transition-colors text-sm"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

import { User, CheckCircle, Phone } from "lucide-react";
import type { Vendor } from "@/types";

interface VendorCardProps {
  vendor: Vendor;
  showCallButton?: boolean;
}

export default function VendorCard({ vendor, showCallButton = true }: VendorCardProps) {
  return (
    <div className="border border-[#E5E7EB] rounded-xl p-4">
      {/* Avatar + name */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-[#E8392A] flex items-center justify-center text-white font-bold text-sm">
          {vendor.name[0]}
        </div>
        <div>
          <h4 className="font-semibold text-[#0D1B2A] text-sm">{vendor.name}</h4>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="inline-flex items-center gap-1 bg-[#EEF3F8] text-[#0D1B2A] text-xs px-2.5 py-1 rounded-full font-medium">
          <User size={10} />
          {vendor.yearsOnPlatform}+ Years on Lunar Fortis
        </span>
        {vendor.verified && (
          <span className="inline-flex items-center gap-1 bg-[#EEF3F8] text-[#0D1B2A] text-xs px-2.5 py-1 rounded-full font-medium">
            <CheckCircle size={10} />
            Verified
          </span>
        )}
      </div>

      <p className="text-xs text-[#6B7280] mb-1">
        Date Registered: {vendor.dateRegistered}
      </p>
      <p className="text-xs text-[#6B7280] flex items-center gap-1 mb-4">
        <Phone size={10} />
        {vendor.availability === "typically_available"
          ? "Typically Available"
          : "Currently Unavailable"}
      </p>

      {showCallButton && (
        <button className="w-full bg-[#0D1B2A] hover:bg-[#1a2d40] text-white font-semibold py-3 px-4 rounded-xl transition-colors text-sm">
          Call Vendor
        </button>
      )}
    </div>
  );
}

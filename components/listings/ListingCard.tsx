import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowUpRight } from "lucide-react";
import type { Listing } from "@/types";
import { formatPrice } from "@/lib/mockData";

interface ListingCardProps {
  listing: Listing;
}

const VENDOR_COLORS: Record<string, string> = {
  "Adekay Houses": "bg-[#E8392A]",
  "Auto Giell": "bg-[#F59E0B]",
  "Minkail Autos": "bg-[#E8392A]",
  "Darry Autos": "bg-[#0D1B2A]",
  "Sure Lets": "bg-[#10B981]",
  "Darry Lets": "bg-[#6B7280]",
  "Merith House": "bg-[#8B5CF6]",
  Carbuddy: "bg-[#4F7FAF]",
  "Greyman Security Service": "bg-[#F59E0B]",
};

export default function ListingCard({ listing }: ListingCardProps) {
  const vendorColor = VENDOR_COLORS[listing.vendor.name] || "bg-[#0D1B2A]";
  const href = `/${listing.type === "accommodation" ? "apartments" : listing.type === "car" ? "cars" : "security"}/${listing.id}`;

  return (
    <Link href={href} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-200 border border-[#F3F4F6] hover:border-[#E5E7EB]">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#F3F4F6]">
          <Image
            src={listing.images[0]}
            alt={listing.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="font-semibold text-[#0D1B2A] text-sm leading-tight mb-1">
            {listing.title}
          </h3>

          {/* Tags */}
          <p className="text-xs text-[#6B7280] mb-2">
            {listing.tags.join(" • ")}
          </p>

          {/* Location + Vendor */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1">
              <MapPin size={11} className="text-[#6B7280]" />
              <span className="text-xs text-[#6B7280]">{listing.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <span
                className={`w-3.5 h-3.5 rounded-full ${vendorColor} flex items-center justify-center`}
              >
                <span className="text-white text-[7px] font-bold">
                  {listing.vendor.name[0]}
                </span>
              </span>
              <span className="text-xs text-[#6B7280] truncate max-w-[90px]">
                {listing.vendor.name}
              </span>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#0D1B2A]">
              {formatPrice(listing.pricePerDay)}
              <span className="text-xs font-normal text-[#6B7280]">/day</span>
            </span>
            <div className="flex items-center gap-0.5 text-[#E8392A] text-xs font-semibold">
              Book Now
              <ArrowUpRight size={12} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

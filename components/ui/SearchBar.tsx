"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ServiceCategory } from "@/types";

interface SearchBarProps {
  compact?: boolean;
  defaultCategory?: ServiceCategory;
  defaultQuery?: string;
}

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "accommodation", label: "Accommodation" },
  { value: "car", label: "Cars" },
  { value: "security", label: "Security" },
];

export default function SearchBar({
  compact = false,
  defaultCategory = "all",
  defaultQuery = "",
}: SearchBarProps) {
  const router = useRouter();
  const [category, setCategory] = useState<ServiceCategory>(defaultCategory);
  const [query, setQuery] = useState(defaultQuery);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (query) params.set("q", query);
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className={`flex items-center flex-wrap gap-2 ${compact ? "" : ""}`}>
      {/* Category select */}
      <div className="relative">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as ServiceCategory)}
          className="appearance-none bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg pl-3 pr-8 py-2.5 text-sm font-medium text-[#0D1B2A] outline-none cursor-pointer hover:border-[#0D1B2A] transition-colors"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none"
        />
      </div>

      {/* Search input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Car, security, accomodation"
        className="flex-1 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg px-4 py-2.5 text-sm text-[#0D1B2A] placeholder-[#9CA3AF] outline-none focus:border-[#0D1B2A] transition-colors min-w-0"
        style={{ minWidth: compact ? "140px" : "220px" }}
      />

      {/* Type filter */}
      <div className="relative hidden sm:block">
        <select className="appearance-none bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg pl-3 pr-8 py-2.5 text-sm font-medium text-[#6B7280] outline-none cursor-pointer hover:border-[#0D1B2A] transition-colors">
          <option>Type</option>
          <option>Manual</option>
          <option>Automatic</option>
        </select>
        <ChevronDown
          size={14}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none"
        />
      </div>

      {/* Price filter */}
      <div className="relative hidden sm:block">
        <select className="appearance-none bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg pl-3 pr-8 py-2.5 text-sm font-medium text-[#6B7280] outline-none cursor-pointer hover:border-[#0D1B2A] transition-colors">
          <option>Price</option>
          <option>Under ₦50k</option>
          <option>₦50k - ₦100k</option>
          <option>Over ₦100k</option>
        </select>
        <ChevronDown
          size={14}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none"
        />
      </div>

      {/* Location filter */}
      <div className="relative hidden md:block">
        <select className="appearance-none bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg pl-3 pr-8 py-2.5 text-sm font-medium text-[#6B7280] outline-none cursor-pointer hover:border-[#0D1B2A] transition-colors">
          <option>Location</option>
          <option>Lekki</option>
          <option>Ikeja</option>
          <option>Victoria Island</option>
        </select>
        <ChevronDown
          size={14}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none"
        />
      </div>

      {/* Search button */}
      <button
        onClick={handleSearch}
        className="bg-[#0D1B2A] hover:bg-[#1a2d40] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm whitespace-nowrap"
      >
        Search
      </button>
    </div>
  );
}

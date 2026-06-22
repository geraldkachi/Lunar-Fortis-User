import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, CalendarDays, Clock, ChevronDown } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VendorCard from "@/components/listings/VendorCard";
import ListingCard from "@/components/listings/ListingCard";
import { LISTINGS, SAFETY_TIPS, formatPrice } from "@/lib/mockData";
import SearchBar from "@/components/ui/SearchBar";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const listing = LISTINGS.find((l) => l.id === id);
  if (!listing) return { title: "Not Found" };
  return {
    title: `${listing.title} – ${listing.color} ${listing.transmission} in ${listing.location}`,
    description: `Book ${listing.title} in ${listing.location}. ${listing.color} • ${listing.fuel} • ${listing.transmission}. ${formatPrice(listing.pricePerDay)}/day.`,
  };
}

export async function generateStaticParams() {
  return LISTINGS.filter((l) => l.type === "car").map((l) => ({ id: l.id }));
}

export default async function CarDetailPage({ params }: Props) {
  const { id } = await params;
  const listing = LISTINGS.find((l) => l.id === id);
  if (!listing) notFound();

  const related = LISTINGS.filter(
    (l) => l.type === "car" && l.id !== listing.id
  ).slice(0, 4);

  return (
    <>
      <Navbar isLoggedIn={true} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <SearchBar defaultCategory="car" />
      </div>

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-[1fr_340px] gap-8">
          {/* Left */}
          <div>
            {/* Images */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src={listing.images[0]}
                  alt={listing.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="grid grid-rows-2 gap-2">
                {listing.images.slice(1, 3).map((img, i) => (
                  <div key={i} className="relative aspect-video rounded-xl overflow-hidden">
                    <Image
                      src={img}
                      alt={`${listing.title} view ${i + 2}`}
                      fill
                      className="object-cover"
                      sizes="25vw"
                    />
                  </div>
                ))}
              </div>
            </div>

            <h1 className="text-2xl font-bold text-[#0D1B2A] mb-1">
              {listing.title}
            </h1>
            <p className="text-sm text-[#6B7280] mb-4">
              {listing.color} • {listing.fuel} • {listing.transmission}
            </p>

            {/* Safety Tips */}
            <div className="border border-[#F59E0B] rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={16} className="text-[#F59E0B]" />
                <h3 className="font-semibold text-[#0D1B2A] text-sm">Safety Tips</h3>
              </div>
              <ul className="space-y-1.5">
                {SAFETY_TIPS.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#6B7280]">
                    <span className="text-[#0D1B2A] mt-0.5">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-[#0D1B2A] mb-2">Description</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">
                {listing.description}
              </p>
            </div>
          </div>

          {/* Right — Booking panel */}
          <div className="lg:sticky lg:top-20 space-y-4">
            <div className="border border-[#E5E7EB] rounded-xl p-5">
              <p className="text-2xl font-bold text-[#0D1B2A] mb-4">
                {formatPrice(listing.pricePerDay)}
                <span className="text-sm font-normal text-[#6B7280]">/day</span>
              </p>

              {/* Location */}
              <div className="mb-3">
                <label className="block text-xs text-[#6B7280] mb-1">Location</label>
                <input
                  type="text"
                  defaultValue="Lekki Peninsula"
                  className="lf-input text-sm"
                />
              </div>

              {/* Start Date */}
              <div className="mb-3">
                <label className="block text-xs text-[#6B7280] mb-1">Start Date</label>
                <div className="relative">
                  <input type="date" className="lf-input text-sm pr-10" defaultValue="2020-12-12" />
                  <CalendarDays size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
                </div>
              </div>

              {/* End Date */}
              <div className="mb-3">
                <label className="block text-xs text-[#6B7280] mb-1">End Date</label>
                <div className="relative">
                  <input type="date" className="lf-input text-sm pr-10" defaultValue="2020-12-12" />
                  <CalendarDays size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
                </div>
              </div>

              {/* Time */}
              <div className="mb-3">
                <label className="block text-xs text-[#6B7280] mb-1">Time</label>
                <div className="relative">
                  <input type="time" className="lf-input text-sm pr-10" defaultValue="12:00" />
                  <Clock size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
                </div>
              </div>

              {/* Driver Preference */}
              <div className="mb-3">
                <label className="block text-xs text-[#6B7280] mb-1">Driver Preference</label>
                <div className="relative">
                  <select className="lf-input pr-8 appearance-none text-sm">
                    <option>Chauffeur-driven</option>
                    <option>Self-drive</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
                </div>
              </div>

              {/* Geography */}
              <div className="mb-4">
                <label className="block text-xs text-[#6B7280] mb-1">Geography</label>
                <div className="relative">
                  <select className="lf-input pr-8 appearance-none text-sm">
                    <option>Inter-State</option>
                    <option>Intra-State</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
                </div>
              </div>

              <Link
                href="/login"
                className="block w-full bg-[#0D1B2A] hover:bg-[#1a2d40] text-white font-semibold py-4 px-6 rounded-xl text-center transition-colors text-sm"
              >
                Book
              </Link>
              <p className="text-xs text-center text-[#6B7280] mt-2">
                You won&apos;t be charged yet
              </p>
            </div>

            <VendorCard vendor={listing.vendor} />
          </div>
        </div>

        {/* Explore */}
        <div className="mt-12">
          <h2 className="text-lg font-bold text-[#0D1B2A] mb-4">Explore Other Options</h2>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#6B7280]">Need A Ride?</h3>
            <Link href="/cars" className="text-sm text-[#6B7280] hover:text-[#0D1B2A]">See More</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {related.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

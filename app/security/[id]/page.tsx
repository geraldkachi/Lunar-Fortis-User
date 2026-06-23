import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle } from "lucide-react";
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
    title: `${listing.title} – Security Escort Service`,
    description: `Book ${listing.title} security escort. ${listing.serviceType}. ${formatPrice(listing.pricePerDay)}/day.`,
  };
}

export async function generateStaticParams() {
  return LISTINGS.filter((l) => l.type === "security").map((l) => ({ id: l.id }));
}

export default async function SecurityDetailPage({ params }: Props) {
  const { id } = await params;
  const listing = LISTINGS.find((l) => l.id === id);
  if (!listing) notFound();

  const related = LISTINGS.filter(
    (l) => l.type === "security" && l.id !== listing.id
  ).slice(0, 4);

  return (
    <>
      <Navbar />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <SearchBar defaultCategory="security" />
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
                      alt={`${listing.title} ${i + 2}`}
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
            <p className="text-sm text-[#6B7280] mb-4">{listing.serviceType}</p>

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

          {/* Right */}
          <div className="lg:sticky lg:top-20 space-y-4">
            <VendorCard vendor={listing.vendor} showCallButton={false} />
            <Link
              href="/login"
              className="block w-full bg-[#0D1B2A] hover:bg-[#1a2d40] text-white font-semibold py-4 px-6 rounded-xl text-center transition-colors text-sm"
            >
              Book
            </Link>
          </div>
        </div>

        {/* Explore */}
        <div className="mt-12">
          <h2 className="text-lg font-bold text-[#0D1B2A] mb-4">Explore Other Options</h2>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#6B7280]">Need An Escort?</h3>
            <Link href="/security" className="text-sm text-[#6B7280] hover:text-[#0D1B2A]">See More</Link>
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

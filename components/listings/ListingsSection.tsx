import Link from "next/link";
import ListingCard from "./ListingCard";
import type { Listing } from "@/types";

interface ListingsSectionProps {
  title: string;
  listings: Listing[];
  seeMoreHref: string;
}

export default function ListingsSection({
  title,
  listings,
  seeMoreHref,
}: ListingsSectionProps) {
  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-[#0D1B2A]">{title}</h2>
        <Link
          href={seeMoreHref}
          className="text-sm text-[#6B7280] hover:text-[#0D1B2A] transition-colors"
        >
          See More
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </section>
  );
}

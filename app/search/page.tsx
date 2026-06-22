import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/ui/SearchBar";
import ListingCard from "@/components/listings/ListingCard";
import { LISTINGS } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "Search Results",
  description: "Find security escorts, car rentals, and shortlet apartments on Lunar Fortis.",
};

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const allListings = LISTINGS;

  return (
    <>
      <Navbar isLoggedIn={true} />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <SearchBar />
      </div>

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {allListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

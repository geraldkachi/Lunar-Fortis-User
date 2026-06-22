import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/ui/SearchBar";
import ListingCard from "@/components/listings/ListingCard";
import { LISTINGS } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "Shortlet Apartments in Lagos",
  description:
    "Browse verified shortlet apartments in Lekki, Ikeja, and across Lagos. Fully furnished with premium amenities.",
};

const apartments = LISTINGS.filter((l) => l.type === "accommodation");

export default function ApartmentsPage() {
  return (
    <>
      <Navbar isLoggedIn={true} />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <SearchBar defaultCategory="accommodation" />
      </div>

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[#6B7280] mb-4">
            Need A Shortlet Apartment?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {apartments.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

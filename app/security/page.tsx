import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/ui/SearchBar";
import ListingCard from "@/components/listings/ListingCard";
import { LISTINGS } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "Security Escort Services in Lagos",
  description:
    "Book professional armed security escorts in Lagos. Vetted professionals with premium vehicles available 24/7.",
};

const security = LISTINGS.filter((l) => l.type === "security");
const allSecurity = [...security, ...security, ...security, ...security];

export default function SecurityPage() {
  return (
    <>
      <Navbar isLoggedIn={true} />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <SearchBar defaultCategory="security" />
      </div>

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-8">
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[#6B7280] mb-4">
            Need An Escort?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {allSecurity.slice(0, 16).map((listing, i) => (
              <ListingCard key={`${listing.id}-${i}`} listing={listing} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

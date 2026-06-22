import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/ui/SearchBar";
import ListingCard from "@/components/listings/ListingCard";
import { LISTINGS } from "@/lib/mockData";

export const metadata: Metadata = {
  title: "Car Rentals in Lagos",
  description:
    "Book premium vehicles in Lagos. Land Cruiser Prado, Range Rover and more. Chauffeur-driven or self-drive options available.",
};

const cars = LISTINGS.filter((l) => l.type === "car");
// Repeat to show a full grid like in design
const allCars = [...cars, ...cars, ...cars, ...cars, ...cars];

export default function CarsPage() {
  return (
    <>
      <Navbar isLoggedIn={true} />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <SearchBar defaultCategory="car" />
      </div>

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-8">
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-[#6B7280] mb-4">
            Need A Ride?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {allCars.slice(0, 20).map((listing, i) => (
              <ListingCard key={`${listing.id}-${i}`} listing={listing} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

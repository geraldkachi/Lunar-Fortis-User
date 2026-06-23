"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock, ChevronDown } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { formatPrice } from "@/lib/mockData";

interface BookingPanelApartmentProps {
  listing: {
    id: string;
    title: string;
    images: string[];
    pricePerDay: number;
    location: string;
    type: "accommodation";
  };
}

interface BookingPanelCarProps {
  listing: {
    id: string;
    title: string;
    images: string[];
    pricePerDay: number;
    location: string;
    type: "car";
  };
}

type BookingPanelProps = BookingPanelApartmentProps | BookingPanelCarProps;

export function ApartmentBookingPanel({ listing }: BookingPanelApartmentProps) {
  const { isLoggedIn, addToCart } = useAuth();
  const router = useRouter();
  const [guests, setGuests] = useState("5");
  const [checkIn, setCheckIn] = useState("2020-12-12");
  const [checkOut, setCheckOut] = useState("2020-12-12");
  const [added, setAdded] = useState(false);

  const nights = Math.max(1,
    Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
  ) || 1;

  const handleAction = () => {
    if (!isLoggedIn) {
      router.push(`/login?redirect=/apartments/${listing.id}`);
      return;
    }
    addToCart({
      listingId: listing.id,
      title: listing.title,
      image: listing.images[0],
      pricePerDay: listing.pricePerDay,
      type: "accommodation",
      location: listing.location,
      guests: Number(guests),
      checkIn: new Date(checkIn).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }),
      checkOut: new Date(checkOut).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }),
      nights,
    });
    setAdded(true);
    setTimeout(() => router.push("/cart"), 600);
  };

  return (
    <div className="border border-[#E5E7EB] rounded-xl p-5">
      <p className="text-2xl font-bold text-[#0D1B2A] mb-4">
        {formatPrice(listing.pricePerDay)}
        <span className="text-sm font-normal text-[#6B7280]">/day</span>
      </p>

      <div className="mb-3">
        <label className="block text-xs text-[#6B7280] mb-1">Number of Guests</label>
        <div className="relative">
          <select value={guests} onChange={(e) => setGuests(e.target.value)} className="lf-input appearance-none pr-8 text-sm">
            {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-xs text-[#6B7280] mb-1">Check In</label>
        <div className="relative">
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="lf-input text-sm pr-10" />
          <CalendarDays size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-xs text-[#6B7280] mb-1">Check Out</label>
        <div className="relative">
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="lf-input text-sm pr-10" />
          <CalendarDays size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
        </div>
      </div>

      <button onClick={handleAction} disabled={added}
        className="w-full bg-[#0D1B2A] hover:bg-[#1a2d40] text-white font-semibold py-4 px-6 rounded-xl text-center transition-colors text-sm disabled:opacity-70">
        {added ? "Added to Cart ✓" : isLoggedIn ? "Add to Cart" : "Reserve"}
      </button>
      <p className="text-xs text-center text-[#6B7280] mt-2">You won't be charged yet</p>

      {!isLoggedIn && (
        <p className="text-xs text-center text-[#9CA3AF] mt-2">
          <span className="text-[#4F7FAF]">Sign in</span> to book this listing
        </p>
      )}
    </div>
  );
}

export function CarBookingPanel({ listing }: BookingPanelCarProps) {
  const { isLoggedIn, addToCart } = useAuth();
  const router = useRouter();
  const [location, setLocation] = useState("Lekki Peninsula");
  const [startDate, setStartDate] = useState("2020-12-12");
  const [endDate, setEndDate] = useState("2020-12-12");
  const [time, setTime] = useState("12:00");
  const [preference, setPreference] = useState("Chauffeur-driven");
  const [geography, setGeography] = useState("Inter-State");
  const [added, setAdded] = useState(false);

  const days = Math.max(1,
    Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))
  ) || 1;

  const handleAction = () => {
    if (!isLoggedIn) {
      router.push(`/login?redirect=/cars/${listing.id}`);
      return;
    }
    addToCart({
      listingId: listing.id,
      title: listing.title,
      image: listing.images[0],
      pricePerDay: listing.pricePerDay,
      type: "car",
      location,
      startDate: new Date(startDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }),
      endDate: new Date(endDate).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }),
      days,
      preference,
      geography,
      pickupTime: time,
    });
    setAdded(true);
    setTimeout(() => router.push("/cart"), 600);
  };

  return (
    <div className="border border-[#E5E7EB] rounded-xl p-5">
      <p className="text-2xl font-bold text-[#0D1B2A] mb-4">
        {formatPrice(listing.pricePerDay)}
        <span className="text-sm font-normal text-[#6B7280]">/day</span>
      </p>

      <div className="space-y-3 mb-4">
        <div>
          <label className="block text-xs text-[#6B7280] mb-1">Location</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} className="lf-input text-sm" />
        </div>
        <div>
          <label className="block text-xs text-[#6B7280] mb-1">Start Date</label>
          <div className="relative">
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="lf-input text-sm pr-10" />
            <CalendarDays size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="block text-xs text-[#6B7280] mb-1">End Date</label>
          <div className="relative">
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="lf-input text-sm pr-10" />
            <CalendarDays size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="block text-xs text-[#6B7280] mb-1">Time</label>
          <div className="relative">
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="lf-input text-sm pr-10" />
            <Clock size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="block text-xs text-[#6B7280] mb-1">Driver Preference</label>
          <div className="relative">
            <select value={preference} onChange={(e) => setPreference(e.target.value)} className="lf-input appearance-none pr-8 text-sm">
              <option>Chauffeur-driven</option>
              <option>Self-drive</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="block text-xs text-[#6B7280] mb-1">Geography</label>
          <div className="relative">
            <select value={geography} onChange={(e) => setGeography(e.target.value)} className="lf-input appearance-none pr-8 text-sm">
              <option>Inter-State</option>
              <option>Intra-State</option>
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
          </div>
        </div>
      </div>

      <button onClick={handleAction} disabled={added}
        className="w-full bg-[#0D1B2A] hover:bg-[#1a2d40] text-white font-semibold py-4 px-6 rounded-xl text-center transition-colors text-sm disabled:opacity-70">
        {added ? "Added to Cart ✓" : isLoggedIn ? "Add to Cart" : "Book"}
      </button>
      <p className="text-xs text-center text-[#6B7280] mt-2">You won't be charged yet</p>
    </div>
  );
}

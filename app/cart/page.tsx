"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/components/auth/AuthContext";
import { formatPrice } from "@/lib/mockData";

export default function CartPage() {
  const { isLoggedIn, cart, removeFromCart, placeBooking } = useAuth();
  const router = useRouter();
  const [placingId, setPlacingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) router.push("/login?redirect=/cart");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const total = cart.reduce((sum, item) => {
    const nights = item.nights ?? item.days ?? 1;
    return sum + item.pricePerDay * nights;
  }, 0);

  const handlePlaceBooking = async (itemId: string) => {
    setPlacingId(itemId);
    await new Promise((r) => setTimeout(r, 600));
    const booking = placeBooking(itemId);
    router.push(`/my-bookings/${booking.id}`);
  };

  return (
    <>
      <Navbar />
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[70vh]">
        <h1 className="text-2xl font-bold text-[#0D1B2A] mb-2">Your Cart</h1>
        <p className="text-sm text-[#6B7280] mb-8">Review your selections before submitting a booking request</p>

        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShoppingCart size={56} className="text-[#E5E7EB] mb-4" />
            <h2 className="text-xl font-bold text-[#0D1B2A] mb-2">Your cart is empty</h2>
            <p className="text-[#6B7280] mb-6 text-sm">Browse our listings and add services to get started.</p>
            <Link href="/" className="bg-[#0D1B2A] hover:bg-[#1a2d40] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
              Browse Listings
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_340px] gap-8">
            {/* Items */}
            <div className="space-y-4">
              {cart.map((item) => {
                const nights = item.nights ?? item.days ?? 1;
                const subtotal = item.pricePerDay * nights;
                return (
                  <div key={item.id} className="flex gap-4 bg-white border border-[#E5E7EB] rounded-2xl p-4">
                    <div className="relative w-24 h-20 rounded-xl overflow-hidden bg-[#F3F4F6] flex-shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-cover" sizes="96px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7280] bg-[#F3F4F6] px-2 py-0.5 rounded-full">
                            {item.type === "accommodation" ? "Shortlet" : item.type === "car" ? "Car Rental" : "Security"}
                          </span>
                          <h3 className="text-sm font-bold text-[#0D1B2A] mt-1">{item.title}</h3>
                          <p className="text-xs text-[#6B7280]">{item.location}</p>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-[#9CA3AF] hover:text-[#E8392A] transition-colors flex-shrink-0">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="mt-2 text-xs text-[#6B7280] space-y-0.5">
                        {item.type === "accommodation" && (<>
                          <p>Check-in: <span className="font-medium text-[#0D1B2A]">{item.checkIn}</span></p>
                          <p>Check-out: <span className="font-medium text-[#0D1B2A]">{item.checkOut}</span></p>
                          <p>Guests: <span className="font-medium text-[#0D1B2A]">{item.guests}</span> · {nights} night{nights > 1 ? "s" : ""}</p>
                        </>)}
                        {item.type === "car" && (<>
                          <p>From: <span className="font-medium text-[#0D1B2A]">{item.startDate}</span></p>
                          <p>To: <span className="font-medium text-[#0D1B2A]">{item.endDate}</span></p>
                          <p>Preference: <span className="font-medium text-[#0D1B2A]">{item.preference}</span> · {nights} day{nights > 1 ? "s" : ""}</p>
                        </>)}
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#F3F4F6]">
                        <span className="text-xs text-[#6B7280]">{formatPrice(item.pricePerDay)}/day × {nights}</span>
                        <span className="text-sm font-bold text-[#0D1B2A]">{formatPrice(subtotal)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div>
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 sticky top-20">
                <h3 className="text-base font-bold text-[#0D1B2A] mb-4">Order Summary</h3>
                <div className="space-y-2 mb-4">
                  {cart.map((item) => {
                    const nights = item.nights ?? item.days ?? 1;
                    return (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-[#6B7280] truncate max-w-[60%]">{item.title}</span>
                        <span className="font-medium text-[#0D1B2A]">{formatPrice(item.pricePerDay * nights)}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-[#E5E7EB] pt-3 mb-1">
                  <div className="flex justify-between text-base font-bold text-[#0D1B2A]">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Explain the flow */}
                <div className="bg-[#FEF3C7] border border-[#F59E0B]/30 rounded-xl p-3 mb-4 mt-3">
                  <p className="text-xs text-[#92400E] font-semibold mb-1">How it works</p>
                  <ol className="text-xs text-[#92400E] space-y-1 list-decimal list-inside">
                    <li>Submit your booking request</li>
                    <li>Vendor reviews and approves</li>
                    <li>Once approved, you can pay</li>
                    <li>Booking confirmed!</li>
                  </ol>
                </div>

                {cart.map((item) => (
                  <button key={item.id}
                    onClick={() => handlePlaceBooking(item.id)}
                    disabled={placingId === item.id}
                    className="flex items-center justify-center gap-2 w-full bg-[#0D1B2A] hover:bg-[#1a2d40] text-white font-semibold py-3.5 rounded-xl transition-colors text-sm mb-2 disabled:opacity-60">
                    {placingId === item.id
                      ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting...</>
                      : <>{item?.title.slice(0, 7)} Request Booking <ArrowRight size={15} /></>}
                  </button>
                ))}
                <p className="text-xs text-center text-[#6B7280] mt-1">You won&apos;t be charged until the vendor approves</p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

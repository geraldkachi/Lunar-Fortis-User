"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, MapPin, Calendar, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth, type BookingStatus } from "@/components/auth/AuthContext";
import { formatPrice } from "@/lib/mockData";
import { cn } from "@/lib/utils";

type FilterTab = "all" | "pending" | "approved" | "active" | "completed" | "cancelled";

const STATUS_STYLES: Record<BookingStatus, { label: string; cls: string }> = {
  pending:         { label: "Pending",   cls: "bg-[#FEF3C7] text-[#F59E0B]" },
  approved:        { label: "Approved",  cls: "bg-[#DBEAFE] text-[#3B82F6]" },
  payment_pending: { label: "Processing",cls: "bg-[#EDE9FE] text-[#8B5CF6]" },
  active:          { label: "Active",    cls: "bg-[#D1FAE5] text-[#10B981]" },
  completed:       { label: "Completed", cls: "bg-[#F3F4F6] text-[#6B7280]" },
  cancelled:       { label: "Cancelled", cls: "bg-[#FEE2E2] text-[#EF4444]" },
  declined:        { label: "Declined",  cls: "bg-[#FEE2E2] text-[#EF4444]" },
};

const TABS: { id: FilterTab; label: string }[] = [
  { id: "all",       label: "All" },
  { id: "pending",   label: "Pending" },
  { id: "approved",  label: "Approved" },
  { id: "active",    label: "Active" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

export default function MyBookingsPage() {
  const { isLoggedIn, bookings } = useAuth();
  const router = useRouter();
  const [filter, setFilter] = useState<FilterTab>("all");

  useEffect(() => {
    if (!isLoggedIn) router.push("/login?redirect=/my-bookings");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const filtered = bookings.filter((b) => {
    if (filter === "all") return true;
    if (filter === "cancelled") return b.status === "cancelled" || b.status === "declined";
    return b.status === filter;
  });

  const countFor = (tab: FilterTab) => {
    if (tab === "all") return bookings.length;
    if (tab === "cancelled") return bookings.filter(b => b.status === "cancelled" || b.status === "declined").length;
    return bookings.filter(b => b.status === tab).length;
  };

  return (
    <>
      <Navbar />
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[70vh]">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-[#0D1B2A]">My Bookings</h1>
        </div>
        <p className="text-[#6B7280] text-sm mb-6">Track and manage all your reservations</p>

        {/* Tabs */}
        <div className="flex gap-0.5 border-b border-[#E5E7EB] mb-6 overflow-x-auto">
          {TABS.map((t) => {
            const count = countFor(t.id);
            return (
              <button key={t.id} onClick={() => setFilter(t.id)}
                className={cn("px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap cursor-pointer",
                  filter === t.id ? "border-[#0D1B2A] text-[#0D1B2A]" : "border-transparent text-[#6B7280] hover:text-[#0D1B2A]")}>
                {t.label}
                {count > 0 && (
                  <span className={cn("ml-1.5 text-xs px-1.5 py-0.5 rounded-full",
                    filter === t.id ? "bg-[#0D1B2A] text-white" : "bg-[#F3F4F6] text-[#6B7280]")}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <BookOpen size={56} className="text-[#E5E7EB] mb-4" />
            <h2 className="text-xl font-bold text-[#0D1B2A] mb-2">No bookings found</h2>
            <p className="text-[#6B7280] text-sm mb-6">You don't have any {filter !== "all" ? filter : ""} bookings yet.</p>
            <Link href="/" className="bg-[#0D1B2A] text-white font-semibold px-6 py-3 rounded-xl text-sm hover:bg-[#1a2d40] transition-colors">
              Browse Listings
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((booking) => {
              const s = STATUS_STYLES[booking.status];
              const duration = booking.type === "accommodation"
                ? `${booking.nights} night${booking.nights! > 1 ? "s" : ""}`
                : `${booking.days} day${booking.days! > 1 ? "s" : ""}`;
              const dateRange = booking.type === "accommodation"
                ? `${booking.checkIn} → ${booking.checkOut}`
                : `${booking.startDate} → ${booking.endDate}`;
              const isApproved = booking.status === "approved";

              return (
                <Link key={booking.id} href={`/my-bookings/${booking.id}`}
                  className="flex items-center gap-4 bg-white border border-[#E5E7EB] hover:border-[#0D1B2A] rounded-2xl p-4 transition-all group">
                  <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-[#F3F4F6] flex-shrink-0">
                    <Image src={booking.image} alt={booking.title} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-sm font-bold text-[#0D1B2A] truncate">{booking.title}</h3>
                      <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0", s.cls)}>
                        {s.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#6B7280] mb-1.5">
                      <MapPin size={11} />{booking.location}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B7280]">
                      <span className="flex items-center gap-1"><Calendar size={11} />{dateRange}</span>
                      <span>·</span>
                      <span>{duration}</span>
                      <span>·</span>
                      <span className="font-semibold text-[#0D1B2A]">{formatPrice(booking.totalBilling)}</span>
                    </div>

                    {isApproved && (
                      <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-[#10B981] bg-[#D1FAE5] px-2 py-0.5 rounded-full">
                        ✓ Approved — tap to pay
                      </div>
                    )}
                    {booking.status === "pending" && (
                      <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold text-[#F59E0B] bg-[#FEF3C7] px-2 py-0.5 rounded-full">
                        ⏳ Awaiting vendor approval
                      </div>
                    )}
                  </div>
                  <ChevronRight size={16} className="text-[#9CA3AF] group-hover:text-[#0D1B2A] flex-shrink-0 transition-colors" />
                </Link>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

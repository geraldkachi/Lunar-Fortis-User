"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check, X, BookOpen, MapPin, Calendar } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/components/auth/AuthContext";
import { formatPrice } from "@/lib/mockData";
import { cn } from "@/lib/utils";

type FilterTab = "all" | "active" | "completed" | "cancelled";

function TrackingStep({ step, isLast }: {
  step: { key: string; label: string; time: string; completed: boolean };
  isLast: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className={cn("w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0",
          step.completed ? "bg-[#0D1B2A]" : "bg-[#E5E7EB]")}>
          {step.completed
            ? step.key === "cancelled"
              ? <X size={13} className="text-white" />
              : <Check size={13} className="text-white" strokeWidth={2.5} />
            : <div className="w-2 h-2 rounded-full bg-[#9CA3AF]" />}
        </div>
        {!isLast && <div className={cn("w-0.5 h-7", step.completed ? "bg-[#0D1B2A]" : "bg-[#E5E7EB]")} />}
      </div>
      <div className="pb-3">
        <p className={cn("text-xs font-semibold", step.completed ? "text-[#0D1B2A]" : "text-[#9CA3AF]")}>{step.label}</p>
        <p className={cn("text-[10px]", step.completed ? "text-[#6B7280]" : "text-[#C4C4C4]")}>{step.time}</p>
      </div>
    </div>
  );
}

export default function MyBookingsPage() {
  const { isLoggedIn, paidBookings } = useAuth();
  const router = useRouter();
  const [filter, setFilter] = useState<FilterTab>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) router.push("/login?redirect=/my-bookings");
  }, [isLoggedIn, router]);

  if (!isLoggedIn) return null;

  const filtered = paidBookings.filter((b) => {
    if (filter === "all") return true;
    return b.status === filter;
  });

  const tabs: { id: FilterTab; label: string }[] = [
    { id: "all", label: "All Bookings" },
    { id: "active", label: "Active" },
    { id: "completed", label: "Completed" },
    { id: "cancelled", label: "Cancelled" },
  ];

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      active: "bg-[#DBEAFE] text-[#3B82F6]",
      completed: "bg-[#D1FAE5] text-[#10B981]",
      cancelled: "bg-[#FEE2E2] text-[#EF4444]",
    };
    return map[status] ?? "bg-[#F3F4F6] text-[#6B7280]";
  };

  return (
    <>
      <Navbar />
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[70vh]">
        <h1 className="text-2xl font-bold text-[#0D1B2A] mb-2">My Bookings</h1>
        <p className="text-[#6B7280] text-sm mb-6">Track and manage all your reservations</p>

        {/* Filter tabs */}
        <div className="flex gap-1 border-b border-[#E5E7EB] mb-6">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setFilter(t.id)}
              className={cn("px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
                filter === t.id ? "border-[#0D1B2A] text-[#0D1B2A]" : "border-transparent text-[#6B7280] hover:text-[#0D1B2A]")}>
              {t.label}
              <span className="ml-1.5 text-xs bg-[#F3F4F6] text-[#6B7280] px-1.5 py-0.5 rounded-full">
                {t.id === "all" ? paidBookings.length : paidBookings.filter(b => b.status === t.id).length}
              </span>
            </button>
          ))}
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
          <div className="space-y-4">
            {filtered.map((booking) => (
              <div key={booking.id} className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-[#F3F4F6] flex-shrink-0">
                      <Image src={booking.image} alt={booking.title} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-base font-bold text-[#0D1B2A]">{booking.title}</h3>
                        <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full capitalize flex-shrink-0", statusBadge(booking.status))}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[#6B7280] mb-2">
                        <MapPin size={11} />
                        {booking.location}
                      </div>
                      <div className="flex flex-wrap gap-3 text-xs text-[#6B7280]">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {booking.type === "accommodation"
                            ? `${booking.checkIn} → ${booking.checkOut}`
                            : `${booking.startDate} → ${booking.endDate}`}
                        </span>
                        <span className="text-[#0D1B2A] font-semibold">{formatPrice(booking.totalBilling)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F3F4F6]">
                    <div>
                      <p className="text-xs text-[#6B7280]">Order ID</p>
                      <p className="text-xs font-bold text-[#0D1B2A]">{booking.orderId}</p>
                    </div>
                    <button
                      onClick={() => setExpanded(expanded === booking.id ? null : booking.id)}
                      className="text-xs text-[#4F7FAF] font-semibold hover:underline">
                      {expanded === booking.id ? "Hide Details" : "View Details"}
                    </button>
                  </div>
                </div>

                {/* Expanded details */}
                {expanded === booking.id && (
                  <div className="border-t border-[#E5E7EB] p-5 bg-[#F9FAFB]">
                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Booking info */}
                      <div>
                        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">BOOKING INFORMATION</p>
                        <div className="space-y-1.5 text-sm">
                          {booking.type === "accommodation" ? (
                            <>
                              <Row label="Check In" value={booking.checkIn!} />
                              <Row label="Check Out" value={booking.checkOut!} />
                              <Row label="Duration" value={`${booking.nights} night${booking.nights! > 1 ? "s" : ""}`} />
                            </>
                          ) : (
                            <>
                              <Row label="Start Date" value={booking.startDate!} />
                              <Row label="End Date" value={booking.endDate!} />
                              <Row label="Preference" value={booking.preference!} />
                              <Row label="Duration" value={`${booking.days} day${booking.days! > 1 ? "s" : ""}`} />
                            </>
                          )}
                          <Row label="Location" value={booking.location} />
                          <Row label="Paid On" value={booking.paidAt} />
                          <div className="flex justify-between border-t border-[#E5E7EB] pt-2 mt-2">
                            <span className="font-semibold text-[#0D1B2A]">Total Paid</span>
                            <span className="font-bold text-[#0D1B2A]">{formatPrice(booking.totalBilling)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Tracking */}
                      <div>
                        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">TRACKING PROGRESS</p>
                        {booking.trackingProgress.map((step, i) => (
                          <TrackingStep
                            key={step.key}
                            step={step}
                            isLast={i === booking.trackingProgress.length - 1}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-[#6B7280]">{label}</span>
      <span className="font-medium text-[#0D1B2A]">{value}</span>
    </div>
  );
}

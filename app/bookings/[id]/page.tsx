"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Phone, X, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ListingCard from "@/components/listings/ListingCard";
import { MOCK_BOOKING, MOCK_BOOKING_APARTMENT, COMPLETED_BOOKING, LISTINGS, formatPrice } from "@/lib/mockData";
import { formatCountdown } from "@/lib/utils";
import type { BookingInfo } from "@/types";

function TrackingProgress({ booking }: { booking: BookingInfo }) {
  const isCompleted = booking.status === "completed";

  return (
    <div>
      <h3 className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-4">
        TRACKING PROGRESS
      </h3>
      <div className="space-y-0">
        {booking.trackingProgress.map((step, i) => (
          <div key={step.key} className="flex gap-3">
            {/* Icon + line */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step.completed ? "bg-[#0D1B2A]" : "bg-[#E5E7EB]"
                }`}
              >
                {step.completed ? (
                  <Check size={14} className="text-white" strokeWidth={2.5} />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-[#9CA3AF]" />
                )}
              </div>
              {i < booking.trackingProgress.length - 1 && (
                <div className={`w-0.5 h-8 ${step.completed ? "bg-[#0D1B2A]" : "bg-[#E5E7EB]"}`} />
              )}
            </div>

            {/* Content */}
            <div className="pb-4">
              <p className={`text-sm font-semibold ${step.completed ? "text-[#0D1B2A]" : "text-[#9CA3AF]"}`}>
                {step.label}
              </p>
              {step.time && (
                <p className={`text-xs ${step.completed ? "text-[#6B7280]" : "text-[#9CA3AF]"}`}>
                  {step.time}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BookingPage() {
  // Use apartment booking for demo (shows more fields)
  const booking = MOCK_BOOKING_APARTMENT;
  const isCompleted = booking.status === "completed";
  const [countdown, setCountdown] = useState(booking.countdown || 7198);

  useEffect(() => {
    if (isCompleted) return;
    const timer = setInterval(() => {
      setCountdown((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [isCompleted]);

  const related = LISTINGS.filter((l) => l.type === "accommodation").slice(0, 4);
  const listing = booking.listing;
  const isCar = listing.type === "car";

  return (
    <>
      <Navbar />

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-16">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#0D1B2A] mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          BACK
        </Link>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          {/* Left — Booking info */}
          <div className="border border-[#E5E7EB] rounded-2xl p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-xl font-bold text-[#0D1B2A]">
                  {isCompleted ? "Booking History" : "Booking Tracking"}
                </h1>
                <p className="text-sm text-[#6B7280]">
                  {isCompleted ? "Order Information" : "Track your order status"}
                </p>
              </div>
              {isCompleted && (
                <span className="text-sm font-semibold text-[#6B7280] border border-[#E5E7EB] px-3 py-1.5 rounded-lg">
                  Booking Completed
                </span>
              )}
            </div>

            {/* Order ID */}
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-[#6B7280] mb-0.5">Order ID Detail</p>
                <p className="text-sm font-bold text-[#0D1B2A]">{booking.orderId}</p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                isCompleted ? "text-[#10B981] bg-[#D1FAE5]" : "text-[#F59E0B] bg-[#FEF3C7]"
              }`}>
                {isCompleted ? "Completed" : "Pending"}
              </span>
            </div>

            {/* Created date */}
            <div className="mb-6">
              <p className="text-xs text-[#6B7280] mb-0.5">Created Date</p>
              <p className="text-sm text-[#0D1B2A]">{booking.createdDate}</p>
            </div>

            {/* Booking info */}
            <div className="border border-[#E5E7EB] rounded-xl p-4">
              <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">
                BOOKING INFORMATION
              </p>

              {/* Item */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-[#F3F4F6] flex-shrink-0">
                  <Image
                    src={listing.images[0]}
                    alt={listing.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#0D1B2A]">{listing.title}</p>
                  <p className="text-xs text-[#6B7280]">
                    {isCar
                      ? `${listing.color} • ${listing.fuel} • ${listing.transmission}`
                      : listing.amenities?.join(" • ")}
                  </p>
                </div>
                <p className="text-sm font-bold text-[#0D1B2A] whitespace-nowrap">
                  {formatPrice(listing.pricePerDay)}/day
                </p>
              </div>

              {/* Details */}
              <div className="space-y-2">
                <DetailRow label="Location" value={booking.location} />
                {isCar ? (
                  <>
                    <DetailRow label="Start Date" value={booking.startDate} />
                    <DetailRow label="End Date" value={booking.endDate} />
                    <DetailRow label="Pick Up Time" value={booking.pickupTime!} />
                    <DetailRow label="Preference" value={booking.preference!} />
                    <DetailRow label="Geography" value={booking.geography!} />
                    <DetailRow label="Number of Days" value={String(booking.numberOfDays)} />
                  </>
                ) : (
                  <>
                    <DetailRow label="Check In Date" value={booking.checkInDate!} />
                    <DetailRow label="Check Out Date" value={booking.checkOutDate!} />
                    <DetailRow label="Check In Time" value={booking.checkInTime!} />
                    <DetailRow label="Number of Days" value={String(booking.numberOfDays)} />
                  </>
                )}
              </div>

              {/* Total */}
              <div className="border-t border-[#E5E7EB] mt-4 pt-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-[#0D1B2A]">Total Billing</p>
                <p className="text-base font-bold text-[#0D1B2A]">
                  {formatPrice(booking.totalBilling)}
                </p>
              </div>
            </div>
          </div>

          {/* Right — Tracking */}
          <div className="space-y-4">
            {/* Countdown + actions */}
            {!isCompleted && (
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-[#E8392A] font-mono">
                  {formatCountdown(countdown)}
                </span>
                <div className="flex gap-2">
                  <button className="btn-outline text-xs px-3 py-2 flex items-center gap-1.5">
                    <Phone size={13} />
                    Call Vendor
                  </button>
                  <button className="border border-[#E5E7EB] text-[#0D1B2A] text-xs font-semibold px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-1.5">
                    <X size={13} />
                    Cancel Booking
                  </button>
                </div>
              </div>
            )}

            <TrackingProgress booking={booking} />

            {/* CTA */}
            {isCompleted ? (
              <button
                disabled
                className="w-full bg-[#F3F4F6] text-[#9CA3AF] font-semibold py-4 px-6 rounded-xl text-sm cursor-not-allowed"
              >
                Booking Completed
              </button>
            ) : (
              <button
                className={`w-full font-semibold py-4 px-6 rounded-xl text-sm transition-colors ${
                  booking.trackingProgress.find((s) => s.key === "accepted")?.completed
                    ? "bg-[#0D1B2A] hover:bg-[#1a2d40] text-white"
                    : "bg-[#F3F4F6] text-[#9CA3AF] cursor-not-allowed"
                }`}
              >
                Proceed To Payment
              </button>
            )}
          </div>
        </div>

        {/* Explore Other Options */}
        <div className="mt-12">
          <h2 className="text-lg font-bold text-[#0D1B2A] mb-4">Explore Other Options</h2>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#6B7280]">
              Need A Shortlet Apartment?
            </h3>
            <Link href="/apartments" className="text-sm text-[#6B7280] hover:text-[#0D1B2A]">
              See More
            </Link>
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

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-[#6B7280]">{label}</span>
      <span className="text-xs font-medium text-[#0D1B2A]">{value}</span>
    </div>
  );
}

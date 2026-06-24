"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Phone, X, Check, Clock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ListingCard from "@/components/listings/ListingCard";
import { useAuth, type Booking, type BookingStatus } from "@/components/auth/AuthContext";
import { LISTINGS, formatPrice } from "@/lib/mockData";
import { cn } from "@/lib/utils";

// ── Countdown timer ───────────────────────────────────────────────────────────
function useCountdown(initial: number) {
  const [secs, setSecs] = useState(initial);
  useEffect(() => {
    const t = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

// ── Tracking progress ─────────────────────────────────────────────────────────
function TrackingProgress({ booking }: { booking: Booking }) {
  return (
    <div>
      <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-4">TRACKING PROGRESS</p>
      {booking.trackingProgress.map((step, i, arr) => (
        <div key={step.key} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
              step.failed ? "bg-[#EF4444]" : step.completed ? "bg-[#0D1B2A]" : "bg-[#E5E7EB]"
            )}>
              {step.failed
                ? <X size={14} className="text-white" />
                : step.completed
                ? <Check size={14} className="text-white" strokeWidth={2.5} />
                : <div className="w-2 h-2 rounded-full bg-[#9CA3AF]" />}
            </div>
            {i < arr.length - 1 && (
              <div className={cn("w-0.5 h-8", step.completed ? "bg-[#0D1B2A]" : "bg-[#E5E7EB]")} />
            )}
          </div>
          <div className="pb-3">
            <p className={cn("text-sm font-semibold",
              step.failed ? "text-[#EF4444]" : step.completed ? "text-[#0D1B2A]" : "text-[#9CA3AF]")}>
              {step.label}
            </p>
            {step.time && (
              <p className={cn("text-xs", step.completed ? "text-[#6B7280]" : "text-[#C4C4C4]")}>{step.time}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Status badge config ───────────────────────────────────────────────────────
const STATUS_CONFIG: Record<BookingStatus, { label: string; color: string; bg: string }> = {
  pending:         { label: "Pending",          color: "#F59E0B", bg: "#FEF3C7" },
  approved:        { label: "Approved",         color: "#3B82F6", bg: "#DBEAFE" },
  payment_pending: { label: "Processing...",    color: "#8B5CF6", bg: "#EDE9FE" },
  active:          { label: "Active",           color: "#10B981", bg: "#D1FAE5" },
  completed:       { label: "Completed",        color: "#6B7280", bg: "#F3F4F6" },
  cancelled:       { label: "Booking Canceled", color: "#EF4444", bg: "#FEE2E2" },
  declined:        { label: "Declined",         color: "#EF4444", bg: "#FEE2E2" },
};

// ── Pay modal ─────────────────────────────────────────────────────────────────
function PayModal({ booking, onClose, onSuccess }: {
  booking: Booking;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const { payBooking } = useAuth();
  const [method, setMethod] = useState<"card" | "transfer">("card");
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      await payBooking(booking.id);
      onSuccess();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
          <h3 className="text-base font-bold text-[#0D1B2A]">Complete Payment</h3>
          <button onClick={onClose} className="text-[#6B7280] hover:text-[#0D1B2A]"><X size={18} /></button>
        </div>

        <div className="px-6 py-5">
          {/* Summary */}
          <div className="bg-[#F9FAFB] rounded-xl p-4 mb-5">
            <div className="flex gap-3 items-center mb-3">
              <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-[#E5E7EB] flex-shrink-0">
                <Image src={booking.image} alt={booking.title} fill className="object-cover" sizes="48px" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0D1B2A]">{booking.title}</p>
                <p className="text-xs text-[#6B7280]">{booking.location}</p>
              </div>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#0D1B2A] border-t border-[#E5E7EB] pt-2">
              <span>Total to Pay</span>
              <span>{formatPrice(booking.totalBilling)}</span>
            </div>
          </div>

          {/* Method tabs */}
          <div className="flex gap-2 mb-4">
            {(["card", "transfer"] as const).map((m) => (
              <button key={m} onClick={() => setMethod(m)}
                className={cn("flex-1 py-2 rounded-xl border text-sm font-medium transition-colors",
                  method === m ? "bg-[#0D1B2A] text-white border-[#0D1B2A]" : "border-[#E5E7EB] text-[#6B7280] hover:border-[#0D1B2A]")}>
                {m === "card" ? "Pay with Card" : "Bank Transfer"}
              </button>
            ))}
          </div>

          {method === "card" && (
            <div className="space-y-3 mb-5">
              <input type="text" placeholder="Card number" maxLength={19} className="lf-input" />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="MM / YY" maxLength={5} className="lf-input" />
                <input type="text" placeholder="CVV" maxLength={3} className="lf-input" />
              </div>
              <input type="text" placeholder="Name on card" className="lf-input" />
            </div>
          )}

          {method === "transfer" && (
            <div className="bg-[#F9FAFB] rounded-xl p-4 mb-5 space-y-2">
              {[
                ["Bank", "Flutterwave / Lunar Fortis"],
                ["Account No.", "0123456789"],
                ["Account Name", "LUNAR FORTIS LTD"],
                ["Amount", formatPrice(booking.totalBilling)],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between text-xs">
                  <span className="text-[#6B7280]">{l}</span>
                  <span className="font-semibold text-[#0D1B2A]">{v}</span>
                </div>
              ))}
            </div>
          )}

          <button onClick={handlePay} disabled={loading}
            className="w-full bg-[#0D1B2A] hover:bg-[#1a2d40] text-white font-semibold py-4 rounded-xl transition-colors text-sm disabled:opacity-60 flex items-center justify-center gap-2">
            {loading
              ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Processing payment...</>
              : `Pay ${formatPrice(booking.totalBilling)}`}
          </button>
          <p className="text-xs text-center text-[#9CA3AF] mt-2">🔒 Secured by Flutterwave</p>
        </div>
      </div>
    </div>
  );
}

// ── Cancel confirm modal ───────────────────────────────────────────────────────
function CancelModal({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
        <div className="w-14 h-14 bg-[#FEE2E2] rounded-full flex items-center justify-center mx-auto mb-4">
          <X size={24} className="text-[#EF4444]" />
        </div>
        <h3 className="text-base font-bold text-[#0D1B2A] text-center mb-2">Cancel Booking?</h3>
        <p className="text-xs text-[#6B7280] text-center mb-6">
          Are you sure you want to cancel this booking? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 border border-[#E5E7EB] text-[#0D1B2A] font-semibold py-3 rounded-xl text-sm hover:bg-gray-50">Keep</button>
          <button onClick={onConfirm} className="flex-1 bg-[#EF4444] hover:bg-red-600 text-white font-semibold py-3 rounded-xl text-sm transition-colors">Yes, Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ── Payment success overlay ───────────────────────────────────────────────────
function PaySuccessOverlay({ booking, onClose }: { booking: Booking; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-8 shadow-2xl text-center">
        <div className="w-20 h-20 bg-[#D1FAE5] rounded-full flex items-center justify-center mx-auto mb-5">
          <Check size={36} className="text-[#10B981]" strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-[#0D1B2A] mb-2">Payment Successful!</h2>
        <p className="text-[#6B7280] text-sm mb-2">Your booking is now confirmed.</p>
        <p className="text-xs font-semibold text-[#0D1B2A] bg-[#F3F4F6] px-3 py-2 rounded-lg inline-block mb-6">
          {booking.orderId}
        </p>
        <div className="bg-[#F9FAFB] rounded-xl p-4 mb-6 text-left">
          <p className="text-xs text-[#6B7280] mb-1">Total Paid</p>
          <p className="text-xl font-bold text-[#0D1B2A]">{formatPrice(booking.totalBilling)}</p>
        </div>
        <button onClick={onClose}
          className="w-full bg-[#0D1B2A] hover:bg-[#1a2d40] text-white font-semibold py-3.5 rounded-xl transition-colors text-sm">
          View Booking Details
        </button>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { isLoggedIn, bookings, cancelBooking } = useAuth();
  const router = useRouter();
  const [showPayModal, setShowPayModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showPaySuccess, setShowPaySuccess] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
  }, [isLoggedIn, router]);

  const booking = bookings.find((b) => b.id === id);

  // ✅ MOVED: Call useCountdown BEFORE the early return
  const countdown = useCountdown(booking?.countdown ?? 0);
  const countdownDisplay = booking?.countdown ? countdown : null;

  if (!isLoggedIn || !booking) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-[#6B7280] mb-4">Booking not found.</p>
            <Link href="/my-bookings" className="text-sm text-[#4F7FAF] hover:underline">← My Bookings</Link>
          </div>
        </div>
      </>
    );
  }

  // const countdown = useCountdown(booking.countdown ?? 0);
  const cfg = STATUS_CONFIG[booking.status];
  const isCar = booking.type === "car";
  const isTerminal = ["completed", "cancelled", "declined"].includes(booking.status);
  const isPending = booking.status === "pending";
  const isApproved = booking.status === "approved";
  const isCompleted = booking.status === "completed";
  const isCancelled = booking.status === "cancelled" || booking.status === "declined";

  const related = LISTINGS.filter((l) => l.type === booking.type).slice(0, 4);

  const handleCancelConfirm = () => {
    cancelBooking(booking.id);
    setShowCancelModal(false);
  };

  const pageTitle = isCompleted ? "Booking History" : isCancelled ? "Booking Details" : "Booking Tracking";
  const pageSubtitle = isCompleted ? "Order Information" : "Track your order status";

  return (
    <>
      <Navbar />
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-16">
        {/* Back */}
        <Link href="/my-bookings"
          className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#0D1B2A] mb-6 transition-colors">
          <ArrowLeft size={15} />
          BACK
        </Link>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          {/* ── LEFT: Booking info ── */}
          <div className="border border-[#E5E7EB] rounded-2xl p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-xl font-bold text-[#0D1B2A]">{pageTitle}</h1>
                <p className="text-sm text-[#6B7280]">{pageSubtitle}</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-lg"
                style={{ color: cfg.color, background: cfg.bg }}>
                {cfg.label}
              </span>
            </div>

            {/* Order ID */}
            <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-[#6B7280] mb-0.5">Order ID Detail</p>
                <p className="text-sm font-bold text-[#0D1B2A]">{booking.orderId}</p>
              </div>
              <span className="text-xs font-semibold" style={{ color: isCompleted ? "#10B981" : cfg.color }}>
                {isCompleted ? "Completed" : cfg.label}
              </span>
            </div>

            {/* Created date */}
            <div className="mb-5">
              <p className="text-xs text-[#6B7280] mb-0.5">Created Date</p>
              <p className="text-sm text-[#0D1B2A] font-medium">{booking.bookedAt}</p>
            </div>

            {/* Booking info box */}
            <div className="border border-[#E5E7EB] rounded-xl p-4">
              <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">BOOKING INFORMATION</p>

              {/* Item */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-[#F3F4F6] flex-shrink-0">
                  <Image src={booking.image} alt={booking.title} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#0D1B2A]">{booking.title}</p>
                  {booking.amenities && <p className="text-xs text-[#6B7280]">{booking.amenities}</p>}
                  {isCar && <p className="text-xs text-[#6B7280]">Black • Petrol • Manual</p>}
                </div>
                <p className="text-sm font-bold text-[#0D1B2A] whitespace-nowrap">{formatPrice(booking.pricePerDay)}/day</p>
              </div>

              {/* Details */}
              <div className="space-y-2">
                <DetailRow label="Location" value={booking.location} />
                {isCar ? <>
                  <DetailRow label="Start Date" value={booking.startDate!} />
                  <DetailRow label="End Date" value={booking.endDate!} />
                  <DetailRow label="Pick Up Time" value={booking.pickupTime!} />
                  <DetailRow label="Preference" value={booking.preference!} />
                  <DetailRow label="Geography" value={booking.geography!} />
                  <DetailRow label="Number of Days" value={String(booking.days)} />
                </> : <>
                  <DetailRow label="Check In Date" value={booking.checkIn!} />
                  <DetailRow label="Check Out Date" value={booking.checkOut!} />
                  <DetailRow label="Check In Time" value="12:00 PM" />
                  <DetailRow label="Number of Days" value={String(booking.nights)} />
                </>}
              </div>

              {/* Total */}
              <div className="border-t border-[#E5E7EB] mt-4 pt-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-[#0D1B2A]">Total Billing</p>
                <p className="text-base font-bold text-[#0D1B2A]">{formatPrice(booking.totalBilling)}</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Tracking + CTAs ── */}
          <div className="space-y-4">
            {/* Countdown + action buttons — only when not terminal */}
            {!isTerminal && (
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-[#E8392A] font-mono">
                  {countdownDisplay || "00:00:00"}
                </span>
                <span className="text-xl font-bold text-[#E8392A] font-mono">{countdown}</span>
                <div className="flex gap-2">
                  {(isPending || isApproved) && (
                    <button className="flex items-center gap-1.5 border border-[#0D1B2A] text-[#0D1B2A] text-xs font-semibold px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                      <Phone size={13} />Call Vendor
                    </button>
                  )}
                  {(isPending || isApproved) && (
                    <button onClick={() => setShowCancelModal(true)}
                      className="flex items-center gap-1.5 border border-[#E5E7EB] text-[#0D1B2A] text-xs font-semibold px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                      <X size={13} />Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Cancelled badge header */}
            {isCancelled && (
              <div className="flex justify-end">
                <span className="text-xs font-semibold border border-[#E5E7EB] text-[#EF4444] px-3 py-1.5 rounded-lg">
                  {booking.status === "cancelled" ? "Booking Canceled" : "Booking Declined"}
                </span>
              </div>
            )}

            {/* Completed badge header */}
            {isCompleted && (
              <div className="flex justify-end">
                <span className="text-xs font-semibold border border-[#E5E7EB] text-[#0D1B2A] px-3 py-1.5 rounded-lg">
                  Booking Completed
                </span>
              </div>
            )}

            <TrackingProgress booking={booking} />

            {/* CTA button */}
            {isPending && (
              <div>
                <button disabled
                  className="w-full bg-[#F3F4F6] text-[#9CA3AF] font-semibold py-4 rounded-xl text-sm cursor-not-allowed">
                  Proceed To Payment
                </button>
                <div className="flex items-center gap-2 mt-2.5 bg-[#FEF3C7] rounded-xl px-3 py-2.5">
                  <Clock size={14} className="text-[#F59E0B] flex-shrink-0" />
                  <p className="text-xs text-[#92400E]">Waiting for vendor approval. Payment will be enabled once approved.</p>
                </div>
              </div>
            )}

            {isApproved && (
              <div>
                <button onClick={() => setShowPayModal(true)}
                  className="w-full bg-[#0D1B2A] hover:bg-[#1a2d40] text-white font-semibold py-4 rounded-xl text-sm transition-colors">
                  Proceed To Payment
                </button>
                <div className="flex items-center gap-2 mt-2.5 bg-[#D1FAE5] rounded-xl px-3 py-2.5">
                  <Check size={14} className="text-[#10B981] flex-shrink-0" />
                  <p className="text-xs text-[#065F46]">Your booking has been approved! You can now complete payment.</p>
                </div>
              </div>
            )}

            {booking.status === "active" && (
              <button disabled className="w-full bg-[#0D1B2A] text-white font-semibold py-4 rounded-xl text-sm">
                Booking Successful ✓
              </button>
            )}

            {isCompleted && (
              <button disabled className="w-full bg-[#F3F4F6] text-[#9CA3AF] font-semibold py-4 rounded-xl text-sm cursor-not-allowed">
                Booking Completed
              </button>
            )}

            {isCancelled && (
              <button disabled className="w-full bg-[#F3F4F6] text-[#9CA3AF] font-semibold py-4 rounded-xl text-sm cursor-not-allowed">
                {booking.status === "cancelled" ? "Booking Cancelled" : "Booking Declined"}
              </button>
            )}
          </div>
        </div>

        {/* Explore other options */}
        {!isCancelled && related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-lg font-bold text-[#0D1B2A] mb-4">Explore Other Options</h2>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#6B7280]">
                {booking.type === "accommodation" ? "Need A Shortlet Apartment?" : "Need A Ride?"}
              </h3>
              <Link href={booking.type === "accommodation" ? "/apartments" : "/cars"}
                className="text-sm text-[#6B7280] hover:text-[#0D1B2A]">See More</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((l) => <ListingCard key={l.id} listing={l} />)}
            </div>
          </div>
        )}
      </main>
      <Footer />

      {showPayModal && (
        <PayModal
          booking={booking}
          onClose={() => setShowPayModal(false)}
          onSuccess={() => { setShowPayModal(false); setShowPaySuccess(true); }}
        />
      )}
      {showCancelModal && (
        <CancelModal onCancel={() => setShowCancelModal(false)} onConfirm={handleCancelConfirm} />
      )}
      {showPaySuccess && (
        <PaySuccessOverlay
          booking={bookings.find((b) => b.id === id) ?? booking}
          onClose={() => setShowPaySuccess(false)}
        />
      )}
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

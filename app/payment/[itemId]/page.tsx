"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle, Lock, CreditCard, Building2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { useAuth } from "@/components/auth/AuthContext";
import { formatPrice } from "@/lib/mockData";

type PayMethod = "card" | "transfer";

export default function PaymentPage({ params }: { params: Promise<{ itemId: string }> }) {
  const { itemId } = use(params);
  const { isLoggedIn, cart, checkout } = useAuth();
  const router = useRouter();
  const [method, setMethod] = useState<PayMethod>("card");
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [paidBookingId, setPaidBookingId] = useState("");

  const item = cart.find((c) => c.id === itemId);

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
    if (isLoggedIn && !item) router.push("/cart");
  }, [isLoggedIn, item, router]);

  if (!item) return null;

  const nights = item.nights ?? item.days ?? 1;
  const total = item.pricePerDay * nights;

  const handlePay = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    const booking = checkout(itemId);
    setPaidBookingId(booking.id);
    setPaid(true);
    setLoading(false);
  };

  if (paid) {
    return (
      <>
        <Navbar />
        <div className="min-h-[calc(100vh-60px)] bg-[#F9FAFB] flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-modal p-10 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-[#D1FAE5] rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={40} className="text-[#10B981]" />
            </div>
            <h1 className="text-2xl font-bold text-[#0D1B2A] mb-2">Payment Successful!</h1>
            <p className="text-[#6B7280] text-sm mb-2">Your booking has been confirmed.</p>
            <div className="bg-[#F9FAFB] rounded-xl p-4 mb-6 text-left">
              <div className="flex gap-3 items-center mb-3">
                <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-[#F3F4F6] flex-shrink-0">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="48px" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0D1B2A]">{item.title}</p>
                  <p className="text-xs text-[#6B7280]">{item.location}</p>
                </div>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#0D1B2A] border-t border-[#E5E7EB] pt-2">
                <span>Amount Paid</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            <button onClick={() => router.push("/my-bookings")}
              className="w-full bg-[#0D1B2A] hover:bg-[#1a2d40] text-white font-semibold py-3.5 rounded-xl transition-colors text-sm mb-3">
              View My Bookings
            </button>
            <button onClick={() => router.push("/")}
              className="w-full border border-[#E5E7EB] text-[#0D1B2A] font-semibold py-3.5 rounded-xl hover:bg-gray-50 transition-colors text-sm">
              Back to Home
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-60px)] bg-[#F9FAFB] py-10 px-4">
        <div className="max-w-[900px] mx-auto">
          <h1 className="text-2xl font-bold text-[#0D1B2A] mb-8">Complete Payment</h1>

          <div className="grid lg:grid-cols-[1fr_340px] gap-6">
            {/* Payment methods */}
            <div className="space-y-4">
              {/* Method tabs */}
              <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5">
                <h2 className="text-base font-bold text-[#0D1B2A] mb-4">Payment Method</h2>
                <div className="flex gap-3 mb-5">
                  {([
                    { id: "card", label: "Card", icon: CreditCard },
                    { id: "transfer", label: "Bank Transfer", icon: Building2 },
                  ] as const).map(({ id, label, icon: Icon }) => (
                    <button key={id} onClick={() => setMethod(id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                        method === id
                          ? "border-[#0D1B2A] bg-[#0D1B2A] text-white"
                          : "border-[#E5E7EB] text-[#6B7280] hover:border-[#0D1B2A]"
                      }`}>
                      <Icon size={15} />
                      {label}
                    </button>
                  ))}
                </div>

                {method === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-[#6B7280] mb-1.5">Card Number</label>
                      <input type="text" placeholder="1234 5678 9012 3456" maxLength={19}
                        className="lf-input" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-[#6B7280] mb-1.5">Expiry Date</label>
                        <input type="text" placeholder="MM / YY" maxLength={5} className="lf-input" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#6B7280] mb-1.5">CVV</label>
                        <input type="text" placeholder="123" maxLength={3} className="lf-input" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#6B7280] mb-1.5">Cardholder Name</label>
                      <input type="text" placeholder="Name on card" className="lf-input" />
                    </div>
                  </div>
                )}

                {method === "transfer" && (
                  <div className="bg-[#F9FAFB] rounded-xl p-4 space-y-3">
                    <p className="text-sm font-semibold text-[#0D1B2A]">Transfer to this account:</p>
                    <div className="space-y-2 text-sm">
                      {[
                        ["Bank Name", "Flutterwave / Lunar Fortis"],
                        ["Account Number", "0123456789"],
                        ["Account Name", "LUNAR FORTIS LTD"],
                        ["Amount", formatPrice(total)],
                        ["Reference", `LF-${Date.now().toString().slice(-8)}`],
                      ].map(([l, v]) => (
                        <div key={l} className="flex justify-between">
                          <span className="text-[#6B7280]">{l}</span>
                          <span className="font-semibold text-[#0D1B2A]">{v}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-[#F59E0B] bg-[#FEF3C7] px-3 py-2 rounded-lg">
                      Payment will be confirmed within 5–10 minutes after transfer.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                <Lock size={12} />
                Your payment information is encrypted and secure
              </div>
            </div>

            {/* Order summary */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-5 h-fit sticky top-20">
              <h3 className="text-base font-bold text-[#0D1B2A] mb-4">Order Summary</h3>
              <div className="flex gap-3 mb-4">
                <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-[#F3F4F6] flex-shrink-0">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="64px" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0D1B2A]">{item.title}</p>
                  <p className="text-xs text-[#6B7280]">{item.location}</p>
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4">
                {item.type === "accommodation" && (
                  <>
                    <div className="flex justify-between text-[#6B7280]">
                      <span>Check-in</span><span className="font-medium text-[#0D1B2A]">{item.checkIn}</span>
                    </div>
                    <div className="flex justify-between text-[#6B7280]">
                      <span>Check-out</span><span className="font-medium text-[#0D1B2A]">{item.checkOut}</span>
                    </div>
                    <div className="flex justify-between text-[#6B7280]">
                      <span>Duration</span><span className="font-medium text-[#0D1B2A]">{nights} night{nights > 1 ? "s" : ""}</span>
                    </div>
                  </>
                )}
                {item.type === "car" && (
                  <>
                    <div className="flex justify-between text-[#6B7280]">
                      <span>Start Date</span><span className="font-medium text-[#0D1B2A]">{item.startDate}</span>
                    </div>
                    <div className="flex justify-between text-[#6B7280]">
                      <span>End Date</span><span className="font-medium text-[#0D1B2A]">{item.endDate}</span>
                    </div>
                    <div className="flex justify-between text-[#6B7280]">
                      <span>Preference</span><span className="font-medium text-[#0D1B2A]">{item.preference}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between text-[#6B7280]">
                  <span>{formatPrice(item.pricePerDay)} × {nights} {item.type === "car" ? "day" : "night"}{nights > 1 ? "s" : ""}</span>
                  <span className="font-medium text-[#0D1B2A]">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="border-t border-[#E5E7EB] pt-3 mb-5">
                <div className="flex justify-between text-base font-bold text-[#0D1B2A]">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <button onClick={handlePay} disabled={loading}
                className="w-full bg-[#0D1B2A] hover:bg-[#1a2d40] text-white font-semibold py-4 rounded-xl transition-colors text-sm disabled:opacity-60 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Pay {formatPrice(total)}</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

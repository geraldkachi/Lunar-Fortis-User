"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import AuthCard from "@/components/auth/AuthCard";
import OTPInput from "@/components/auth/OTPInput";

export default function VerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length < 4) {
      setError("Please enter the complete 4-digit code.");
      return;
    }
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 800));
    // Simulate wrong code for demo
    if (code !== "1234") {
      setError("Error, the OTP you entered has expired, click on the resend code to get a new OTP code.");
      setLoading(false);
      return;
    }
    router.push("/");
  };

  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setError("");
    // In real app: call resend API
  };

  return (
    <>
      <Navbar />
      <AuthCard>
        <h2 className="text-xl font-bold text-[#0D1B2A] mb-2">
          Two-Factor Authentication (2FA)
        </h2>
        <p className="text-sm text-[#6B7280] mb-6">
          To log in, kindly enter the verification code sent to your email address, the code expires in 10 minutes
        </p>

        <OTPInput value={otp} onChange={setOtp} />

        <p className="text-sm text-[#6B7280] mt-4">
          Didn&apos;t get any code?{" "}
          <button
            onClick={handleResend}
            className="text-[#4F7FAF] font-semibold hover:underline italic"
          >
            Resend code
          </button>
        </p>

        {error && (
          <div className="mt-4 flex items-start gap-3 bg-white border border-[#E5E7EB] rounded-xl p-3">
            <div className="w-6 h-6 rounded-full bg-[#0D1B2A] flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertCircle size={12} className="text-white" />
            </div>
            <p className="text-xs text-[#6B7280]">{error}</p>
          </div>
        )}

        <button
          onClick={handleVerify}
          disabled={loading}
          className="btn-primary mt-6 disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Login"}
        </button>

        <p className="text-center text-sm text-[#6B7280] mt-4">
          Any trouble?{" "}
          <Link href="/support" className="font-semibold text-[#4F7FAF] italic hover:underline">
            Contact Support
          </Link>
        </p>

        <p className="text-center text-sm text-[#6B7280] mt-2">
          New user?{" "}
          <Link href="/signup" className="font-semibold text-[#4F7FAF] italic hover:underline">
            Create account
          </Link>
        </p>
      </AuthCard>

      <div className="fixed bottom-0 left-0 right-0 bg-[#D1D5DB] py-4 px-8 flex justify-between items-center text-sm">
        <span>
          Any trouble?{" "}
          <Link href="/support" className="font-bold text-[#0D1B2A]">
            Contact support
          </Link>
        </span>
        <div className="flex gap-4 text-[#6B7280]">
          <Link href="/privacy" className="hover:text-[#0D1B2A]">Privacy</Link>
          <span>|</span>
          <Link href="/terms" className="hover:text-[#0D1B2A]">Terms</Link>
        </div>
      </div>
    </>
  );
}

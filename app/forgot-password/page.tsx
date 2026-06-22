"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Trophy } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import AuthCard from "@/components/auth/AuthCard";
import OTPInput from "@/components/auth/OTPInput";

type Step = "email" | "otp" | "reset" | "success";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setStep("otp");
  };

  const handleOTPSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setStep("reset");
  };

  const handleReset = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setStep("success");
  };

  const progressStep = { email: 1, otp: 2, reset: 3, success: 3 }[step];

  return (
    <>
      <Navbar />
      <AuthCard>
        {/* Progress bar */}
        <div className="flex gap-1 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors ${
                s <= progressStep ? "bg-[#0D1B2A]" : "bg-[#E5E7EB]"
              }`}
            />
          ))}
        </div>

        {step === "email" && (
          <>
            <h2 className="text-xl font-bold text-[#0D1B2A] mb-6">
              Reset Password
            </h2>
            <div className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E.g johndoe@gmail.com"
                className="lf-input"
              />
              <button
                onClick={handleEmailSubmit}
                disabled={loading}
                className="btn-primary disabled:opacity-60"
              >
                {loading ? "Verifying..." : "Verify Account"}
              </button>
              <p className="text-center text-sm text-[#6B7280]">
                Got an account?{" "}
                <Link href="/login" className="font-semibold text-[#0D1B2A] hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </>
        )}

        {step === "otp" && (
          <>
            <h2 className="text-xl font-bold text-[#0D1B2A] mb-6">
              Reset Password
            </h2>
            <OTPInput value={otp} onChange={setOtp} />
            <p className="text-sm text-[#6B7280] mt-4 mb-6">
              Didn&apos;t get any code?{" "}
              <button className="text-[#4F7FAF] font-semibold hover:underline italic">
                Resend code
              </button>
            </p>
            <button
              onClick={handleOTPSubmit}
              disabled={loading}
              className="btn-primary disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify Account"}
            </button>
            <p className="text-center text-sm text-[#6B7280] mt-4">
              Got an account?{" "}
              <Link href="/login" className="font-semibold text-[#0D1B2A] hover:underline">
                Sign in
              </Link>
            </p>
          </>
        )}

        {step === "reset" && (
          <>
            <h2 className="text-xl font-bold text-[#0D1B2A] mb-6">
              Reset Password
            </h2>
            <div className="space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">
                  <Lock size={16} />
                </span>
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password"
                  className="lf-input pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-xs text-[#9CA3AF]">
                Password must be at least{" "}
                <span className="font-semibold text-[#0D1B2A]">8 Characters</span>{" "}
                and must contain at least a Capital Letter, a Number and a Special Character
              </p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">
                  <Lock size={16} />
                </span>
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="lf-input pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280]"
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <button
                onClick={handleReset}
                disabled={loading}
                className="btn-primary disabled:opacity-60"
              >
                {loading ? "Resetting..." : "Verify Account"}
              </button>
              <p className="text-center text-sm text-[#6B7280]">
                Got an account?{" "}
                <Link href="/login" className="font-semibold text-[#0D1B2A] hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </>
        )}

        {step === "success" && (
          <div className="text-center py-4">
            <div className="w-20 h-20 mx-auto mb-4 text-[#0D1B2A]">
              <Trophy size={80} strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-bold text-[#0D1B2A] mb-3">
              Password Reset
            </h2>
            <p className="text-sm text-[#6B7280] mb-6">
              Your password reset process for your account has been successfully completed. You can now access your account with your new password.
            </p>
            <button
              onClick={() => router.push("/login")}
              className="btn-primary"
            >
              Login
            </button>
          </div>
        )}
      </AuthCard>

      <div className="fixed bottom-0 left-0 right-0 bg-[#D1D5DB] py-4 px-8 flex justify-between items-center text-sm">
        <span>
          Any trouble?{" "}
          <Link href="/support" className="font-bold text-[#0D1B2A]">
            Contact support
          </Link>
        </span>
        <div className="flex gap-4 text-[#6B7280]">
          <Link href="/privacy">Privacy</Link>
          <span>|</span>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </>
  );
}

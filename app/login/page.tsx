"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import AuthCard from "@/components/auth/AuthCard";
import { useAuth } from "@/components/auth/AuthContext";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError("Please enter your email address."); return; }
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      router.push(redirect);
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-60px)] bg-[#D1D5DB] flex flex-col items-center justify-center px-4 pb-16">
        <AuthCard>
          <h1 className="text-2xl font-bold text-[#0D1B2A] mb-1 leading-tight">
            Continue from where<br />you left off
          </h1>
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#6B7280] mb-1.5">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" className="lf-input" autoFocus />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6B7280] mb-1.5">Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]"><Lock size={16} /></span>
                <input type={showPassword ? "text" : "password"} value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••" className="lf-input pl-20 pr-20" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#0D1B2A]">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-xs text-[#9CA3AF] mt-1.5">
                Password must be at least <span className="font-semibold text-[#0D1B2A]">8 Characters</span>{" "}
                and must contain at least a <span className="font-semibold text-[#E8392A]">Capital Letter</span>,
                a Number and a Special Character
              </p>
            </div>
            {error && (
              <p className="text-xs text-[#E8392A] bg-[#FEE2E2] px-3 py-2 rounded-lg">{error}</p>
            )}
            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-[#4F7FAF] hover:underline">
                Forgot password? <span className="font-semibold">Reset here</span>
              </Link>
            </div>
            <button type="submit" disabled={loading} className="btn-primary mt-2 disabled:opacity-60">
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="text-center text-sm text-[#6B7280]">
              New user?{" "}
              <Link href="/signup" className="font-semibold text-[#0D1B2A] hover:underline">Create account</Link>
            </p>
          </form>
        </AuthCard>

        <div className="fixed bottom-0 left-0 right-0 bg-[#D1D5DB] py-4 px-8 flex justify-between items-center text-sm">
          <span>Any trouble? <Link href="/support" className="font-bold text-[#0D1B2A]">Contact support</Link></span>
          <div className="flex gap-4 text-[#6B7280]">
            <Link href="/privacy" className="hover:text-[#0D1B2A]">Privacy</Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-[#0D1B2A]">Terms</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#D1D5DB]" />}>
      <LoginForm />
    </Suspense>
  );
}

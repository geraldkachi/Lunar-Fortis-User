"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import AuthCard from "@/components/auth/AuthCard";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    router.push("/login/verify");
  };

  return (
    <>
      <Navbar />
      <AuthCard>
        <h1 className="text-2xl font-bold text-[#0D1B2A] mb-6">
          Create Account
        </h1>

        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-[#6B7280] mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Typing |"
              className="lf-input"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-medium text-[#6B7280] mb-1.5">
              Label
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B7280]">
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="lf-input pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#0D1B2A]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p className="text-xs text-[#9CA3AF] mt-1.5">
              Password must be at least{" "}
              <span className="font-semibold text-[#0D1B2A]">8 Characters</span>{" "}
              and must contain at least a{" "}
              <span className="font-semibold text-[#E8392A]">Capital Letter</span>, a{" "}
              <span className="text-[#0D1B2A]">Number</span> and a{" "}
              <span className="text-[#0D1B2A]">Special Character</span>
            </p>
          </div>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="btn-primary mt-2 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>

          <p className="text-center text-sm text-[#6B7280]">
            Got an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#0D1B2A] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
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

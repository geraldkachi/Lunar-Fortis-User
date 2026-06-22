import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="min-h-screen bg-[#D1D5DB] flex flex-col items-center justify-center px-4">
      {/* Main card */}
      <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-modal overflow-hidden">
        <div className="h-1.5 bg-[#0D1B2A]" />
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}

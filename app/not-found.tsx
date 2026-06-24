"use client"

// import Link from "next/link";
// import { Home, ArrowLeft } from "lucide-react";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";

// export default function NotFound() {
//   return (
//     <>
//       <Navbar />
//       <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
//         <div className="text-center">
//           <div className="flex items-center justify-center gap-2 text-[#E8392A] text-sm font-semibold uppercase tracking-wider mb-4">
//             <span className="w-8 h-px bg-[#E8392A]" />
//             Error 404
//             <span className="w-8 h-px bg-[#E8392A]" />
//           </div>
          
//           <h1 className="text-7xl md:text-8xl font-bold text-[#0D1B2A] mb-4 tracking-tight">
//             404
//           </h1>
          
//           <h2 className="text-2xl font-bold text-[#0D1B2A] mb-3">
//             Page Not Found
//           </h2>
          
//           <p className="text-[#6B7280] max-w-sm mx-auto mb-8">
//             The page you're looking for doesn't exist or has been moved.
//           </p>

//           <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
//             <Link 
//               href="/"
//               className="inline-flex items-center gap-2 bg-[#0D1B2A] hover:bg-[#1a2d40] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
//             >
//               <Home size={16} />
//               Back to Home
//             </Link>
//             <button
//               onClick={() => window.history.back()}
//               className="inline-flex items-center gap-2 border border-[#E5E7EB] hover:border-[#0D1B2A] text-[#0D1B2A] font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
//             >
//               <ArrowLeft size={16} />
//               Go Back
//             </button>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// // }

import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Animated SVG Illustration */}
          <div className="relative w-80 h-80 mx-auto mb-8">
            <svg
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Background circle */}
              <circle cx="200" cy="200" r="180" fill="#F8FAFC" stroke="#E5E7EB" strokeWidth="2" />
              
              {/* 404 Text */}
              <text
                x="200"
                y="220"
                textAnchor="middle"
                fontSize="100"
                fontWeight="bold"
                fill="#0D1B2A"
                fontFamily="DM Sans, sans-serif"
              >
                404
              </text>
              
              {/* Decorative dots */}
              <circle cx="100" cy="100" r="8" fill="#E8392A" opacity="0.3" />
              <circle cx="300" cy="100" r="12" fill="#0D1B2A" opacity="0.2" />
              <circle cx="100" cy="300" r="10" fill="#0D1B2A" opacity="0.15" />
              <circle cx="300" cy="300" r="6" fill="#E8392A" opacity="0.25" />
              
              {/* Animated pulse rings */}
              <circle cx="200" cy="200" r="140" stroke="#E8392A" strokeWidth="1.5" opacity="0.1">
                <animate attributeName="r" from="140" to="180" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.2" to="0" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="200" cy="200" r="140" stroke="#0D1B2A" strokeWidth="1" opacity="0.05">
                <animate attributeName="r" from="140" to="190" dur="4s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.15" to="0" dur="4s" repeatCount="indefinite" />
              </circle>
              
              {/* Small floating elements */}
              <g>
                <rect x="60" y="60" width="12" height="12" rx="2" fill="#0D1B2A" opacity="0.1">
                  <animate attributeName="y" from="60" to="70" dur="2s" repeatCount="indefinite" />
                </rect>
                <rect x="328" y="68" width="10" height="10" rx="2" fill="#E8392A" opacity="0.15">
                  <animate attributeName="y" from="68" to="58" dur="2.5s" repeatCount="indefinite" />
                </rect>
                <rect x="70" y="320" width="14" height="14" rx="2" fill="#E8392A" opacity="0.1">
                  <animate attributeName="y" from="320" to="310" dur="3s" repeatCount="indefinite" />
                </rect>
                <rect x="316" y="312" width="8" height="8" rx="2" fill="#0D1B2A" opacity="0.12">
                  <animate attributeName="y" from="312" to="322" dur="2.2s" repeatCount="indefinite" />
                </rect>
              </g>
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-[#0D1B2A] mb-3">
            Oops! Page Not Found
          </h2>
          
          <p className="text-[#6B7280] max-w-sm mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-[#0D1B2A] hover:bg-[#1a2d40] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              <Home size={16} />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 border border-[#E5E7EB] hover:border-[#0D1B2A] text-[#0D1B2A] font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              <ArrowLeft size={16} />
              Go Back
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


// import Link from "next/link";
// import Image from "next/image";
// import { Home, ArrowLeft, Search, Building2, Car, Shield } from "lucide-react";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";

// export default function NotFound() {
//   return (
//     <>
//       <Navbar />
//       <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
//         <div className="max-w-3xl mx-auto text-center">
//           {/* 404 Illustration */}
//           <div className="relative w-64 h-64 mx-auto mb-8">
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="relative">
//                 {/* Decorative circles */}
//                 <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#0D1B2A]/5 rounded-full animate-pulse" />
//                 <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#E8392A]/5 rounded-full animate-pulse delay-300" />
                
//                 {/* Main 404 text */}
//                 <h1 className="text-[120px] font-bold leading-none text-[#0D1B2A] tracking-tight">
//                   404
//                 </h1>
//                 <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#E8392A] rounded-full" />
//               </div>
//             </div>
//           </div>

//           {/* Message */}
//           <h2 className="text-2xl font-bold text-[#0D1B2A] mb-3">
//             Oops! Page Not Found
//           </h2>
//           <p className="text-[#6B7280] max-w-md mx-auto mb-8">
//             The page you're looking for doesn't exist or has been moved. 
//             Let's get you back on track.
//           </p>

//           {/* Quick Links */}
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-8">
//             <Link 
//               href="/"
//               className="flex flex-col items-center gap-2 p-4 bg-white border border-[#E5E7EB] rounded-xl hover:border-[#0D1B2A] hover:shadow-md transition-all group"
//             >
//               <Home size={20} className="text-[#6B7280] group-hover:text-[#0D1B2A] transition-colors" />
//               <span className="text-xs font-medium text-[#6B7280] group-hover:text-[#0D1B2A]">Home</span>
//             </Link>
//             <Link 
//               href="/apartments"
//               className="flex flex-col items-center gap-2 p-4 bg-white border border-[#E5E7EB] rounded-xl hover:border-[#0D1B2A] hover:shadow-md transition-all group"
//             >
//               <Building2 size={20} className="text-[#6B7280] group-hover:text-[#0D1B2A] transition-colors" />
//               <span className="text-xs font-medium text-[#6B7280] group-hover:text-[#0D1B2A]">Apartments</span>
//             </Link>
//             <Link 
//               href="/cars"
//               className="flex flex-col items-center gap-2 p-4 bg-white border border-[#E5E7EB] rounded-xl hover:border-[#0D1B2A] hover:shadow-md transition-all group"
//             >
//               <Car size={20} className="text-[#6B7280] group-hover:text-[#0D1B2A] transition-colors" />
//               <span className="text-xs font-medium text-[#6B7280] group-hover:text-[#0D1B2A]">Car Rentals</span>
//             </Link>
//             <Link 
//               href="/security"
//               className="flex flex-col items-center gap-2 p-4 bg-white border border-[#E5E7EB] rounded-xl hover:border-[#0D1B2A] hover:shadow-md transition-all group"
//             >
//               <Shield size={20} className="text-[#6B7280] group-hover:text-[#0D1B2A] transition-colors" />
//               <span className="text-xs font-medium text-[#6B7280] group-hover:text-[#0D1B2A]">Security</span>
//             </Link>
//           </div>

//           {/* Search Bar */}
//           <div className="max-w-md mx-auto">
//             <div className="flex items-center gap-2 bg-white border border-[#E5E7EB] rounded-xl px-4 py-2 focus-within:border-[#0D1B2A] transition-colors">
//               <Search size={18} className="text-[#9CA3AF] flex-shrink-0" />
//               <input
//                 type="text"
//                 placeholder="Search for what you're looking for..."
//                 className="flex-1 outline-none text-sm text-[#0D1B2A] placeholder:text-[#9CA3AF] bg-transparent"
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') {
//                     const target = e.target as HTMLInputElement;
//                     if (target.value.trim()) {
//                       window.location.href = `/search?q=${encodeURIComponent(target.value)}`;
//                     }
//                   }
//                 }}
//               />
//               <button className="text-xs font-semibold text-[#0D1B2A] hover:text-[#E8392A] transition-colors whitespace-nowrap">
//                 Search
//               </button>
//             </div>
//           </div>

//           {/* Back Button */}
//           <button
//             onClick={() => window.history.back()}
//             className="inline-flex items-center gap-2 mt-6 text-sm text-[#6B7280] hover:text-[#0D1B2A] transition-colors"
//           >
//             <ArrowLeft size={16} />
//             Go Back
//           </button>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/ui/SearchBar";
import ListingsSection from "@/components/listings/ListingsSection";
import { LISTINGS, HERO_IMAGE } from "@/lib/mockData";
import { Grid2X2, DollarSign, Clock, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Lunar Fortis – Security, Mobility & Accommodation in Lagos",
  description:
    "Book elite security escorts, luxury car rentals, and shortlet apartments in Lagos. Trusted by discerning professionals.",
};

const apartments = LISTINGS.filter((l) => l.type === "accommodation").slice(0, 4);
const cars = LISTINGS.filter((l) => l.type === "car").slice(0, 4);
const security = LISTINGS.filter((l) => l.type === "security").slice(0, 4);

const FEATURES = [
  {
    icon: Grid2X2,
    title: "Wide Selection",
    desc: "Access a diverse network of vetted security professionals, premium vehicles, and verified accommodations.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    desc: "Know exactly what you're paying for. No hidden fees, just clear, upfront pricing across all services and bundled packages.",
  },
  {
    icon: Clock,
    title: "24/7 Service",
    desc: "Our platform is available round the clock, ensuring you can book trusted security, mobility, and accommodation services anytime, anywhere.",
  },
  {
    icon: Zap,
    title: "Easy and Fast",
    desc: "Book complete security, transport, and stay solutions in just a few steps — designed for speed, simplicity, and convenience.",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar isLoggedIn={false} />

      <main>
        {/* Hero */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#0D1B2A] leading-tight mb-2">
                Elevate Your Comfort
              </h1>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#E8392A] leading-tight mb-4">
                Experience
              </h1>
              <p className="text-[#6B7280] text-base mb-8 max-w-md">
                Experience elite protection, refined mobility, and trusted accommodation — tailored for those who value safety, discretion, and excellence.
              </p>
              <SearchBar />
            </div>
            <div className="hidden lg:block rounded-2xl overflow-hidden h-[340px] relative">
              <Image
                src={HERO_IMAGE}
                alt="Luxury travel experience"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Listings sections */}
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <ListingsSection
            title="Need A Shortlet Apartment?"
            listings={apartments}
            seeMoreHref="/apartments"
          />
          <ListingsSection
            title="Need A Ride?"
            listings={cars}
            seeMoreHref="/cars"
          />
          <ListingsSection
            title="Need An Escort?"
            listings={security}
            seeMoreHref="/security"
          />
        </div>

        {/* Features */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-[#0D1B2A] mb-8">
            We&apos;re BIG on what matters to you
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title}>
                <div className="w-8 h-8 flex items-center justify-center mb-3">
                  <f.icon size={24} className="text-[#0D1B2A]" strokeWidth={1.5} />
                </div>
                <h3 className="font-semibold text-[#0D1B2A] mb-2 text-sm">{f.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1400&q=80"
              alt="Ready to secure your journey"
              fill
              className="object-cover brightness-40"
            />
          </div>
          <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Ready to Secure<br />Your Journey?
            </h2>
            <p className="text-white/80 max-w-md mb-8 text-sm">
              Explore a complete range of secure mobility, trusted protection, and verified accommodation — all seamlessly combined to support your journey from start to finish.
            </p>
            <Link
              href="/search"
              className="inline-block bg-[#E8392A] hover:bg-[#c8301f] text-white font-semibold px-8 py-3 rounded-full transition-colors"
            >
              Get Started
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

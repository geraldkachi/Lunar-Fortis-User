import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle, FileText } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Support – Contact Us",
  description: "Get help from the Lunar Fortis support team. We're available 24/7 to assist with bookings, security, mobility and accommodation queries.",
};

const CONTACT_ITEMS = [
  { icon: Phone, label: "Phone Support", value: "1 (000) 000-6000", sub: "Available 24/7", href: "tel:+10000006000" },
  { icon: Mail, label: "Email Support", value: "support@lunarfortis.com", sub: "Response within 2 hours", href: "mailto:support@lunarfortis.com" },
  { icon: MapPin, label: "Office Address", value: "14 Bourdillon Road, Ikoyi", sub: "Lagos, Nigeria", href: "#" },
  { icon: Clock, label: "Business Hours", value: "24 / 7 / 365", sub: "Always available", href: "#" },
];

const FAQS = [
  {
    q: "How do I cancel a booking?",
    a: "You can cancel a booking from your 'My Bookings' page up to 24 hours before the scheduled date. Navigate to the booking and click 'Cancel Booking'. Refunds are processed within 3–5 business days.",
  },
  {
    q: "How is payment processed?",
    a: "All payments are processed securely via Flutterwave. We accept credit/debit cards and direct bank transfers. Your payment information is encrypted and never stored on our servers.",
  },
  {
    q: "Are the vendors verified?",
    a: "Yes. All vendors on Lunar Fortis go through a rigorous vetting process including identity verification, background checks, and document validation before being listed on the platform.",
  },
  {
    q: "What is the refund policy?",
    a: "Refunds are subject to the vendor's cancellation policy. For cancellations made 48+ hours before service, a full refund is issued. Cancellations within 24 hours may incur a 25% fee.",
  },
  {
    q: "How do I become a service provider?",
    a: "Click 'Become A Service Provider' in the navigation bar and complete the KYB (Know Your Business) verification process. Approval typically takes 2–3 business days.",
  },
];

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-[#0D1B2A] text-white py-16 px-4">
          <div className="max-w-[1280px] mx-auto text-center">
            <h1 className="text-4xl font-bold mb-3">How can we help?</h1>
            <p className="text-white/70 text-base max-w-xl mx-auto mb-8">
              Our support team is available around the clock to ensure your experience with Lunar Fortis is seamless.
            </p>
            <div className="flex max-w-md mx-auto gap-2">
              <input
                type="text"
                placeholder="Search for help..."
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-white/50 transition-colors"
              />
              <button className="bg-[#E8392A] hover:bg-[#c8301f] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
                Search
              </button>
            </div>
          </div>
        </section>

        {/* Contact methods */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h2 className="text-2xl font-bold text-[#0D1B2A] text-center mb-10">Contact Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CONTACT_ITEMS.map(({ icon: Icon, label, value, sub, href }) => (
              <a key={label} href={href}
                className="flex flex-col items-center text-center p-6 border border-[#E5E7EB] rounded-2xl hover:border-[#0D1B2A] hover:shadow-card transition-all group">
                <div className="w-12 h-12 bg-[#EEF3F8] rounded-full flex items-center justify-center mb-3 group-hover:bg-[#0D1B2A] transition-colors">
                  <Icon size={20} className="text-[#0D1B2A] group-hover:text-white transition-colors" />
                </div>
                <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-1">{label}</p>
                <p className="text-sm font-bold text-[#0D1B2A]">{value}</p>
                <p className="text-xs text-[#9CA3AF] mt-0.5">{sub}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Contact form + FAQs */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12">
            {/* Form */}
            <div>
              <h2 className="text-xl font-bold text-[#0D1B2A] mb-6">Send a Message</h2>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#6B7280] mb-1.5">First Name</label>
                    <input type="text" placeholder="John" className="lf-input" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#6B7280] mb-1.5">Last Name</label>
                    <input type="text" placeholder="Doe" className="lf-input" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6B7280] mb-1.5">Email Address</label>
                  <input type="email" placeholder="you@example.com" className="lf-input" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6B7280] mb-1.5">Subject</label>
                  <select className="lf-input appearance-none">
                    <option>Select a topic</option>
                    <option>Booking Issue</option>
                    <option>Payment Problem</option>
                    <option>Vendor Complaint</option>
                    <option>Account Support</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#6B7280] mb-1.5">Message</label>
                  <textarea placeholder="Describe your issue in detail..." rows={5}
                    className="lf-input resize-none" />
                </div>
                <button className="btn-primary">Send Message</button>
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-xl font-bold text-[#0D1B2A] mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {FAQS.map((faq, i) => (
                  <details key={i} className="group border border-[#E5E7EB] rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between px-4 py-4 cursor-pointer text-sm font-semibold text-[#0D1B2A] hover:bg-[#F9FAFB] transition-colors list-none">
                      {faq.q}
                      <span className="text-[#6B7280] group-open:rotate-45 transition-transform text-lg leading-none ml-2 flex-shrink-0">+</span>
                    </summary>
                    <div className="px-4 pb-4 text-sm text-[#6B7280] leading-relaxed border-t border-[#F3F4F6]">
                      <p className="pt-3">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>

              <div className="mt-6 p-4 bg-[#EEF3F8] rounded-xl flex items-start gap-3">
                <MessageCircle size={18} className="text-[#0D1B2A] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-[#0D1B2A] mb-1">Still need help?</p>
                  <p className="text-xs text-[#6B7280]">
                    Chat with our support team directly on WhatsApp or call{" "}
                    <a href="tel:+10000006000" className="text-[#4F7FAF] font-semibold hover:underline">1 (000) 000-6000</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

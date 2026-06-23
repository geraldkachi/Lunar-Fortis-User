import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the Lunar Fortis Terms of Service governing the use of our platform for security, mobility and accommodation services.",
};

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using the Lunar Fortis platform ("Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Platform. These Terms apply to all users, including guests, registered users, and service providers.

Lunar Fortis reserves the right to modify these Terms at any time. We will provide notice of significant changes by updating the "Last Updated" date at the top of this page. Your continued use of the Platform after any changes constitutes your acceptance of the new Terms.`,
  },
  {
    title: "2. Description of Services",
    content: `Lunar Fortis is a marketplace platform that connects users with verified service providers offering:
    
• Short-term accommodation (shortlet apartments)
• Mobility services (vehicle rentals with or without chauffeurs)  
• Security escort services (armed and unarmed personnel)

Lunar Fortis acts as an intermediary platform and does not directly provide any of the above services. All services are provided by independent third-party vendors who have been vetted through our KYB process.`,
  },
  {
    title: "3. User Accounts",
    content: `To access certain features of the Platform, you must create an account. You agree to:

• Provide accurate, complete, and current information
• Maintain the security of your account credentials
• Notify us immediately of any unauthorized account access
• Accept responsibility for all activities under your account

You must be at least 18 years of age to create an account. Lunar Fortis reserves the right to suspend or terminate accounts that violate these Terms.`,
  },
  {
    title: "4. Bookings and Payments",
    content: `When you make a booking through the Platform:

• You enter into a direct agreement with the service provider
• Payment is processed securely through our payment partner (Flutterwave)
• Prices displayed include applicable service fees
• All amounts are displayed in Nigerian Naira (₦) unless otherwise stated
• Lunar Fortis is not liable for any monetary transaction between you and the vendor

Payment confirmation is sent to your registered email address. Lunar Fortis does not store card details on its servers.`,
  },
  {
    title: "5. Cancellation and Refund Policy",
    content: `Cancellation policies vary by service type and vendor. General guidelines:

• Cancellations made 48+ hours before service start: Full refund
• Cancellations made 24–48 hours before service start: 75% refund
• Cancellations made less than 24 hours before service start: No refund
• No-shows are not eligible for refunds

Refunds are processed to the original payment method within 3–7 business days. Service providers may have stricter cancellation policies which will be displayed on their listing page.`,
  },
  {
    title: "6. Safety and Conduct",
    content: `Users of the Platform agree to:

• Treat all vendors and their staff with respect
• Not use services for illegal activities
• Follow all local laws and regulations
• Report any safety concerns to our support team immediately

Safety Tips — always:
• Verify the agent and property before making any payment
• Only pay after verifying the service provider
• Meet agents in open, public locations
• Note that Lunar Fortis is not liable for monetary transactions directly between users and agents`,
  },
  {
    title: "7. Vendor Obligations",
    content: `Service providers registered on the Platform agree to:

• Maintain accurate listings and availability
• Provide services as described and agreed upon at booking
• Hold all required licenses, permits, and insurance
• Comply with all applicable laws and regulations
• Respond to booking requests within 2 hours
• Maintain professional conduct with all users`,
  },
  {
    title: "8. Intellectual Property",
    content: `All content on the Lunar Fortis Platform, including but not limited to text, graphics, logos, images, and software, is the property of Lunar Fortis or its content suppliers and is protected by Nigerian and international copyright laws.

You may not reproduce, distribute, modify, create derivative works from, or publicly display any content from the Platform without prior written consent from Lunar Fortis.`,
  },
  {
    title: "9. Limitation of Liability",
    content: `To the maximum extent permitted by law, Lunar Fortis shall not be liable for:

• Any indirect, incidental, special, or consequential damages
• Loss of profits, revenue, data, or business opportunities
• Personal injury or property damage resulting from use of third-party services
• Any transactions conducted directly between users and service providers
• Service interruptions or technical failures beyond our reasonable control

Lunar Fortis' total liability shall not exceed the amount paid by you for the specific service giving rise to the claim.`,
  },
  {
    title: "10. Privacy",
    content: `Your use of the Platform is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the Platform, you consent to the collection and use of your information as described in our Privacy Policy.

We take data protection seriously and comply with the Nigeria Data Protection Regulation (NDPR) and applicable international standards.`,
  },
  {
    title: "11. Governing Law and Disputes",
    content: `These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from these Terms or your use of the Platform shall be subject to the exclusive jurisdiction of the courts of Lagos State, Nigeria.

We encourage users to contact our support team first to resolve disputes amicably before pursuing legal remedies. Most issues can be resolved quickly through our support channels.`,
  },
  {
    title: "12. Contact Information",
    content: `If you have questions about these Terms, please contact us:

• Email: legal@lunarfortis.com
• Phone: 1 (000) 000-6000
• Address: 14 Bourdillon Road, Ikoyi, Lagos, Nigeria
• Support hours: 24/7`,
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="bg-[#0D1B2A] text-white py-14 px-4">
          <div className="max-w-[900px] mx-auto">
            <p className="text-[#E8392A] text-sm font-semibold mb-2 uppercase tracking-wider">Legal</p>
            <h1 className="text-4xl font-bold mb-3">Terms of Service</h1>
            <p className="text-white/70">Last updated: 1 January 2026</p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-[900px] mx-auto px-4 sm:px-6 py-14">
          {/* Intro */}
          <div className="bg-[#EEF3F8] border-l-4 border-[#0D1B2A] rounded-r-xl p-5 mb-10">
            <p className="text-sm text-[#0D1B2A] leading-relaxed">
              Please read these Terms of Service carefully before using the Lunar Fortis platform. 
              These Terms constitute a legally binding agreement between you and Lunar Fortis Ltd.
              By using our platform, you confirm that you are at least 18 years old and have the authority to accept these Terms.
            </p>
          </div>

          {/* Quick nav */}
          <div className="border border-[#E5E7EB] rounded-xl p-5 mb-10">
            <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wider mb-3">Table of Contents</p>
            <div className="grid sm:grid-cols-2 gap-1">
              {SECTIONS.map((s, i) => (
                <a key={i} href={`#section-${i}`}
                  className="text-sm text-[#4F7FAF] hover:text-[#0D1B2A] hover:underline py-0.5">
                  {s.title}
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-10">
            {SECTIONS.map((section, i) => (
              <div key={i} id={`section-${i}`}>
                <h2 className="text-lg font-bold text-[#0D1B2A] mb-3">{section.title}</h2>
                <div className="text-sm text-[#6B7280] leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-14 border-t border-[#E5E7EB] pt-8 text-center">
            <p className="text-sm text-[#6B7280] mb-4">
              Have questions about our Terms? Our team is here to help.
            </p>
            <div className="flex justify-center gap-3">
              <Link href="/support"
                className="bg-[#0D1B2A] hover:bg-[#1a2d40] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
                Contact Support
              </Link>
              <Link href="/"
                className="border border-[#E5E7EB] text-[#0D1B2A] font-semibold px-6 py-3 rounded-xl text-sm hover:bg-gray-50 transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

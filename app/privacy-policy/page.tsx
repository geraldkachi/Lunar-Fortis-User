import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Lunar Fortis",
  description: "Learn more about how we collect and use data and your rights as our user.",
};

const PRIVACY_SECTIONS = [
  {
    id: "admin",
    title: "1. Who is the Admin?",
    content: "Career pro Technologies Limited. Email address - hello@lunafortis.com",
  },
  {
    id: "privacy-notice",
    title: "2. What is this Privacy Notice for?",
    content: `Peerstack Limited ("Thepeer", "the Company", or "We") values your Personal Data and we are committed to protecting your privacy whenever you interact with us. Please read this Privacy Notice (Notice) to understand our policies, processes and procedures regarding the processing of your personal data. By this Notice, We explain to you how your Personal Data is collected, used, managed and transferred by Thepeer and also explain how you can update your Personal Data with us and exercise your rights in respect of the Personal Data provided to us.`,
  },
  {
    id: "collection",
    title: "3. When do we collect your Personal Data?",
    content: `We collect Personal Data that you give to us, for example, where you create an account with us, request for further information about our product, fill a form, apply for a job through our website or you subscribe to newsletters on our website. We may also automatically collect some technical information when you visit our website such as your IP address, and information about your visit, such as the pages that you viewed. This information helps us understand customer interests and helps us improve our website. When you visit our site, the pages that you look at, and a short text file called a cookie, are downloaded to your computer. By visiting and using our website.`,
  },
];

// Additional sections for a complete Privacy Policy
const ADDITIONAL_SECTIONS = [
  {
    id: "data-use",
    title: "4. How do we use your Personal Data?",
    content: `We use your Personal Data to provide, maintain, and improve our services, to process transactions, to communicate with you, and to comply with legal obligations. We may also use your data to personalize your experience and to send you marketing communications where permitted by law.`,
  },
  {
    id: "data-sharing",
    title: "5. Do we share your Personal Data?",
    content: `We may share your Personal Data with third-party service providers who assist us in operating our website, conducting our business, or servicing you. These parties are obligated to keep your information confidential. We may also disclose your information when required by law or to protect our rights.`,
  },
  {
    id: "security",
    title: "6. How do we protect your Personal Data?",
    content: `We implement appropriate technical and organizational measures to protect your Personal Data against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, access controls, and regular security assessments.`,
  },
  {
    id: "cookies",
    title: "7. Cookies and Tracking Technologies",
    content: `We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand where our visitors are coming from. You can control cookie preferences through your browser settings.`,
  },
  {
    id: "your-rights",
    title: "8. Your Data Protection Rights",
    content: `You have the right to access, rectify, or erase your Personal Data, as well as the right to restrict or object to its processing. You also have the right to data portability and to withdraw consent at any time. To exercise these rights, please contact us at hello@lunafortis.com.`,
  },
  {
    id: "retention",
    title: "9. Data Retention",
    content: `We retain your Personal Data only for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.`,
  },
  {
    id: "updates",
    title: "10. Updates to this Privacy Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the updated policy on our website and updating the "Last Updated" date.`,
  },
  {
    id: "contact",
    title: "11. Contact Us",
    content: `If you have any questions about this Privacy Policy or our data practices, please contact us at:\n\nCareer pro Technologies Limited\nEmail: hello@lunafortis.com`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-[#0D1B2A] text-white py-12 px-4">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center gap-2 text-sm text-white/60 mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-white/80">Privacy Policy</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Our Privacy Policy</h1>
            <p className="text-white/70 text-lg max-w-2xl">
              Learn more about how we collect and use data and your rights as our user.
            </p>
            <div className="mt-4 text-sm text-white/50">
              <span>Last Updated: March 17, 2025</span>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            {/* Main Content */}
            <div>
              {/* Updated Notice */}
              <div className="mb-8">
                <div className="bg-[#EEF3F8] rounded-xl px-6 py-3 text-sm text-[#0D1B2A]">
                  <span className="font-semibold">Last Updated: March 17, 2025</span>
                </div>
              </div>

              {/* Privacy Policy Sections */}
              <div className="space-y-8">
                {PRIVACY_SECTIONS.map((section) => (
                  <div
                    key={section.id}
                    id={section.id}
                    className="border-b border-[#E5E7EB] pb-8 last:border-b-0 last:pb-0"
                  >
                    <h2 className="text-xl font-bold text-[#0D1B2A] mb-3">
                      {section.title}
                    </h2>
                    <p className="text-[#4B5563] text-base leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                ))}

                {/* Additional Sections */}
                {ADDITIONAL_SECTIONS.map((section) => (
                  <div
                    key={section.id}
                    id={section.id}
                    className="border-b border-[#E5E7EB] pb-8 last:border-b-0 last:pb-0"
                  >
                    <h2 className="text-xl font-bold text-[#0D1B2A] mb-3">
                      {section.title}
                    </h2>
                    <p className="text-[#4B5563] text-base leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar - Quick Navigation */}
            <div>
              <div className="sticky top-24">
                <h3 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider mb-4">
                  On this page
                </h3>
                <nav className="space-y-2">
                  {[...PRIVACY_SECTIONS, ...ADDITIONAL_SECTIONS].map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-sm text-[#4B5563] hover:text-[#0D1B2A] hover:font-semibold transition-colors py-1"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>

                {/* Contact Card */}
                <div className="mt-8 p-5 bg-[#EEF3F8] rounded-xl">
                  <h4 className="text-sm font-semibold text-[#0D1B2A] mb-2">
                    Questions about your data?
                  </h4>
                  <p className="text-xs text-[#6B7280] mb-3">
                    If you have any questions about our Privacy Policy or how we handle your data, please contact our support team.
                  </p>
                  <Link
                    href="/support"
                    className="block w-full text-center bg-[#0D1B2A] hover:bg-[#1a2f42] text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                  >
                    Contact Support
                  </Link>
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
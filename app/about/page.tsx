"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Layout } from "@/components/layout"
import type React from "react"
import type { Metadata } from "next"

// export const metadata: Metadata = {
//   title: "Privacy Policy | Medici",
//   description: "Review Medici.ac's privacy policy and data collection practices.",
// }

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20">
        <div className="container mx-auto px-4 pt-8 pb-32">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <div className="text-center pt-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-10"
            >
              Privacy Policy
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="prose prose-neutral dark:prose-invert max-w-3xl mx-auto text-left"
            >
              <p><strong>Effective Date:</strong> June 4, 2025</p>

              <p><em>This policy applies to the website <strong>Medici.ac</strong> and is valid as of June 4, 2024. The website consists of a single interest‑capture form for prospective <strong>students</strong> and <strong>donors</strong>, plus basic web‑traffic analytics. No funds move through the Site at this time.</em></p>

              <h3>1. Who We Are</h3>
              <p><strong>Medici.ac</strong> ("<strong>Medici.ac</strong>", "we", "our", "us") is a peer‑to‑peer scholarship platform owned and operated by <strong>Miruvor LLC</strong>, a U.S. company. Until the full platform launches, the public website at <strong>medici.ac</strong> (the "Site") serves only as an information page and email sign‑up.</p>

              <h3>2. Information We Collect</h3>
              <ul className="list-disc pl-5">
                <li><strong>Contact Details:</strong> Name, Email — from you. Used for follow-up and updates. Legal basis: consent (GDPR Art. 6(1)(a))</li>
                <li><strong>Educational Details:</strong> University (students only) — from you. Used to match scholarships.</li>
                <li><strong>Role Interest:</strong> Donor or Student — from you. Tailors communication.</li>
                <li><strong>Usage Data:</strong> IP, browser, device info — via cookies/analytics. Used for performance and spam prevention (legitimate interest).</li>
              </ul>

              <p>We do <strong>not</strong> collect sensitive data or process transactions on the site.</p>

              <h3>3. Cookies & Analytics</h3>
              <p>We use standard analytics tools (e.g., Google Analytics, Plausible) to understand traffic and improve UX. These tools do <strong>not</strong> identify users personally. You can block cookies in your browser.</p>

              <h3>4. How We Use the Information</h3>
              <ol className="list-decimal pl-5">
                <li><strong>Essential Communications:</strong> To confirm your interest and share updates.</li>
                <li><strong>Site Improvement:</strong> Debug issues and improve layout/performance.</li>
              </ol>

              <h3>5. Sharing & Disclosure</h3>
              <p>We do <strong>not</strong> sell or rent your data. We share it only with:</p>
              <ul className="list-disc pl-5">
                <li>Service providers (hosting, email, analytics) with strict access rules</li>
                <li>Regulators/law enforcement (if legally required)</li>
                <li>Successors (in case of acquisition or merger)</li>
              </ul>

              <h3>6. Data Storage & Security</h3>
              <p>Data is stored in <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">Supabase</a>, a secure U.S.-hosted cloud database. Access is restricted to authorized Miruvor LLC personnel and protected by MFA.</p>

              <h3>7. Retention</h3>
              <p>We retain contact data for up to <strong>24 months</strong> or until consent is withdrawn. Aggregated usage data may be retained longer for analytics. Backups are purged within 30 days.</p>

              <h3>8. Your Rights</h3>
              <p>Depending on your location, you can:</p>
              <ul className="list-disc pl-5">
                <li>Access or correct your data</li>
                <li>Request deletion or restriction</li>
                <li>Object to processing</li>
                <li>Request a portable copy</li>
                <li>Withdraw consent anytime</li>
              </ul>
              <p>To exercise rights, email <strong>rd@stableresearch.xyz</strong></p>

              <h3>9. International Transfers</h3>
              <p>If you're outside the U.S., your data may be transferred to U.S. systems with your consent and protected via standard contractual clauses.</p>

              <h3>10. Children’s Privacy</h3>
              <p>The site is not directed to children under 16. If data is submitted by a minor, it will be deleted.</p>

              <h3>11. Changes to This Policy</h3>
              <p>We may update this policy. The "Effective Date" will reflect changes, and significant updates will be flagged on the site.</p>

              <h3>12. Contact Us</h3>
              <p>Email <strong>rd@stableresearch.xyz</strong> with any questions.</p>

              <hr />

              <p className="text-center italic text-sm text-muted-foreground mt-6">
                By submitting any form on this site, you consent to Medici.ac storing your data in Supabase and contacting you regarding platform updates.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

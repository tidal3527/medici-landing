"use client"

import { Layout } from "@/components/layout"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CampusAmbassadorPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20">
        <div className="container mx-auto px-4 pt-8 pb-32">
          <Link href="/careers" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Careers
          </Link>

          <div className="max-w-3xl mx-auto pt-8 text-left space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
              Medici Campus Ambassador Program
            </h1>

            <p className="text-lg text-neutral-800 dark:text-neutral-200">
              This is our early access phase and we're looking to onboard as many students as possible. As a Medici Student Ambassador, you’ll help your friends fund their education directly while earning money for every successful signup.
            </p>

            <p>
              At Medici, we’re on a mission to make college more accessible by connecting students directly to donors for transparent, blockchain-powered education funding.
            </p>

            <p>
              We’re looking for motivated, connected students to join our Ambassador Program and help spread the word on your campus. You’ll earn real money for every classmate you help sign up.
              <br /><br />
              <strong>Note:</strong> You must be a student enrolled in a US university to take part.
            </p>

            <h2 className="text-2xl font-semibold mt-8">How You’ll Get Paid</h2>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Per-Signup Payment:</strong> $10 for every student onboarded and verified (defined as someone who has completed all fields, both mandatory and optional, with your referral code on the <a href="https://student.medici.ac/studentform" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">student form</a> and had their enrollment successfully verified by the Medici team).</li>
              <li><strong>Milestone Bonuses:</strong> Every 50 verified signups = $50 extra bonus.</li>
              <li><strong>Example Earnings:</strong>
                <ul className="list-disc list-inside ml-6 space-y-1">
                  <li>50 signups = $500 (per signup) + $50 (bonus) = $550 total.</li>
                  <li>150 signups = $1,500 (per signup) + $150 (bonuses) = $1,650 total.</li>
                </ul>
              </li>
              <li>All payouts made in USDC.</li>
              <li><em>These incentives will be available while our “early access” phase is open, or until the first $2,000 in total payouts is complete. After which, we'll reassess the program terms.</em></li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8">What You’ll Do</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Share Medici with classmates, friends and student groups.</li>
              <li>Use your unique referral link or code.</li>
              <li>Help them sign up and complete their verified student profile.</li>
              <li>Answer basic questions (we’ll give you an Ambassador Cheat Sheet!).</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8">What Makes You a Great Fit</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Currently enrolled undergrad.</li>
              <li>Connected and social on campus.</li>
              <li>Passionate about making college affordable for everyone.</li>
              <li>Motivated to earn while helping others.</li>
              <li>Basic familiarity with crypto (like how to set up a wallet, initiate a transfer, etc).</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8">Perks</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Flexible hours - work on your schedule.</li>
              <li>Get paid weekly or bi-weekly.</li>
              <li>Be part of an innovative blockchain project with real social impact.</li>
              <li>Access to exclusive Medici merch and US-wide Ambassador network.</li>
            </ul>

            <p className="mt-8 text-lg font-medium text-center">
              Send your resume with a quick paragraph introduction to{" "}
              <a
                href="mailto:contact@medici.ac"
                className="text-blue-600 hover:underline"
              >
                contact@medici.ac
              </a>{" "}
              telling us your year, major/discipline and university, with the email subject: <strong>"Campus Ambassador Application"</strong>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

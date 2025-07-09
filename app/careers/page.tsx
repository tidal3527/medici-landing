"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Layout } from "@/components/layout"

export default function CareersPage() {
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
              Careers at Medici
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-neutral-800 dark:text-neutral-200 leading-relaxed max-w-3xl mx-auto space-y-6 text-left"
            >
              <p>
                We're not currently hiring for full-time roles. However, you're welcome to send us a general application at{" "}
                <a
                  href="mailto:contact@medici.ac"
                  className="text-blue-600 hover:underline"
                >
                  contact@medici.ac
                </a>.
              </p>

              <p>
                Please use the email subject exactly as:
                <br />
                <span className="block mt-2 p-2 bg-muted rounded text-sm font-mono">
                  General Career Application
                </span>
              </p>

              <p>
                In your email, tell us what kind of work you'd like to do. We'll store your details and get back to you if an opportunity arises in the future.
              </p>

              <p>
                <strong>We are currently looking for Campus Ambassadors!</strong> If you're interested,{" "}
                <Link
                  href="/careers/campus-ambassador"
                  className="text-blue-600 hover:underline"
                >
                  learn more about the role here
                </Link>.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

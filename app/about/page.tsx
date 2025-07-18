"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Layout } from "@/components/layout"
import type React from "react"

export default function AboutPage() {
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
              About Medici
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto space-y-6 text-left"
            >
              <p>
                The Medici family helped finance the Renaissance. They funded artists, inventors and thinkers like Leonardo da Vinci, Galileo and Michelangelo. They used capital to back ideas and people who went on to shape human history.
              </p>

              <p>
                That world should be possible again. A world where anyone, regardless of wealth, can act like a Medici and carefully deploy capital toward people they believe in.
              </p>

              <p>
                Named after the famed family, Medici.ac is a platform to invest in people. We're building transparent, on-chain infrastructure for human capital funding.
              </p>

              <p>
                At launch, we enable direct peer-to-peer education funding for university students in the US. Next, we'll expand globally and to donation mechanisms (like income-sharing grants proposed by Milton Friedman) for researchers, founders or creatives.
              </p>

              <p>
                The current student debt system is inefficient, extractive and predatory. It works for no one, limits freedom and punishes ambition. The blockchain enables its replacement.
              </p>

              <p>
                We believe the world can enter multiple new renaissances. Yet, talent doesn't just surface on its own. It needs to be discovered and nurtured.
              </p>

              <p>
                
                Medici is built by <a href="https://miruvor.me" target="_blank" rel="noopener noreferrer" className="underline">Miruvor</a>, an R&D studio focused on leveraging blockchain technologies to explore how humans can reorganize themselves to drive better collective outcomes. 
              </p>

              <p>
                Big plans ahead. Subscribe for updates and be part of the journey. 
              </p>              
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
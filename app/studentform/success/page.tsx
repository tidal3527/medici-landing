"use client"

import Link from "next/link"
import { Layout } from "@/components/layout"
import { Analytics } from "@/components/analytics"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Mail } from "lucide-react"
import { motion } from "framer-motion"

export default function SuccessPage() {
	return (
		<Layout>
			<Analytics />
			<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20 relative overflow-hidden">
				{/* Animated Background */}
				<div className="absolute inset-0 -z-10">
					{[...Array(15)].map((_, i) => (
						<motion.div
							key={i}
							className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
							animate={{
								x: [0, 100, 0],
								y: [0, -100, 0],
								scale: [1, 1.5, 1],
							}}
							transition={{
								duration: 8 + i * 2,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
							}}
							style={{
								left: `${Math.random() * 100}%`,
								top: `${Math.random() * 100}%`,
							}}
						/>
					))}
				</div>

				<div className="container mx-auto px-6 py-24 max-w-3xl relative z-10">
					<div className="text-center space-y-8">
						{/* Success Icon */}
						<motion.div
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ duration: 0.6, ease: "easeOut" }}
							className="flex justify-center mb-8"
						>
							<div className="w-24 h-24 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm border border-green-200/50 dark:border-green-700/40">
								<CheckCircle2 className="w-14 h-14 text-green-600 dark:text-green-400" />
							</div>
						</motion.div>

						{/* Main Title */}
						<motion.h1
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="text-4xl md:text-5xl font-bold text-black dark:text-white leading-tight"
						>
							Profile Request Submitted!
						</motion.h1>

						{/* Content */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className="space-y-6 text-lg text-gray-800 dark:text-gray-200 leading-relaxed max-w-2xl mx-auto text-left md:text-center"
						>
							<p className="text-xl font-light">
								Thank you for starting your Medici journey.
							</p>
							<p>
								Our team will review your info and email you within 5-7 business days. We'll then request your documents and complete a quick online verification.
							</p>
							<div className="flex items-center justify-center gap-2 text-base md:justify-center md:text-center text-left">
								<Mail className="h-5 w-5 text-blue-600" />
								<span>Have questions? Reach us anytime at </span>
								<a 
									href="mailto:contact@medici.ac" 
									className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
								>
									contact@medici.ac
								</a>
							</div>
						</motion.div>

						{/* Call to Action */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.6 }}
							className="pt-8"
						>
							<Button 
								asChild
								className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
							>
								<Link href="https://medici.ac">
									Return to Homepage
								</Link>
							</Button>
						</motion.div>
					</div>
				</div>
			</div>
		</Layout>
	)
} 
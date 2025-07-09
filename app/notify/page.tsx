"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Layout } from "@/components/layout"

const notifyTexts = [
	"Choose Students to Support",
]

export default function NotifyPage() {
	const [currentText, setCurrentText] = useState(0)
	const [formData, setFormData] = useState({
		name: "",
		email: "",
	})
	const [errors, setErrors] = useState({
		email: "",
		name: "",
	})
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [apiError, setApiError] = useState<string | null>(null)

	const nameRef = useRef<HTMLInputElement>(null)
	const emailRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentText((prev) => (prev + 1) % notifyTexts.length)
		}, 2500)
		return () => clearInterval(interval)
	}, [])

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}

	const scrollToFirstError = (newErrors: typeof errors) => {
		if (newErrors.name) {
			nameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
			nameRef.current?.focus()
		} else if (newErrors.email) {
			emailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
			emailRef.current?.focus()
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setApiError(null) // Clear any previous errors
		
		// Validate all fields
		const newErrors = {
			name: !formData.name.trim() ? "Full name is required" : "",
			email: !formData.email.trim() ? "Email is required" : !validateEmail(formData.email) ? "Please enter a valid email address" : "",
		}

		setErrors(newErrors)

		if (Object.values(newErrors).some(error => error !== "")) {
			scrollToFirstError(newErrors)
			return
		}

		setIsLoading(true)

		try {
			const response = await fetch("/api/donors", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			})

			const data = await response.json()

			if (!response.ok) {
				if (response.status === 409) {
					setErrors(prev => ({
						...prev,
						email: "This email is already registered"
					}))
					emailRef.current?.focus()
					return
				}
				throw new Error(data.error || 'Something went wrong')
			}

			// Clear form data
			setFormData({
				name: "",
				email: "",
			})
			setIsSubmitted(true)
			window.scrollTo({ top: 0, behavior: "smooth" })
		} catch (error: any) {
			console.error("Error submitting form:", error)
			setApiError(error.message || "Failed to submit. Please try again.")
		} finally {
			setIsLoading(false)
		}
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			[name]: value,
		})

		// Clear email error when user starts typing
		if (name === 'email') {
			setErrors(prev => ({
				...prev,
				email: ''
			}))
		}
	}

	if (isSubmitted) {
		return (
			<Layout>
				<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20 flex items-center justify-center px-4">
					<motion.div
						initial={{ opacity: 0, scale: 0.8, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
						className="text-center max-w-md"
					>
						<motion.div
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
							className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl"
						>
							<CheckCircle className="h-12 w-12 text-white" />
						</motion.div>

						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5 }}
							className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
						>
							You're In!
						</motion.h1>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.7 }}
							className="text-muted-foreground mb-8 leading-relaxed"
						>
							Thanks for signing up. You're on the early access list. We'll reach out once we've finished curating student profiles for launch.
						</motion.p>

						<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
							<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
								<Link href="/">
									<Button className="border-2 border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500/10 hover:text-blue-700 px-8 py-3 rounded-full transition-all duration-300 font-semibold flex items-center gap-2">
										<ArrowLeft className="mr-2 h-4 w-4" />
										Back to Home
									</Button>
								</Link>
								<Link href="/donate">
									<Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
										Donate to Medici
									</Button>
								</Link>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</Layout>
		)
	}

	return (
		<Layout>
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

				<div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
					<div className="w-full max-w-lg">
						{/* Header Section */}
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="text-center mb-12"
						>
							<div className="mb-6">
								<AnimatePresence mode="wait">
									<motion.h1
										key={currentText}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										transition={{ duration: 0.4 }}
										className="text-4xl md:text-6xl font-bold"
									>
										{notifyTexts[currentText]}
									</motion.h1>
								</AnimatePresence>
							</div>

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: 0.2 }}
								className="text-xl text-neutral-800 dark:text-neutral-200 max-w-2xl mx-auto leading-relaxed text-left sm:text-center md:text-center lg:text-center"
							>
								Medici is currently curating verified student profiles. Sign up if you're interested in becoming an early donor and we'll reach out as soon as we're ready to launch.
							</motion.p>
						</motion.div>

						{/* Form Section */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.3 }}
							className="max-w-md mx-auto"
						>
							<Card className="backdrop-blur-xl bg-card/80 border-border/50 shadow-2xl">
								<CardContent className="p-8">
									<motion.div
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.3 }}
										className="text-center mb-6"
									>
										<h2 className="text-2xl font-bold mb-2">Get Early Access</h2>
									</motion.div>

									{apiError && (
										<motion.div
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md"
										>
											<p className="text-sm text-red-600 text-center">{apiError}</p>
										</motion.div>
									)}

									<form onSubmit={handleSubmit} className="space-y-6">
										<motion.div
											initial={{ opacity: 0, x: -10 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.3, delay: 0.1 }}
										>
											<Label htmlFor="name" className="text-sm font-medium">
												Full Name
											</Label>
											<Input
												id="name"
												name="name"
												type="text"
												value={formData.name}
												onChange={handleChange}
												className={`mt-2 h-12 ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
												placeholder="Enter your full name"
												ref={nameRef}
											/>
											{errors.name && (
												<motion.p
													initial={{ opacity: 0, y: -10 }}
													animate={{ opacity: 1, y: 0 }}
													className="text-sm text-red-500 mt-1"
												>
													{errors.name}
												</motion.p>
											)}
										</motion.div>

										<motion.div
											initial={{ opacity: 0, x: -10 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ duration: 0.3, delay: 0.2 }}
										>
											<Label htmlFor="email" className="text-sm font-medium">
												Email Address
											</Label>
											<Input
												id="email"
												name="email"
												type="email"
												value={formData.email}
												onChange={handleChange}
												className={`mt-2 h-12 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
												placeholder="Enter your email"
												ref={emailRef}
											/>
											{errors.email && (
												<motion.p
													initial={{ opacity: 0, y: -10 }}
													animate={{ opacity: 1, y: 0 }}
													className="text-sm text-red-500 mt-1"
												>
													{errors.email}
												</motion.p>
											)}
										</motion.div>

										<motion.div
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.3, delay: 0.3 }}
										>
											<Button
												type="submit"
												className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
												disabled={isLoading}
											>
												{isLoading ? (
													<motion.div
														animate={{ rotate: 360 }}
														transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
														className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
													/>
												) : (
													"Notify Me"
												)}
											</Button>
										</motion.div>
									</form>
									
									
									{/* WE WILL INCLUDE THIS SNIPPET ONCE THE SMART CONTRACT GOES LIVE */}

									{/* <p className="text-sm text-center text-neutral-800 dark:text-neutral-200 mt-6">
  										Prefer to help right away?{' '}
										<br/>
										Donate to the {" "}
  										<Link
    									href="/donate"
    									className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
  										>
    									Medici Amplifier
  										</Link>
										.
									</p>	 */}
									


									{/*
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.3, delay: 0.4 }}
										className="mt-6 text-center flex flex-col gap-4"
									>
										<motion.div
											whileHover={{ scale: 1.08 }}
											transition={{ type: 'spring', stiffness: 300 }}
											className="inline-block"
										>
											<Link href="/donate">
												<Button
													size="lg"
													variant="outline"
													className="px-8 py-4 text-lg rounded-full border-2 border-blue-400/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 hover:border-blue-400/50 hover:scale-105 hover:shadow-lg transition-all duration-300"
												>
													Donate to Medici
													<ArrowRight className="ml-2 h-5 w-5" />
												</Button>
											</Link>
										</motion.div>
									</motion.div>
									*/}
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</div>
			</div>
		</Layout>
	)
}

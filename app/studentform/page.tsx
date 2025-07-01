"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { User, DollarSign, FileText, Wallet, CheckCircle, Upload, ArrowRight, ArrowLeft, Info, Plus, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Layout } from "@/components/layout"
import { useStudentProfile } from "@/hooks/useStudentProfile"
import { useRouter } from "next/navigation"
import { LoadingModal } from "@/components/ui/loading-modal"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Analytics } from "@/components/analytics"

interface University {
	id: string
	name: string
	city: string
	state: string
	fullName: string
}

export default function StudentRegisterPage() {
	const router = useRouter()
	const { isSubmitting, isSuccess, isError, error, submitProfile, clearError, resetStates } = useStudentProfile()
	const [showModal, setShowModal] = useState(false)
	const [currentStep, setCurrentStep] = useState(1)
	const [socialLinks, setSocialLinks] = useState([
		{ platform: 'linkedin', url: '' },
		{ platform: 'youtube', url: '' },
		{ platform: 'website', url: '' },
		{ platform: 'twitter', url: '' }
	])
	const [walletAddress, setWalletAddress] = useState('')
	const [walletValidation, setWalletValidation] = useState<'valid' | 'invalid' | null>(null)
	const totalSteps = 4
	const progress = (currentStep / totalSteps) * 100
	const formRef = useRef<HTMLDivElement>(null)

	// Form data state
	const [formData, setFormData] = useState({
		fullName: '',
		email: '',
		country: 'United States',
		university: '',
		program: '',
		degreeLevel: '',
		fundsRequested: '',
		quickBio: '',
		past: '',
		present: '',
		future: '',
		misc: '',
		isManualUniversity: false
	})

	// Field errors state
	const [fieldErrors, setFieldErrors] = useState({
		fullName: false,
		email: false,
		university: false
	})

	// Character counters for step 2
	const [charCounts, setCharCounts] = useState({
		quickBio: 0,
		past: 0,
		present: 0,
		future: 0,
		misc: 0
	})

	const handleInputChange = (field: string, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }))
		// Clear field error when user starts typing
		if (field === 'fullName' || field === 'email') {
			setFieldErrors(prev => ({ ...prev, [field]: false }))
		}
		clearError() // Clear any existing errors when user starts typing
	}

	const handleTextareaChange = (field: keyof typeof charCounts, value: string, maxLength: number) => {
		if (value.length <= maxLength) {
			setCharCounts(prev => ({ ...prev, [field]: value.length }))
			setFormData(prev => ({ ...prev, [field]: value }))
			clearError()
		}
	}

	const getCharCountColor = (count: number, maxLength: number) => {
		const percentage = (count / maxLength) * 100
		if (percentage >= 90) return 'text-red-500'
		if (percentage >= 75) return 'text-yellow-500'
		return 'text-muted-foreground'
	}

	// Solana wallet address validation
	const validateSolanaAddress = (address: string) => {
		if (!address) {
			setWalletValidation(null)
			return
		}
		
		// Basic Solana address validation (base58, 32-44 characters)
		const solanaAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/
		if (solanaAddressRegex.test(address)) {
			setWalletValidation('valid')
		} else {
			setWalletValidation('invalid')
		}
	}

	const handleWalletAddressChange = (value: string) => {
		setWalletAddress(value)
		validateSolanaAddress(value)
		clearError()
	}

	const steps = [
		{ number: 1, title: "Basic Info", icon: User },
		{ number: 2, title: "Your Story", icon: FileText },
		{ number: 3, title: "Social Links", icon: FileText },
		{ number: 4, title: "Wallet Setup", icon: Wallet },
	]

	const addSocialLink = () => {
		setSocialLinks([...socialLinks, { platform: '', url: '' }])
	}

	const updateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
		const newLinks = [...socialLinks]
		newLinks[index][field] = value
		setSocialLinks(newLinks)
		clearError()
	}

	const getPlatformLabel = (platform: string) => {
		switch (platform) {
			case 'linkedin': return 'LinkedIn'
			case 'youtube': return 'YouTube'
			case 'website': return 'Personal Website/Blog'
			case 'twitter': return 'Twitter/X'
			case 'instagram': return 'Instagram'
			case 'facebook': return 'Facebook'
			case 'github': return 'Github'
			case 'discord': return 'Discord'
			case 'farcaster': return 'Farcaster'
			case 'twitch': return 'Twitch'
			case 'other': return 'Other'
			default: return 'Select platform'
		}
	}

	const scrollToForm = () => {
		// Scroll to show the title "Your Story" or "Basic Information" at the top
		const headerElement = document.querySelector('.container.mx-auto.px-6.py-12.max-w-4xl')
		if (headerElement) {
			const rect = headerElement.getBoundingClientRect()
			const scrollTop = window.pageYOffset + rect.top - 100 // 100px offset from top
			window.scrollTo({
				top: scrollTop,
				behavior: 'smooth'
			})
		}
	}

	const validateStep1 = () => {
		const errors = {
			fullName: !formData.fullName.trim(),
			email: !formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
		}
		
		setFieldErrors(errors)
		return !errors.fullName && !errors.email
	}

	const nextStep = () => {
		if (currentStep === 1) {
			// Validate required fields before moving to step 2
			if (!validateStep1()) {
				return
			}
		}
		
		if (currentStep < totalSteps) {
			setCurrentStep(currentStep + 1)
			setTimeout(() => scrollToForm(), 100)
		}
	}

	const prevStep = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1)
			setTimeout(() => scrollToForm(), 100)
		}
	}

	const handleSubmit = async () => {
		try {
			// Validate required fields first
			if (!validateStep1()) {
				setCurrentStep(1) // Go back to step 1 to show errors
				setTimeout(() => scrollToForm(), 100)
				return
			}

			// Show modal and start submission
			setShowModal(true)
			
			// Prepare the data for submission
			const submissionData = {
				fullName: formData.fullName.trim(),
				email: formData.email.trim(),
				country: formData.country,
				university: formData.university || undefined,
				program: formData.program || undefined,
				degreeLevel: formData.degreeLevel || undefined,
				fundsRequested: formData.fundsRequested ? parseFloat(formData.fundsRequested) : undefined,
				quickBio: formData.quickBio || undefined,
				past: formData.past || undefined,
				present: formData.present || undefined,
				future: formData.future || undefined,
				misc: formData.misc || undefined,
				socialLinks: socialLinks.filter(link => link.url && link.url.trim() !== ''),
				walletAddress: walletAddress || undefined
			}

			const success = await submitProfile(submissionData)
			if (success) {
				// Redirect immediately on success
				router.push('/studentform/success')
			}
		} catch (err) {
			console.error('Submission error:', err)
		}
	}

	const handleModalClose = () => {
		setShowModal(false)
		resetStates()
		clearError()
	}

	const handleRetry = () => {
		setShowModal(false)
		resetStates()
		clearError()
		// Small delay to ensure states are reset before retrying
		setTimeout(() => {
			handleSubmit()
		}, 100)
	}

	const [universities, setUniversities] = useState<University[]>([])
	const [isSearching, setIsSearching] = useState(false)
	const [showUniversities, setShowUniversities] = useState(false)
	const [apiTimeout, setApiTimeout] = useState(false)
	const universityInputRef = useRef<HTMLInputElement>(null)

	const handleUniversityChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setFormData(prev => ({ ...prev, university: value }))
		setFieldErrors(prev => ({ ...prev, university: false }))
		clearError()

		if (value.trim()) {
			setIsSearching(true)
			setShowUniversities(true)
			try {
				const response = await fetch(`/api/universities/search?query=${value}`)
				const data = await response.json()
				setUniversities(data)
			} catch (error) {
				console.error('Error searching universities:', error)
			} finally {
				setIsSearching(false)
			}
		} else {
			setShowUniversities(false)
		}
	}

	const handleUniversitySelect = (university: any) => {
		setFormData(prev => ({ ...prev, university: university.name, isManualUniversity: false }))
		setShowUniversities(false)
	}

	const handleManualUniversityInput = () => {
		setFormData(prev => ({ ...prev, isManualUniversity: true }))
		setShowUniversities(false)
	}

	return (
		<Layout>
			<Analytics />
			{/* Loading Modal */}
			<LoadingModal
				isOpen={showModal}
				isLoading={isSubmitting}
				isSuccess={isSuccess}
				isError={isError}
				errorMessage={error}
				onClose={handleModalClose}
				onRetry={handleRetry}
			/>

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

				<div className="container mx-auto px-6 py-12 max-w-4xl relative z-10">
					{/* Progress Header */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="mb-12"
					>
						<h1 className="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
						Build your Medici student profile
						</h1>
						<p className="text-xl text-muted-foreground text-center mb-8 font-light leading-relaxed">
						If you're enrolled or planning to enroll in a US university and need support with tuition, share your details to get discovered by Medici donors
						</p>

						{/* Information Box */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="max-w-3xl mx-auto mb-8"
						>
							<div className="bg-gradient-to-r from-blue-100/90 via-purple-100/80 to-pink-100/90 dark:from-blue-900/40 dark:via-purple-900/30 dark:to-pink-900/40 p-6 rounded-xl border border-blue-300/60 dark:border-blue-700/40 backdrop-blur-sm shadow-lg">
								<div className="flex items-start gap-3">
									<div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2 flex-shrink-0"></div>
									<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
										<span className="font-medium text-gray-900 dark:text-gray-100">Complete this form to join the Medici student database.</span> After form submission, we'll email you to request proof of enrollment and do a quick remote verification. Once approved, your profile goes live.
									</p>
								</div>
							</div>
						</motion.div>

						{/* Progress Bar */}
						<div className="mb-8">
							<div className="flex justify-between mb-3">
								<span className="text-sm text-muted-foreground font-medium">
									Step {currentStep} of {totalSteps}
								</span>
								<span className="text-sm text-muted-foreground font-medium">{progress.toFixed(0)}% complete</span>
							</div>
							<Progress value={progress} className="h-2" />
						</div>

						{/* Step Indicators */}
						<div className="flex justify-between">
							{steps.map((step) => {
								const Icon = step.icon
								const isActive = currentStep === step.number
								const isCompleted = currentStep > step.number

								return (
									<motion.div
										key={step.number}
										initial={{ opacity: 0, scale: 0.8 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.3, delay: step.number * 0.1 }}
										className="flex flex-col items-center"
									>
										<div
											className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
												isCompleted
													? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
													: isActive
														? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
														: "bg-card/80 backdrop-blur-sm text-muted-foreground border border-border/50"
											}`}
										>
											{isCompleted ? <CheckCircle className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
										</div>
										<span
											className={`text-sm text-center font-medium transition-colors ${
												isActive ? "text-blue-600" : isCompleted ? "text-blue-600" : "text-muted-foreground"
											}`}
										>
											{step.title}
										</span>
									</motion.div>
								)
							})}
						</div>
					</motion.div>

					{/* Step Content */}
					<motion.div
						ref={formRef}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4, delay: 0.3 }}
					>
						<Card className="backdrop-blur-xl bg-card/80 border-border/50 shadow-2xl">
															<CardContent className="p-8">
								{/* Error Display */}
								{error && (
									<motion.div
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										className="mb-6"
									>
										<Alert variant="destructive">
											<AlertCircle className="h-4 w-4" />
											<AlertDescription>{error}</AlertDescription>
										</Alert>
									</motion.div>
								)}

								<AnimatePresence mode="wait">
									<motion.div
										key={currentStep}
										initial={{ opacity: 0, x: 20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -20 }}
										transition={{ duration: 0.3 }}
									>
										{currentStep === 1 && (
											<div className="space-y-8">
												<div>
													<div className="flex items-center gap-2 mb-4">
														<CardTitle className="text-2xl font-light">Basic Information</CardTitle>
														<TooltipProvider>
															<Tooltip delayDuration={200}>
																<TooltipTrigger asChild>
																	<Button variant="ghost" size="icon" className="p-0 h-auto">
																		<Info className="h-4 w-4 text-muted-foreground" />
																	</Button>
																</TooltipTrigger>
																<TooltipContent 
																	side="right" 
																	align="center" 
																	className="max-w-[300px] p-4 bg-card shadow-lg rounded-xl border border-border"
																>
																	<p className="text-sm text-muted-foreground leading-relaxed">
																		Accurate degree, major, and location details make it easier for us to verify your profile and for donors to find you.
																	</p>
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													</div>
													<p className="text-muted-foreground mb-8 leading-relaxed">
														Tell us about yourself and your educational background.
													</p>
												</div>

												<motion.div
													initial={{ opacity: 0, y: 10 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ duration: 0.3, delay: 0.1 }}
												>
													<Label htmlFor="fullName" className="text-sm font-medium">
														Full Name <span className="text-red-500">*</span>
													</Label>
													<Input
														id="fullName"
														placeholder="Enter your full name"
														className={`mt-2 rounded-full border-border/50 h-12 bg-background/50 backdrop-blur-sm ${
															fieldErrors.fullName ? 'border-red-500 ring-2 ring-red-500/20' : ''
														}`}
														required
														value={formData.fullName}
														onChange={(e) => handleInputChange('fullName', e.target.value)}
													/>
													{fieldErrors.fullName && (
														<p className="text-red-500 text-sm mt-1">Full name is required</p>
													)}
												</motion.div>

												<motion.div
													initial={{ opacity: 0, y: 10 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ duration: 0.3, delay: 0.2 }}
												>
													<Label htmlFor="email" className="text-sm font-medium">
														Email Address <span className="text-red-500">*</span>
													</Label>
													<Input
														id="email"
														type="email"
														placeholder="your.email@example.com"
														className={`mt-2 rounded-full border-border/50 h-12 bg-background/50 backdrop-blur-sm ${
															fieldErrors.email ? 'border-red-500 ring-2 ring-red-500/20' : ''
														}`}
														required
														value={formData.email}
														onChange={(e) => handleInputChange('email', e.target.value)}
													/>
													{fieldErrors.email && (
														<p className="text-red-500 text-sm mt-1">
															{!formData.email.trim() ? 'Email is required' : 'Please enter a valid email address'}
														</p>
													)}
												</motion.div>

												<div className="grid md:grid-cols-2 gap-6">
													<motion.div
														initial={{ opacity: 0, y: 10 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ duration: 0.3, delay: 0.3 }}
													>
														<Label htmlFor="country" className="text-sm font-medium">
															Country
														</Label>
														<Input
															id="country"
															value={formData.country}
															onChange={(e) => handleInputChange('country', e.target.value)}
															className="mt-2 rounded-full border-border/50 h-12 bg-background/30 backdrop-blur-sm text-muted-foreground"
														/>
													</motion.div>
													<motion.div
														initial={{ opacity: 0, x: -10 }}
														animate={{ opacity: 1, x: 0 }}
														transition={{ duration: 0.3, delay: 0.3 }}
														className="relative"
													>
														<Label htmlFor="university">University</Label>
														<div className="relative">
															<Input
																type="text"
																id="university"
																name="university"
																value={formData.university}
																onChange={handleUniversityChange}
																placeholder="Search for your University..."
																className={`w-full h-12 mt-2 rounded-full border-border/50 bg-background/50 backdrop-blur-sm ${fieldErrors.university ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
																autoComplete="off"
																ref={universityInputRef}
																onFocus={() => setShowUniversities(true)}
																onBlur={() => setTimeout(() => setShowUniversities(false), 150)}
															/>
															{isSearching && (
																<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
																	<Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
																</div>
															)}
														</div>
														{showUniversities && (
															<div className="absolute z-10 w-full mt-1 bg-background border rounded-xl shadow-lg max-h-60 overflow-auto transition-all duration-200">
																{universities.length > 0 && !formData.isManualUniversity ? (
																	universities.map((uni) => (
																		<div
																			key={uni.id || uni.name}
																			className="px-4 py-2 hover:bg-muted cursor-pointer rounded-xl"
																			onMouseDown={() => handleUniversitySelect(uni)}
																		>
																			<div className="font-medium">{uni.name || "Unknown University"}</div>
																			<div className="text-sm text-muted-foreground">{uni.city || ""}, {uni.state || ""}</div>
																		</div>
																	))
																) : (!isSearching && !formData.isManualUniversity && formData.university.trim().length > 0) ? (
																	<div
																		className="px-4 py-2 text-muted-foreground cursor-pointer hover:bg-muted rounded-xl"
																		onMouseDown={() => {
																			setFormData(prev => ({ ...prev, university: prev.university, isManualUniversity: true }));
																			setShowUniversities(false);
																		}}
																	>
																		Not found? <span className="underline">Click to add manually</span>
																	</div>
																) : null}
															</div>
														)}
														{fieldErrors.university && (
															<motion.p
																initial={{ opacity: 0, y: -10 }}
																animate={{ opacity: 1, y: 0 }}
																className="text-sm text-red-500 mt-1"
															>
																{fieldErrors.university}
															</motion.p>
														)}
													</motion.div>
												</div>

												<div className="grid md:grid-cols-2 gap-6">
													<motion.div
														initial={{ opacity: 0, y: 10 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ duration: 0.3, delay: 0.5 }}
													>
														<Label htmlFor="program" className="text-sm font-medium">
															Program/Major
														</Label>
														<Input
															id="program"
															placeholder="e.g., Computer Science, Medicine"
															className="mt-2 rounded-full border-border/50 h-12 bg-background/50 backdrop-blur-sm"
															value={formData.program}
															onChange={(e) => handleInputChange('program', e.target.value)}
														/>
													</motion.div>
													<motion.div
														initial={{ opacity: 0, y: 10 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ duration: 0.3, delay: 0.6 }}
													>
														<Label htmlFor="degree" className="text-sm font-medium">
															Degree Level
														</Label>
														<Select
															value={formData.degreeLevel}
															onValueChange={(value) => handleInputChange('degreeLevel', value)}
														>
															<SelectTrigger className="mt-2 rounded-full border-border/50 h-12 bg-background/50 backdrop-blur-sm">
																<SelectValue placeholder="Select degree level" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="undergraduate">Undergraduate</SelectItem>
																<SelectItem value="graduate">Graduate/Master's</SelectItem>
																<SelectItem value="phd">PhD</SelectItem>
															</SelectContent>
														</Select>
													</motion.div>
												</div>

												<motion.div
													initial={{ opacity: 0, y: 10 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ duration: 0.3, delay: 0.7 }}
												>
													<div className="flex items-center gap-2">
														<Label htmlFor="totalAmount" className="text-sm font-medium">
															Total Funds Requested (USD)
														</Label>
														<TooltipProvider>
															<Tooltip delayDuration={200}>
																<TooltipTrigger asChild>
																	<Button variant="ghost" size="icon" className="p-0 h-auto">
																		<Info className="h-4 w-4 text-muted-foreground" />
																	</Button>
																</TooltipTrigger>
																<TooltipContent 
																	side="right" 
																	align="center" 
																	className="max-w-[300px] p-4 bg-card shadow-lg rounded-xl border border-border"
																>
																	<p className="text-sm text-muted-foreground leading-relaxed">
																		Tell donors the funding gap: total tuition minus what you can cover yourself or through other aid.
																	</p>
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													</div>
													<div className="relative mt-2">
														<span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400 font-medium z-10">$</span>
														<Input
															id="totalAmount"
															type="number"
															placeholder="0.00"
															className="pl-8 rounded-full border-border/50 h-12 bg-background/50 backdrop-blur-sm"
															value={formData.fundsRequested}
															onChange={(e) => handleInputChange('fundsRequested', e.target.value)}
														/>
													</div>
													<p className="text-sm text-muted-foreground mt-2">Enter the total amount you need for your education</p>
												</motion.div>
											</div>
										)}

										{currentStep === 2 && (
											<div className="space-y-8">
												<div>
													<CardTitle className="text-2xl font-light mb-4">Your Story</CardTitle>
													<p className="text-muted-foreground mb-8 leading-relaxed">
														What you write here appears on your public profile. Inspire donors with your responses!<br />
														Not ready? Leave this blank and we'll collect it when we verify documents.
													</p>
												</div>

												{/* Quick Bio */}
												<motion.div
													initial={{ opacity: 0, y: 10 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ duration: 0.3, delay: 0.1 }}
												>
													<div className="flex items-center gap-2 mb-2">
														<Label htmlFor="quickBio" className="text-base font-medium">
															Quick Bio
														</Label>
														<TooltipProvider>
															<Tooltip delayDuration={200}>
																<TooltipTrigger asChild>
																	<Button variant="ghost" size="icon" className="p-0 h-auto">
																		<Info className="h-4 w-4 text-muted-foreground" />
																	</Button>
																</TooltipTrigger>
																<TooltipContent 
																	side="right" 
																	align="center" 
																	className="max-w-[400px] p-4 bg-card shadow-lg rounded-xl border border-border"
																>
																	<p className="text-sm text-muted-foreground leading-relaxed">
																		<span className="font-medium">Example:</span><br />
																		First-gen learner chasing equitable tech for all.
																	</p>
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													</div>
													<Textarea
														id="quickBio"
														placeholder="One or two sentences that sum you up..."
														className="mt-2 min-h-[80px] border-border/50 rounded-lg bg-background/50 backdrop-blur-sm resize-none"
														maxLength={80}
														value={formData.quickBio}
														onChange={(e) => handleTextareaChange('quickBio', e.target.value, 80)}
													/>
													<div className="flex justify-end mt-1">
														<span className={`text-xs ${getCharCountColor(charCounts.quickBio, 80)}`}>
															{charCounts.quickBio}/80
														</span>
													</div>
												</motion.div>

												{/* Past */}
												<motion.div
													initial={{ opacity: 0, y: 10 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ duration: 0.3, delay: 0.2 }}
												>
													<div className="flex items-center gap-2 mb-2">
														<Label htmlFor="past" className="text-base font-medium">
															Past
														</Label>
														<TooltipProvider>
															<Tooltip delayDuration={200}>
																<TooltipTrigger asChild>
																	<Button variant="ghost" size="icon" className="p-0 h-auto">
																		<Info className="h-4 w-4 text-muted-foreground" />
																	</Button>
																</TooltipTrigger>
																<TooltipContent 
																	side="right" 
																	align="center" 
																	className="max-w-[400px] p-4 bg-card shadow-lg rounded-xl border border-border"
																>
																	<p className="text-sm text-muted-foreground leading-relaxed">
																		<span className="font-medium">Example:</span><br />
																		When my hometown factory closed, I spent weekends repairing discarded electronics to help support my family. That challenge showed me how inventive engineering can revive communities and pushed me toward studying sustainable manufacturing.
																	</p>
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													</div>
													<Textarea
														id="past"
														placeholder="What experiences or challenges led you to pursue this education?"
														className="mt-2 min-h-[120px] border-border/50 rounded-lg bg-background/50 backdrop-blur-sm resize-none"
														maxLength={300}
														value={formData.past}
														onChange={(e) => handleTextareaChange('past', e.target.value, 300)}
													/>
													<div className="flex justify-end mt-1">
														<span className={`text-xs ${getCharCountColor(charCounts.past, 300)}`}>
															{charCounts.past}/300
														</span>
													</div>
												</motion.div>

												{/* Present */}
												<motion.div
													initial={{ opacity: 0, y: 10 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ duration: 0.3, delay: 0.3 }}
												>
													<div className="flex items-center gap-2 mb-2">
														<Label htmlFor="present" className="text-base font-medium">
															Present
														</Label>
														<TooltipProvider>
															<Tooltip delayDuration={200}>
																<TooltipTrigger asChild>
																	<Button variant="ghost" size="icon" className="p-0 h-auto">
																		<Info className="h-4 w-4 text-muted-foreground" />
																	</Button>
																</TooltipTrigger>
																<TooltipContent 
																	side="right" 
																	align="center" 
																	className="max-w-[400px] p-4 bg-card shadow-lg rounded-xl border border-border"
																>
																	<p className="text-sm text-muted-foreground leading-relaxed">
																		<span className="font-medium">Example:</span><br />
																		Medici donations would let me drop a night job and instead join my professor's renewable-energy lab, giving me hands-on battery-prototype experience and raising my GPA for a competitive research fellowship.
																	</p>
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													</div>
													<Textarea
														id="present"
														placeholder="How would this support change your academic life?"
														className="mt-2 min-h-[120px] border-border/50 rounded-lg bg-background/50 backdrop-blur-sm resize-none"
														maxLength={300}
														value={formData.present}
														onChange={(e) => handleTextareaChange('present', e.target.value, 300)}
													/>
													<div className="flex justify-end mt-1">
														<span className={`text-xs ${getCharCountColor(charCounts.present, 300)}`}>
															{charCounts.present}/300
														</span>
													</div>
												</motion.div>

												{/* Future */}
												<motion.div
													initial={{ opacity: 0, y: 10 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ duration: 0.3, delay: 0.4 }}
												>
													<div className="flex items-center gap-2 mb-2">
														<Label htmlFor="future" className="text-base font-medium">
															Future
														</Label>
														<TooltipProvider>
															<Tooltip delayDuration={200}>
																<TooltipTrigger asChild>
																	<Button variant="ghost" size="icon" className="p-0 h-auto">
																		<Info className="h-4 w-4 text-muted-foreground" />
																	</Button>
																</TooltipTrigger>
																<TooltipContent 
																	side="right" 
																	align="center" 
																	className="max-w-[400px] p-4 bg-card shadow-lg rounded-xl border border-border"
																>
																	<p className="text-sm text-muted-foreground leading-relaxed">
																		<span className="font-medium">Example:</span><br />
																		After graduation I want to build micro-factories that turn agricultural waste into affordable building materials, creating green jobs in rural areas and cutting carbon footprints across supply chains worldwide.
																	</p>
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													</div>
													<Textarea
														id="future"
														placeholder="After graduation, how do you plan to use your education in the real world?"
														className="mt-2 min-h-[120px] border-border/50 rounded-lg bg-background/50 backdrop-blur-sm resize-none"
														maxLength={300}
														value={formData.future}
														onChange={(e) => handleTextareaChange('future', e.target.value, 300)}
													/>
													<div className="flex justify-end mt-1">
														<span className={`text-xs ${getCharCountColor(charCounts.future, 300)}`}>
															{charCounts.future}/300
														</span>
													</div>
												</motion.div>

												{/* Misc */}
												<motion.div
													initial={{ opacity: 0, y: 10 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ duration: 0.3, delay: 0.5 }}
												>
													<div className="flex items-center gap-2 mb-2">
														<Label htmlFor="misc" className="text-base font-medium">
															Misc
														</Label>
														<TooltipProvider>
															<Tooltip delayDuration={200}>
																<TooltipTrigger asChild>
																	<Button variant="ghost" size="icon" className="p-0 h-auto">
																		<Info className="h-4 w-4 text-muted-foreground" />
																	</Button>
																</TooltipTrigger>
																<TooltipContent 
																	side="right" 
																	align="center" 
																	className="max-w-[400px] p-4 bg-card shadow-lg rounded-xl border border-border"
																>
																	<p className="text-sm text-muted-foreground leading-relaxed">
																		<span className="font-medium">Example:</span><br />
																		Outside class I co-founded an open-source Braille-translator project with volunteers from five countries; funds will help us launch a free mobile app so visually impaired students everywhere can read STEM textbooks.
																	</p>
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													</div>
													<Textarea
														id="misc"
														placeholder="Any other information you want to share..."
														className="mt-2 min-h-[120px] border-border/50 rounded-lg bg-background/50 backdrop-blur-sm resize-none"
														maxLength={300}
														value={formData.misc}
														onChange={(e) => handleTextareaChange('misc', e.target.value, 300)}
													/>
													<div className="flex justify-end mt-1">
														<span className={`text-xs ${getCharCountColor(charCounts.misc, 300)}`}>
															{charCounts.misc}/300
														</span>
													</div>
												</motion.div>
											</div>
										)}

										{currentStep === 3 && (
											<div className="space-y-8">
												<div>
													<div className="flex items-center gap-2 mb-4">
														<CardTitle className="text-2xl font-light">Social Links</CardTitle>
														<TooltipProvider>
															<Tooltip delayDuration={200}>
																<TooltipTrigger asChild>
																	<Button variant="ghost" size="icon" className="p-0 h-auto">
																		<Info className="h-4 w-4 text-muted-foreground" />
																	</Button>
																</TooltipTrigger>
																<TooltipContent 
																	side="right" 
																	align="center" 
																	className="max-w-[300px] p-4 bg-card shadow-lg rounded-xl border border-border"
																>
																	<p className="text-sm text-muted-foreground leading-relaxed">
																		These links appear on your public page. Add only profiles you're proud of; you can skip or remove them anytime.
																	</p>
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													</div>
													<p className="text-muted-foreground mb-8 leading-relaxed">
														Add public profiles so donors can trust your identity and feel confident funding you.
													</p>
												</div>

												<div className="space-y-6">
													{/* Default platforms */}
													{socialLinks.slice(0, 4).map((link, index) => (
														<motion.div
															key={index}
															initial={{ opacity: 0, y: 10 }}
															animate={{ opacity: 1, y: 0 }}
															transition={{ duration: 0.3, delay: index * 0.1 }}
															className="space-y-2"
														>
															<Label className="text-sm font-medium">
																{getPlatformLabel(link.platform)}
															</Label>
															<Input
																value={link.url}
																onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
																placeholder={`Enter your ${getPlatformLabel(link.platform)} URL`}
																className="rounded-full border-border/50 h-12 bg-background/50 backdrop-blur-sm"
															/>
														</motion.div>
													))}

													{/* Additional social links */}
													{socialLinks.slice(4).map((link, index) => (
														<motion.div
															key={index + 4}
															initial={{ opacity: 0, y: 10 }}
															animate={{ opacity: 1, y: 0 }}
															transition={{ duration: 0.3, delay: (index + 4) * 0.1 }}
															className="grid grid-cols-2 gap-4"
														>
															<div>
																<Select
																	value={link.platform}
																	onValueChange={(value) => updateSocialLink(index + 4, 'platform', value)}
																>
																	<SelectTrigger className="rounded-full border-border/50 h-12 bg-background/50 backdrop-blur-sm">
																		<SelectValue placeholder="Select platform" />
																	</SelectTrigger>
																	<SelectContent>
																		<SelectItem value="github">Github</SelectItem>
																		<SelectItem value="discord">Discord</SelectItem>
																		<SelectItem value="farcaster">Farcaster</SelectItem>
																		<SelectItem value="twitch">Twitch</SelectItem>
																		<SelectItem value="instagram">Instagram</SelectItem>
																		<SelectItem value="facebook">Facebook</SelectItem>
																		<SelectItem value="other">Other</SelectItem>
																	</SelectContent>
																</Select>
															</div>
															<Input
																value={link.url}
																onChange={(e) => updateSocialLink(index + 4, 'url', e.target.value)}
																placeholder="Enter URL"
																className="rounded-full border-border/50 h-12 bg-background/50 backdrop-blur-sm"
															/>
														</motion.div>
													))}

													<Button
														type="button"
														variant="outline"
														onClick={addSocialLink}
														className="rounded-full border-border/50 hover:bg-background/80 backdrop-blur-sm"
													>
														<Plus className="h-4 w-4 mr-2" />
														Add Another Link
													</Button>
												</div>
											</div>
										)}

										{currentStep === 4 && (
											<div className="space-y-8">
												<div>
													<CardTitle className="text-2xl font-light mb-4">Wallet Setup</CardTitle>
													<p className="text-muted-foreground mb-8 leading-relaxed">
														Set up your wallet to receive funding directly.
													</p>
												</div>

												<motion.div
													initial={{ opacity: 0, y: 10 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ duration: 0.3, delay: 0.1 }}
												>
													<div className="flex items-center gap-2">
														<Label htmlFor="walletAddress" className="text-sm font-medium">
															Wallet address (Solana compatible)
														</Label>
														<TooltipProvider>
															<Tooltip delayDuration={200}>
																<TooltipTrigger asChild>
																	<Button variant="ghost" size="icon" className="p-0 h-auto">
																		<Info className="h-4 w-4 text-muted-foreground" />
																	</Button>
																</TooltipTrigger>
																<TooltipContent 
																	side="right" 
																	align="center" 
																	className="max-w-[300px] p-4 bg-card shadow-lg rounded-xl border border-border"
																>
																	<p className="text-sm text-muted-foreground leading-relaxed">
																		A wallet address is like a digital account number. Use one that can hold USDC on Solana.
																	</p>
																</TooltipContent>
															</Tooltip>
														</TooltipProvider>
													</div>
													<div className="relative">
														<Input
															id="walletAddress"
															placeholder="Ex: 6JxN…Q9sA"
															className="mt-2 font-mono text-sm rounded-full border-border/50 h-12 bg-background/50 backdrop-blur-sm pr-24"
															value={walletAddress}
															onChange={(e) => handleWalletAddressChange(e.target.value)}
														/>
														{walletValidation && (
															<div className={`absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-sm ${
																walletValidation === 'valid' ? 'text-green-600' : 'text-red-500'
															}`}>
																{walletValidation === 'valid' ? (
																	<>
																		<span className="text-green-600">✓</span>
																		<span className="text-xs">Valid address</span>
																	</>
																) : (
																	<>
																		<span className="text-red-500">✕</span>
																		<span className="text-xs">Invalid format</span>
																	</>
																)}
															</div>
														)}
													</div>
													<p className="text-sm text-muted-foreground mt-3 leading-relaxed">
														Donors pay you straight to your wallet, creating a public record of every transfer. Enter the address carefully; transactions can't be reversed if the address is incorrect or not Solana-compatible.
													</p>
												</motion.div>

												<div className="bg-yellow-50/50 dark:bg-yellow-950/20 p-6 rounded-lg border border-yellow-200/50 dark:border-yellow-800/50 backdrop-blur-sm">
													<h4 className="font-medium mb-3 flex items-center gap-2">
														<Wallet className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
														Need help with wallet setup?
													</h4>
													<p className="text-sm text-muted-foreground mb-4 leading-relaxed">
														Skip this step for now. We'll email helpful instruction and guides so you can add your wallet when you're ready.
													</p>
												</div>

												<div className="space-y-6">
													<h4 className="font-medium">Supported Wallets:</h4>
													<div className="grid grid-cols-2 gap-6 text-sm">
														{["Phantom", "Solflare", "Metamask", "Coinbase Wallet"].map((wallet, index) => (
															<motion.div
																key={wallet}
																initial={{ opacity: 0, x: -10 }}
																animate={{ opacity: 1, x: 0 }}
																transition={{ duration: 0.3, delay: index * 0.1 }}
																className="flex items-center gap-3"
															>
																<div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
																{wallet}
															</motion.div>
														))}
													</div>
												</div>
											</div>
										)}
									</motion.div>
								</AnimatePresence>

								{/* Navigation Buttons */}
								<div className="flex justify-between pt-8 border-t border-border/50">
									<Button
										variant="outline"
										onClick={prevStep}
										disabled={currentStep === 1}
										className="rounded-full border-border/50 hover:bg-background/80 backdrop-blur-sm px-6 transition-all duration-300"
									>
										<ArrowLeft className="mr-2 h-4 w-4" />
										Previous
									</Button>

									<div className="flex flex-col items-end gap-2">
										{currentStep === 1 && (fieldErrors.fullName || fieldErrors.email) && (
											<p className="text-red-500 text-sm">
												{fieldErrors.fullName && fieldErrors.email 
													? "Full name and email are required" 
													: fieldErrors.fullName 
														? "Full name is required"
														: "Please enter a valid email address"}
											</p>
										)}
										{currentStep < totalSteps ? (
											<Button 
												onClick={nextStep} 
												className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
											>
												Next
												<ArrowRight className="ml-2 h-4 w-4" />
											</Button>
										) : (
											<Button 
												onClick={handleSubmit}
												disabled={isSubmitting}
												className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
											>
												{isSubmitting ? 'Submitting...' : 'Submit Application'}
											</Button>
										)}
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>
		</Layout>
	)
}

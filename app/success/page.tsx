"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Heart, Share2, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function SuccessPage() {
  // Sample values
  const transactionData = {
    amount: "50",
    hash: "0xe8ad4be130baa995bce7b184d2c83b351f316e7a44828286779bc2e6d778cc83",
    network: "Solana",
    status: "Confirmed",
    from: "0x420aef56973233f735b9501f234b31ff5c47be62",
    to: "0x420aef56973233f735b9501f234b31ff5c47be62"
  }

  // Notify form logic (from notify page)
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [errors, setErrors] = useState({ email: "", name: "" })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

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
    setApiError(null)
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (!response.ok) {
        if (response.status === 409) {
          setErrors(prev => ({ ...prev, email: "This email is already registered" }))
          emailRef.current?.focus()
          return
        }
        throw new Error(data.error || 'Something went wrong')
      }
      setFormData({ name: "", email: "" })
      setIsSubmitted(true)
    } catch (error: any) {
      setApiError(error.message || "Failed to submit. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (name === 'email') {
      setErrors(prev => ({ ...prev, email: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-background dark:bg-black text-foreground">
      <Header />
      <div className="container mx-auto px-6 py-20 max-w-2xl text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle className="h-12 w-12 text-blue-400" />
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.h1
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-4xl md:text-5xl font-light text-foreground mb-6 leading-tight"
          >
            Your funds are on the way to Medici!
          </motion.h1>
        </AnimatePresence>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-xl text-muted-foreground mb-6 font-light leading-relaxed"
        >
          Thank you for your contribution. We will use these funds to support and donate to verified students in need.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {/* Transaction Details */}
          <Card className="mb-8 bg-card border-border">
            <CardContent className="p-6">
              <h3 className="font-medium text-foreground mb-4">Transaction Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium text-foreground">${transactionData.amount} USDC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">From:</span>
                  <a
                    href={`https://explorer.solana.com/address/${transactionData.from}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-blue-500 hover:text-blue-400 break-all underline"
                  >
                    {transactionData.from}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">To:</span>
                  <a
                    href={`https://explorer.solana.com/address/${transactionData.to}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-blue-500 hover:text-blue-400 break-all underline"
                  >
                    {transactionData.to}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction Hash:</span>
                  <a
                    href={`https://explorer.solana.com/tx/${transactionData.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-blue-500 hover:text-blue-400 break-all underline"
                  >
                    {transactionData.hash}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network:</span>
                  <span className="font-medium text-foreground">{transactionData.network}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="text-green-400 font-medium flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    {transactionData.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="mb-8">
            <Card className="w-full bg-white dark:bg-card border border-border/50 shadow-md rounded-2xl">
              <CardContent className="p-6 md:p-8">
                <div className="mb-4">
                  <h2 className="text-xl md:text-2xl font-bold text-center mb-1">Subscribe to Medici</h2>
                  <p className="text-muted-foreground text-center mb-4 text-base">We will notify you as soon as student profiles are public.</p>
                </div>
                {apiError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600 text-center">{apiError}</p>
                  </div>
                )}
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">You're In!</h3>
                    <p className="text-muted-foreground mb-2">Thanks for subscribing. We'll notify you as soon as student profiles are public.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-left block">Full Name</Label>
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
                        <p className="text-sm text-red-500 mt-1 text-left">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-left block">Email Address</Label>
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
                        <p className="text-sm text-red-500 mt-1 text-left">{errors.email}</p>
                      )}
                    </div>
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
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                          />
                        ) : (
                          "Notify Me"
                        )}
                      </Button>
                    </motion.div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1 h-12 rounded-full border border-border bg-background text-foreground font-medium flex items-center justify-center transition">
              <Share2 className="mr-2 h-5 w-5" />
              Share
            </Button>
            <Button variant="outline" asChild className="flex-1 rounded-full border-border bg-background text-foreground hover:bg-muted h-12 font-medium">
              <Link href="/">
                Go Home
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
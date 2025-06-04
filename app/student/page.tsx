"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, Clock, Star, Loader2 } from "lucide-react"
import Link from "next/link"
import { useDebounce } from "@/hooks/use-debounce"
import { Layout } from "@/components/layout"

const studentTexts = [
  "Get Help Paying for College",
]

interface University {
  id: string
  name: string
  city: string
  state: string
  fullName: string
}

interface FormData {
  name: string
  email: string
  university: string
  fieldOfStudy: string
  degree: string
  fundsRequested: string
  country: string
  isManualUniversity?: boolean
}

export default function StudentPage() {
  const [currentText, setCurrentText] = useState(0)
  const [universities, setUniversities] = useState<University[]>([])
  const [showUniversities, setShowUniversities] = useState(false)
  const [apiTimeout, setApiTimeout] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    university: "",
    fieldOfStudy: "",
    degree: "",
    fundsRequested: "",
    country: "US",
    isManualUniversity: false
  })
  const [errors, setErrors] = useState({
    email: "",
    name: "",
    university: "",
    fieldOfStudy: "",
    degree: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [userSelectedUniversity, setUserSelectedUniversity] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const debouncedUniversitySearch = useDebounce(formData.university, 300)
  const universityInputRef = useRef<HTMLInputElement>(null)

  // Refs for form fields to scroll to them when there are errors
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const fieldOfStudyRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % studentTexts.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const searchUniversities = async () => {
      if (debouncedUniversitySearch.length < 3 || userSelectedUniversity) {
        setUniversities([])
        setIsSearching(false)
        setApiTimeout(false)
        setShowUniversities(false)
        return
      }

      setIsSearching(true)
      setApiTimeout(false)
      setShowUniversities(true)

      // Create a timeout promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout')), 5000) // 5 second timeout
      })

      try {
        const fetchPromise = fetch(
          `/api/universities/search?query=${encodeURIComponent(debouncedUniversitySearch)}`
        )

        // Race between the fetch and the timeout
        const response = await Promise.race([fetchPromise, timeoutPromise]) as Response
        if (!response.ok) throw new Error('Failed to fetch universities')
        const data = await response.json()
        if (!userSelectedUniversity) {
          setUniversities(data)
          setShowUniversities(true)
          if (data.length === 0) {
            setApiTimeout(true) // Show manual input option if no results
          }
        }
      } catch (error) {
        console.error('Error searching universities:', error)
        if (!userSelectedUniversity) {
          setUniversities([])
          setApiTimeout(true) // Show manual input option on error
        }
      } finally {
        setIsSearching(false)
      }
    }

    searchUniversities()
  }, [debouncedUniversitySearch, userSelectedUniversity])

  const handleUniversitySelect = (university: University) => {
    setFormData(prev => ({
      ...prev,
      university: university.name,
      isManualUniversity: false
    }))
    setUserSelectedUniversity(true)
    setShowUniversities(false)
    setUniversities([])
    setApiTimeout(false)
  }

  const handleUniversityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setFormData(prev => ({
      ...prev,
      university: value
    }))
    setUserSelectedUniversity(false)
    setShowUniversities(true)
    
    // Clear university error when user starts typing
    if (errors.university) {
      setErrors(prev => ({
        ...prev,
        university: ''
      }))
    }
  }

  const handleManualUniversityInput = () => {
    setFormData(prev => ({
      ...prev,
      isManualUniversity: true
    }))
    setShowUniversities(false)
    setUniversities([])
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const scrollToFirstError = (newErrors: typeof errors) => {
    // Find the first field with an error and scroll to it
    if (newErrors.name) {
      nameRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      nameRef.current?.focus()
    } else if (newErrors.email) {
      emailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      emailRef.current?.focus()
    } else if (newErrors.university) {
      universityInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      universityInputRef.current?.focus()
    } else if (newErrors.fieldOfStudy) {
      fieldOfStudyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      fieldOfStudyRef.current?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setApiError(null) // Clear any previous API errors
    
    // Validate all required fields (funds requested is optional)
    const newErrors = {
      name: !formData.name.trim() ? "Full name is required" : "",
      email: !formData.email.trim() ? "Email is required" : !validateEmail(formData.email) ? "Please enter a valid email address" : "",
      university: !formData.university.trim() ? "University is required" : "",
      fieldOfStudy: !formData.fieldOfStudy.trim() ? "Field of study is required" : "",
      degree: !formData.degree ? "Degree level is required" : "",
    }

    setErrors(newErrors)

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error !== "")) {
      scrollToFirstError(newErrors)
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form')
      }

      setIsSubmitted(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch (error) {
      console.error("Error submitting form:", error)
      setApiError("Something went wrong. Please try again or reload the page.")
      window.scrollTo({ top: 0, behavior: "smooth" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear degree error when user selects a value
    if (name === 'degree' && errors.degree) {
      setErrors(prev => ({
        ...prev,
        degree: ''
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
              Thanks for Requesting an Invite!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-muted-foreground mb-8 leading-relaxed"
            >
              We've received your details and will reach out.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
              <Link href="/">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
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
          {[...Array(12)].map((_, i) => (
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
                    {studentTexts[currentText]}
                  </motion.h1>
                </AnimatePresence>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              >
                Medici is currently curating verified student profiles and preparing for launch. If you're enrolled or planning to enroll in a US university and need support with tuition, submit your details. We'll reach out and invite you to create your full profile for donors to choose from and fund.
              </motion.p>
            </motion.div>

   

            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="max-w-md mx-auto"
            >
              <Card className="backdrop-blur-xl bg-card/80 border-border/50 shadow-2xl">
                <CardContent className="p-6">
                  {/* Add this header section */}
                  <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      Get Started
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed px-4">
                      During launch, the default view for donors will show student profiles in order of submission date. Creating your profile early may increase your chances of being seen and funded first.
                    </p>
                  </div>

                  {apiError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md"
                    >
                      <p className="text-sm text-red-600 text-center">{apiError}</p>
                      <Button
                        type="button"
                        variant="link"
                        className="mx-auto mt-2 text-red-600 hover:text-red-700"
                        onClick={() => window.location.reload()}
                      >
                        Reload Page
                      </Button>
                    </motion.div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name *
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
                        Email Address *
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
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="relative"
                    >
                      <Label htmlFor="university">University *</Label>
                      <div className="relative">
                        <Input
                          type="text"
                          id="university"
                          name="university"
                          value={formData.university}
                          onChange={handleUniversityChange}
                          placeholder="Search for your university..."
                          className={`w-full h-12 mt-2 ${errors.university ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                          autoComplete="off"
                          ref={universityInputRef}
                        />
                        {isSearching && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      
                      {errors.university && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500 mt-1"
                        >
                          {errors.university}
                        </motion.p>
                      )}
                      
                      {showUniversities && universities.length > 0 && !formData.isManualUniversity && (
                        <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-auto">
                          {universities.map((uni) => (
                            <div
                              key={uni.id}
                              className="px-4 py-2 hover:bg-muted cursor-pointer"
                              onClick={() => handleUniversitySelect(uni)}
                            >
                              <div className="font-medium">{uni.name}</div>
                              <div className="text-sm text-muted-foreground">{uni.city}, {uni.state}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {apiTimeout && !formData.isManualUniversity && (
                        <div className="mt-2 text-sm">
                          <p className="text-muted-foreground mb-1">University not found in our database?</p>
                          <Button
                            type="button"
                            variant="link"
                            className="p-0 h-auto text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            onClick={handleManualUniversityInput}
                          >
                            Click here to enter manually
                          </Button>
                        </div>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                    >
                      <Label htmlFor="fieldOfStudy" className="text-sm font-medium">
                        Field of Study *
                      </Label>
                      <Input
                        id="fieldOfStudy"
                        name="fieldOfStudy"
                        type="text"
                        value={formData.fieldOfStudy}
                        onChange={handleChange}
                        className={`mt-2 h-12 ${errors.fieldOfStudy ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                        placeholder="e.g., Computer Science"
                        ref={fieldOfStudyRef}
                      />
                      {errors.fieldOfStudy && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500 mt-1"
                        >
                          {errors.fieldOfStudy}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 }}
                    >
                      <Label htmlFor="degree" className="text-sm font-medium">
                        Degree Level *
                      </Label>
                      <Select 
                        value={formData.degree}
                        onValueChange={(value) => handleSelectChange("degree", value)}
                      >
                        <SelectTrigger className={`mt-2 h-12 ${errors.degree ? 'border-red-500 focus-visible:ring-red-500' : ''}`}>
                          <SelectValue placeholder="Select degree level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                          <SelectItem value="master">Master's Degree</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                          <SelectItem value="associate">Associate Degree</SelectItem>
                          <SelectItem value="certificate">Certificate Program</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.degree && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-red-500 mt-1"
                        >
                          {errors.degree}
                        </motion.p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.6 }}
                    >
                      <Label htmlFor="fundsRequested" className="text-sm font-medium">
                        Funds Requested (USD) <span className="text-muted-foreground">(Optional)</span>
                      </Label>
                      <Input
                        id="fundsRequested"
                        name="fundsRequested"
                        type="number"
                        value={formData.fundsRequested}
                        onChange={handleChange}
                        className="mt-2 h-12"
                        placeholder="e.g., 5000"
                        onKeyDown={(e) => {
                          // Prevent 'e' from being entered
                          if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-') {
                            e.preventDefault();
                          }
                        }}
                        // Add min to prevent negative numbers
                        min="0"
                        // Optionally add step to only allow whole numbers
                        step="1"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 }}
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
                          "Request Invite"
                        )}
                      </Button>
                    </motion.div>
                  </form>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                    className="mt-6 text-center"
                  >
                    <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm transition-colors">
                      ← Back to Home
                    </Link>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
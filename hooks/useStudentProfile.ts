import { useState } from 'react'

interface SocialLink {
  platform: string
  url: string
}

interface StudentProfileData {
  // Step 1: Basic Information
  fullName: string
  email: string
  country: string
  university?: string
  program?: string
  degreeLevel?: string
  fundsRequested?: number
  
  // Step 2: Your Story
  quickBio?: string
  past?: string
  present?: string
  future?: string
  misc?: string
  
  // Step 3: Social Links
  socialLinks?: SocialLink[]
  
  // Step 4: Wallet Setup
  walletAddress?: string
}

interface UseStudentProfileReturn {
  isSubmitting: boolean
  isSuccess: boolean
  isError: boolean
  error: string | null
  submitProfile: (data: StudentProfileData) => Promise<boolean>
  clearError: () => void
  resetStates: () => void
}

export function useStudentProfile(): UseStudentProfileReturn {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitProfile = async (data: StudentProfileData): Promise<boolean> => {
    // Reset all states before starting
    setIsSubmitting(true)
    setIsSuccess(false)
    setIsError(false)
    setError(null)

    try {
      const response = await fetch('/api/student-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      // Check for network/server errors
      if (!response.ok) {
        let errorMessage = 'Failed to submit profile'
        
        if (response.status === 400) {
          errorMessage = result.error || 'Please check your information and try again'
        } else if (response.status === 409 || result.error?.includes('email')) {
          errorMessage = 'An account with this email already exists'
        } else if (response.status === 503) {
          errorMessage = 'Database connection failed. Please try again later.'
        } else if (response.status >= 500) {
          errorMessage = 'Server error. Please try again in a few moments.'
        }
        
        throw new Error(errorMessage)
      }

      // Check for API response errors
      if (!result.success) {
        throw new Error(result.error || 'Submission failed')
      }

      // Success
      setIsSuccess(true)
      return true

    } catch (err) {
      console.error('Submission error:', err)
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      setIsError(true)
      
      // Trigger haptic feedback on mobile devices
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100])
      }
      
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  const clearError = () => {
    setError(null)
    setIsError(false)
  }

  const resetStates = () => {
    setIsSubmitting(false)
    setIsSuccess(false)
    setIsError(false)
    setError(null)
  }

  return {
    isSubmitting,
    isSuccess,
    isError,
    error,
    submitProfile,
    clearError,
    resetStates,
  }
} 
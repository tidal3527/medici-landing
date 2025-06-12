"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Loader2, CheckCircle, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LoadingModalProps {
  isOpen: boolean
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  errorMessage?: string | null
  onClose: () => void
  onRetry: () => void
}

export function LoadingModal({
  isOpen,
  isLoading,
  isSuccess,
  isError,
  errorMessage,
  onClose,
  onRetry
}: LoadingModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ 
              scale: isError ? [1, 1.05, 1] : 1, 
              opacity: 1, 
              y: 0,
              rotate: isError ? [0, -2, 2, -2, 0] : 0
            }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ 
              duration: 0.3,
              rotate: { duration: 0.6, repeat: isError ? 2 : 0 }
            }}
            className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-6">
              {/* Loading State */}
              {isLoading && (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="flex justify-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <Loader2 className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Submitting Your Profile
                    </h3>
                    <div className="space-y-2">
                      <motion.p
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-muted-foreground"
                      >
                        Creating your student profile...
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0.3 }}
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        className="text-sm text-muted-foreground"
                      >
                        This may take a few moments
                      </motion.p>
                    </div>
                  </div>
                </>
              )}

              {/* Success State */}
              {isSuccess && (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="flex justify-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-green-600">
                      Profile Submitted Successfully!
                    </h3>
                    <p className="text-muted-foreground">
                      Redirecting you to the success page...
                    </p>
                  </div>
                </>
              )}

              {/* Error State */}
              {isError && (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.6 }}
                    className="flex justify-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-8 h-8 text-white" />
                    </div>
                  </motion.div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-red-600">
                      Submission Failed
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {errorMessage || "Something went wrong. Please try again."}
                    </p>
                    
                    <div className="flex gap-3 justify-center pt-2">
                      <Button
                        variant="outline"
                        onClick={onClose}
                        className="rounded-full"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Close
                      </Button>
                      <Button
                        onClick={onRetry}
                        className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 
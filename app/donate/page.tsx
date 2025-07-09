"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Shield, Wallet, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { motion, AnimatePresence } from "framer-motion"

export default function DonatePrototype() {
  const [step, setStep] = useState<"connect" | "form" | "success">("connect")
  const [amount, setAmount] = useState("")
  const router = useRouter()

  // Simulate sending and redirect
  const handleSend = () => {
    setStep("success")
    window.scrollTo({ top: 0, behavior: "smooth" })
    setTimeout(() => {
      router.push("/success")
    }, 2500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 pt-32 pb-32">
        <div className="w-full max-w-xl">
          {step === "success" && (
            <>
              <Card className="mb-8 border-green-500/50 bg-green-500/10">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-medium text-green-300 mb-2">Transaction Successful!</h3>
                    <p className="text-green-400/80 mb-4">Your ${amount} USDC has been sent to Medici</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-green-400/70">Amount:</span>
                        <span className="font-medium text-green-300">${amount} USDC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-400/70">Transaction Hash:</span>
                        <span className="font-mono text-xs text-green-300 break-all">0x123...abcd</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-400/70">Status:</span>
                        <span className="text-green-300 font-medium">Confirmed</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex flex-col items-center mb-8">
                <span className="text-muted-foreground text-lg mb-2">Redirecting to success page...</span>
                <span className="spinner w-6 h-6"></span>
              </div>
            </>
          )}

          {step === "connect" && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <AnimatePresence mode="wait">
                  <motion.h1
                    key="donate"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="text-4xl md:text-6xl font-bold mb-6"
                  >
                    Contribute to the Medici Amplifier
                  </motion.h1>
                </AnimatePresence>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-lg text-neutral-800 dark:text-neutral-200 mb-10 max-w-2xl mx-auto md:mb-14 md:text-xl text-left sm:text-center md:text-center lg:text-center"
                >
                  The Medici Amplifier is our matching fund designed to boost early donors’ support. 
                  By contributing, you  increase the value of every direct student donation.           
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="flex justify-center"
              >
                <Button
                  size="lg"
                  className="max-w-sm px-12 py-4 text-xl rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                  onClick={() => setStep("form")}
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  Connect Wallet
                </Button>
              </motion.div>
              <br/>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="text-sm italic text-neutral-800 dark:text-neutral-200 mt-4 text-center max-w-2xl mx-auto"
              >
                All distributions are transparent and can be verified on-chain. Matching rates vary based on available Amplifier funds and direct donation amounts. Contact us if you have any questions about connecting your wallet or making a payment.
              </motion.p>

              {/*      
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Card className="mb-8 bg-card border-border">
                  
                    <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="h-5 w-5" />
                       Send USDC via Solana to the Medici Amplifier 
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground mb-6">Connect your crypto wallet to send USDC to Medici</p>
                    <Button
                      size="lg"
                      className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                      onClick={() => setStep("form")}
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      Connect Wallet
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
              */}
            </>
          )}



          {step === "form" && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="mb-8 border-green-500/50 bg-green-500/10">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-green-300">Wallet Connected</span>
                    </div>
                    <p className="text-sm text-green-400/80 mt-1 font-mono break-all">0x420...be62</p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Card className="mb-8 bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Send USDC to Medici
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-3">Amount (USDC)</label>
                      <Input
                        type="number"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="rounded-full border-border h-12 text-lg"
                        min="0"
                      />
                      <div className="flex gap-2 mt-3">
                        {[25, 50, 100, 250].map((amt) => (
                          <Button
                            key={amt}
                            variant="outline"
                            size="sm"
                            onClick={() => setAmount(amt.toString())}
                            className="rounded-full border-border hover:bg-muted"
                          >
                            ${amt}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <Button
                      size="lg"
                      className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                      onClick={handleSend}
                      disabled={!amount}
                    >
                      <Zap className="mr-2 h-5 w-5" />
                      Send ${amount || '0'} USDC
                    </Button>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/50">
                      <p className="text-sm text-blue-400/80">
                        <Shield className="inline h-4 w-4 mr-1" />
                        Secure transaction powered by Solana blockchain
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
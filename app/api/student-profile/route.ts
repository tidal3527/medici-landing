import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Validation schema
const studentProfileSchema = z.object({
  // Step 1: Basic Information
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  country: z.string().default("United States"),
  university: z.string().optional(),
  program: z.string().optional(),
  degreeLevel: z.enum(["undergraduate", "graduate", "phd"]).optional(),
  fundsRequested: z.number().positive().optional(),
  referralCode: z.string().optional(), // <-- add this
  // Step 2: Your Story
  quickBio: z.string().max(80).optional(),
  past: z.string().max(300).optional(),
  present: z.string().max(300).optional(),
  future: z.string().max(300).optional(),
  misc: z.string().max(300).optional(),
  // Step 3: Social Links
  socialLinks: z.array(z.object({
    platform: z.string(),
    url: z.string().optional()
  })).optional(),
  // Step 4: Wallet Setup
  walletAddress: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = studentProfileSchema.parse(body)
    
    // Filter out social links with empty URLs
    const filteredSocialLinks = validatedData.socialLinks?.filter(
      link => link.url && link.url.trim() !== ''
    ) || []
    
    // Create the student profile
    const studentProfile = await prisma.studentProfile.create({
      data: {
        fullName: validatedData.fullName,
        email: validatedData.email,
        country: validatedData.country,
        university: validatedData.university,
        program: validatedData.program,
        degreeLevel: validatedData.degreeLevel,
        fundsRequested: validatedData.fundsRequested,
        quickBio: validatedData.quickBio,
        past: validatedData.past,
        present: validatedData.present,
        future: validatedData.future,
        misc: validatedData.misc,
        socialLinks: filteredSocialLinks,
        walletAddress: validatedData.walletAddress,
        referralCode: validatedData.referralCode, // <-- add this
        status: 'pending'
      }
    })
    
    return NextResponse.json({
      success: true,
      message: "Student profile created successfully",
      id: studentProfile.id
    }, { status: 201 })
    
  } catch (error) {
    console.error('Error creating student profile:', error)
    
    // Handle Prisma unique constraint errors
    if (error instanceof Error && (error.message.includes('Unique constraint') || error.message.includes('unique'))) {
      return NextResponse.json({
        success: false,
        error: "An account with this email already exists. Please use a different email address."
      }, { status: 409 })
    }
    
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      const firstError = error.errors[0]
      let errorMessage = "Please check your information and try again"
      
      if (firstError?.path.includes('email')) {
        errorMessage = "Please enter a valid email address"
      } else if (firstError?.path.includes('fullName')) {
        errorMessage = "Full name is required"
      } else if (firstError?.path.includes('socialLinks')) {
        errorMessage = "Please check your social media links format"
      }
      
      return NextResponse.json({
        success: false,
        error: errorMessage,
        details: error.errors
      }, { status: 400 })
    }
    
    // Handle database connection errors
    if (error instanceof Error && error.message.includes('connect')) {
      return NextResponse.json({
        success: false,
        error: "Database connection failed. Please try again later."
      }, { status: 503 })
    }
    
    // Generic error handler
    return NextResponse.json({
      success: false,
      error: "An unexpected error occurred. Please try again."
    }, { status: 500 })
  }
} 
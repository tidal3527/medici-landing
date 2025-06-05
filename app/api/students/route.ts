import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

// Add email validation helper
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Enhanced validation with specific error messages
    const errors: Record<string, string> = {}
    if (!data.name?.trim()) errors.name = 'Name is required'
    if (!data.email?.trim()) {
      errors.email = 'Email is required'
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Please enter a valid email address'
    }
    if (!data.university?.trim()) errors.university = 'University is required'
    if (!data.fieldOfStudy?.trim()) errors.fieldOfStudy = 'Field of study is required'
    if (!data.degree) errors.degree = 'Degree is required'
    if (!data.country) errors.country = 'Country is required'

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', errors },
        { status: 400 }
      )
    }

    // Clean input data
    const cleanData = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      university: data.university.trim(),
      fieldOfStudy: data.fieldOfStudy.trim(),
      degree: data.degree,
      country: data.country,
      ...(data.fundsRequested && data.fundsRequested.trim() !== '' 
        ? { fundsRequested: parseFloat(data.fundsRequested) } 
        : {})
    }

    // Add retry logic for database operations
    let retries = 3
    while (retries > 0) {
      try {
        const result = await prisma.$transaction(async (tx) => {
          // Check if email exists with proper error handling
          const existingStudent = await tx.student.findUnique({
            where: { email: cleanData.email },
            select: { id: true } // Only select what we need
          })

          if (existingStudent) {
            throw new Prisma.PrismaClientKnownRequestError(
              'A student with this email already exists',
              { code: 'P2002', clientVersion: '' }
            )
          }

          // Create new student with timeout protection
          return await Promise.race([
            tx.student.create({ 
              data: cleanData,
              select: { id: true, email: true } // Only select what we need
            }),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Transaction timeout')), 5000)
            )
          ])
        }, {
          maxWait: 5000,
          timeout: 10000,
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable
        })

        return NextResponse.json({
          success: true,
          data: {
            id: result.id,
            email: result.email
          }
        })

      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
          // Handle unique constraint violation
          if (err.code === 'P2002') {
            return NextResponse.json(
              { error: 'A student with this email already exists' },
              { status: 409 }
            )
          }
        }

        // Log the error with more details
        console.error('Database error:', {
          error: err,
          data: cleanData,
          timestamp: new Date().toISOString()
        })

        throw err // Let the outer try-catch handle it
      }
    }

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (email) {
      const student = await prisma.student.findUnique({
        where: { email: email.toLowerCase() },
        select: { id: true, email: true }
      })

      if (!student) {
        return NextResponse.json(
          { error: 'Student not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({ success: true, data: student })
    }

    const students = await prisma.student.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, email: true, createdAt: true }
    })

    return NextResponse.json({ success: true, data: students })
  } catch (error) {
    console.error('Error fetching students:', error)
    return NextResponse.json(
      { error: 'Failed to fetch students. Please try again.' },
      { status: 500 }
    )
  }
}
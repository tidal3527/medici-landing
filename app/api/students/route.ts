import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Basic validation
    if (!data.name || !data.email || !data.university || !data.fieldOfStudy || !data.degree || !data.country) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Use a transaction to handle both operations
    const result = await prisma.$transaction(async (tx) => {
      // Check if email exists
      const existingStudent = await tx.student.findUnique({
        where: {
          email: data.email.trim()
        }
      })

      if (existingStudent) {
        throw new Error('A student with this email already exists')
      }

      // Create new student
      return await tx.student.create({
        data: {
          name: data.name.trim(),
          email: data.email.trim(),
          university: data.university.trim(),
          fieldOfStudy: data.fieldOfStudy.trim(),
          degree: data.degree,
          country: data.country,
          ...(data.fundsRequested && data.fundsRequested.trim() !== '' 
            ? { fundsRequested: parseFloat(data.fundsRequested) } 
            : {})
        }
      })
    })

    return NextResponse.json({ success: true, data: result })

  } catch (error) {
    console.error('Error creating student:', error)
    
    if (error instanceof Error && error.message === 'A student with this email already exists') {
      return NextResponse.json(
        { error: error.message },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to create student. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      orderBy: {
        createdAt: 'desc'
      }
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
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Basic validation - fundsRequested is now optional
    if (!data.name || !data.email || !data.university || !data.fieldOfStudy || !data.degree || !data.country) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Prepare the data for database insertion
    const studentData = {
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

    const student = await prisma.student.create({
      data: studentData
    })

    return NextResponse.json({ success: true, data: student })

  } catch (error) {
    console.error('Error creating student:', error)
    
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle specific Prisma errors
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'A student with this email already exists' },
          { status: 409 }
        )
      }
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
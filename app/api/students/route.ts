import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
    const studentData: any = {
      name: data.name.trim(),
      email: data.email.trim(),
      university: data.university.trim(),
      fieldOfStudy: data.fieldOfStudy.trim(),
      degree: data.degree,
      country: data.country
    }

    // Handle fundsRequested - only include if provided and valid
    if (data.fundsRequested && data.fundsRequested.trim() !== '') {
      const fundsAmount = parseFloat(data.fundsRequested)
      
      // Validate fundsRequested if provided
      if (isNaN(fundsAmount) || fundsAmount < 0) {
        return NextResponse.json(
          { error: 'Invalid funds requested amount' },
          { status: 400 }
        )
      }
      
      studentData.fundsRequested = fundsAmount
    }
    // If fundsRequested is empty or not provided, we don't include it in the data object
    // This way Prisma will use the default value or handle it according to your schema

    // Create new student
    const student = await prisma.student.create({
      data: studentData
    })

    return NextResponse.json(student)
  } catch (error) {
    console.error('Error creating student:', error)
    return NextResponse.json(
      { error: 'Failed to create student' },
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
    return NextResponse.json(students)
  } catch (error) {
    console.error('Error fetching students:', error)
    return NextResponse.json(
      { error: 'Failed to fetch students' },
      { status: 500 }
    )
  }
}
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Basic validation
    if (!data.name || !data.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Try to create donor directly with unique constraint
    try {
      const donor = await prisma.donor.create({
        data: {
          name: data.name.trim(),
          email: data.email.trim(),
        }
      })
      return NextResponse.json({ success: true, data: donor })
    } catch (createError) {
      // Handle unique constraint violation
      if (createError instanceof Prisma.PrismaClientKnownRequestError && createError.code === 'P2002') {
        return NextResponse.json(
          { error: 'A donor with this email already exists' },
          { status: 409 }
        )
      }
      throw createError // Re-throw other errors
    }

  } catch (error) {
    console.error('Error creating donor:', error)
    return NextResponse.json(
      { error: 'Failed to create donor. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const donors = await prisma.donor.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json({ success: true, data: donors })
  } catch (error) {
    console.error('Error fetching donors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch donors. Please try again.' },
      { status: 500 }
    )
  }
}

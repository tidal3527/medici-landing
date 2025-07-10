import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== 'string' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });
    }
    // Check if already subscribed
    const existing = await prisma.subscriber.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'This email is already subscribed.' }, { status: 409 });
    }
    await prisma.subscriber.create({ data: { email } });
    return NextResponse.json({ message: 'Successfully subscribed!' }, { status: 201 });
  } catch (err: any) {
    console.error('Subscribe API error:', err);
    // Prisma error handling
    if (err.code === 'P2002') {
      return NextResponse.json({ error: 'This email is already subscribed.' }, { status: 409 });
    }
    return NextResponse.json({ error: err?.message || 'Something went wrong. Please try again later.' }, { status: 500 });
  }
} 
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

// GET all inquiries for admin review
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const inquiries = await db.inquiry.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: inquiries });
  } catch (error) {
    console.error('Admin GET inquiries error:', error);
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}

// PATCH update inquiry status
export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Inquiry ID and status are required' }, { status: 400 });
    }

    const updatedInquiry = await db.inquiry.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, data: updatedInquiry });
  } catch (error) {
    console.error('Admin PATCH inquiry error:', error);
    return NextResponse.json({ error: 'Failed to update inquiry status' }, { status: 500 });
  }
}

// DELETE an inquiry
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Inquiry ID is required' }, { status: 400 });
    }

    await db.inquiry.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    console.error('Admin DELETE inquiry error:', error);
    return NextResponse.json({ error: 'Failed to delete inquiry' }, { status: 500 });
  }
}

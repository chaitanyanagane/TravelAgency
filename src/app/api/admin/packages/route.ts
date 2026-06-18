import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

// GET all packages in admin view
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const packages = await db.package.findMany({
      include: {
        itinerary: { orderBy: { day: 'asc' } },
        pricing: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, data: packages });
  } catch (error) {
    console.error('Admin GET packages error:', error);
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}

// POST create package
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      title,
      slug,
      destination,
      duration,
      durationDays,
      price,
      rating,
      tourType,
      images,
      overview,
      inclusions,
      exclusions,
      popular,
      destinationId,
      pricing,
      itinerary,
    } = body;

    const newPackage = await db.package.create({
      data: {
        title,
        slug,
        destination,
        duration,
        durationDays: Number(durationDays),
        price: Number(price),
        rating: Number(rating || 4.9),
        tourType,
        images,
        overview,
        inclusions,
        exclusions,
        popular: Boolean(popular),
        destinationId,
        pricing: {
          create: {
            couple: Number(pricing?.couple || price),
            family: Number(pricing?.family || price),
            group: Number(pricing?.group || price),
          },
        },
        itinerary: {
          createMany: {
            data: itinerary.map((item: { day: number; title: string; description: string }) => ({
              day: Number(item.day),
              title: item.title,
              description: item.description,
            })),
          },
        },
      },
      include: {
        itinerary: true,
        pricing: true,
      },
    });

    return NextResponse.json({ success: true, data: newPackage });
  } catch (error) {
    console.error('Admin POST package error:', error);
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
  }
}

// PUT update package
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      id,
      title,
      slug,
      destination,
      duration,
      durationDays,
      price,
      rating,
      tourType,
      images,
      overview,
      inclusions,
      exclusions,
      popular,
      destinationId,
      pricing,
      itinerary,
    } = body;

    if (!id) {
      return NextResponse.json({ error: 'Package ID is required' }, { status: 400 });
    }

    // Update basic specifications, inclusions/exclusions
    const updatedPackage = await db.$transaction(async (tx) => {
      // 1. Delete existing itinerary items
      await tx.itineraryItem.deleteMany({
        where: { packageId: id },
      });

      // 2. Update package specs and create new itineraries
      return await tx.package.update({
        where: { id },
        data: {
          title,
          slug,
          destination,
          duration,
          durationDays: Number(durationDays),
          price: Number(price),
          rating: Number(rating || 4.9),
          tourType,
          images,
          overview,
          inclusions,
          exclusions,
          popular: Boolean(popular),
          destinationId,
          pricing: {
            upsert: {
              create: {
                couple: Number(pricing?.couple || price),
                family: Number(pricing?.family || price),
                group: Number(pricing?.group || price),
              },
              update: {
                couple: Number(pricing?.couple || price),
                family: Number(pricing?.family || price),
                group: Number(pricing?.group || price),
              },
            },
          },
          itinerary: {
            createMany: {
              data: itinerary.map((item: { day: number; title: string; description: string }) => ({
                day: Number(item.day),
                title: item.title,
                description: item.description,
              })),
            },
          },
        },
        include: {
          itinerary: true,
          pricing: true,
        },
      });
    });

    return NextResponse.json({ success: true, data: updatedPackage });
  } catch (error) {
    console.error('Admin PUT package error:', error);
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
  }
}

// DELETE package
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Package ID is required' }, { status: 400 });
    }

    await db.package.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Package deleted successfully' });
  } catch (error) {
    console.error('Admin DELETE package error:', error);
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 });
  }
}

import { auth } from '@/auth';
import { db } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();
  
  if (!session?.user?.role) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const apps = await db.query.applications.findMany({
      orderBy: (applications, { desc }) => [desc(applications.createdAt)],
      with: {
        user: {
          columns: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(app);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

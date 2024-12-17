import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const role = searchParams.get('role');
    const skills = searchParams.get('skills')?.split(',').filter(Boolean);
    const interests = searchParams.get('interests')?.split(',').filter(Boolean);

    // Build the query filters
    const where = {
      NOT: {
        userId: session.user.id
      },
      ...(role && { role }),
      ...(skills?.length && {
        skills: {
          contains: skills.join(','),
          mode: 'insensitive'
        }
      }),
      ...(interests?.length && {
        interests: {
          contains: interests.join(','),
          mode: 'insensitive'
        }
      })
    };

    const profiles = await prisma.profile.findMany({
      where,
      include: {
        User: {
          select: {
            id: true,
            email: true,
            userName: true
          }
        }
      },
      take: 20
    });

    return NextResponse.json({ users: profiles });
  } catch (error) {
    console.error("Discovery error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 
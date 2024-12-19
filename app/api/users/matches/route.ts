import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 
import { calculateMatchScore, MatchScore } from "@/lib/matching";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get current user's profile
    const userProfile = await prisma.profile.findUnique({
      where: { userId: session.user.id }
    });

    if (!userProfile) {
      return NextResponse.json(
        { message: "Profile not found" },
        { status: 404 }
      );
    }

    // Get potential matches (opposite role)
    const potentialMatches = await prisma.profile.findMany({
      where: {
        NOT: { userId: session.user.id },
        role: userProfile.role === 'mentor' ? 'mentee' : 'mentor'
      },
      include: {
        User: {
          select: {
            userName: true,
            email: true
          }
        }
      }
    });

    // Calculate match scores
    const userSkills = userProfile.skills.split(',').map(s => s.trim());
    const matches: MatchScore[] = potentialMatches.map(match => {
      const matchSkills = match.skills.split(',').map(s => s.trim());
      const score = calculateMatchScore(userSkills, matchSkills);
      const matchedSkills = userSkills.filter(skill => 
        matchSkills.map(s => s.toLowerCase()).includes(skill.toLowerCase())
      );

      return {
        userId: match.userId,
        userName: match.User.userName,
        email: match.User.email,
        score,
        matchedSkills
      };
    });

    // Sort by score (highest first) and take top 10
    const topMatches = matches
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    return NextResponse.json({ matches: topMatches });
  } catch (error) {
    console.error("Matching error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 
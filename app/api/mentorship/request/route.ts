import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; 

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

    const [sentRequests, receivedRequests] = await Promise.all([
      prisma.mentorshipRequest.findMany({
        where: { senderId: session.user.id },
        include: {
          receiver: {
            select: {
              userName: true,
              email: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.mentorshipRequest.findMany({
        where: { receiverId: session.user.id },
        include: {
          sender: {
            select: {
              userName: true,
              email: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      })
    ]);

    return NextResponse.json({ sentRequests, receivedRequests });
  } catch (error) {
    console.error("Requests fetch error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { receiverId } = await req.json();

    // Check if request already exists
    const existingRequest = await prisma.mentorshipRequest.findFirst({
      where: {
        AND: [
          { senderId: session.user.id },
          { receiverId },
          { status: "pending" }
        ]
      }
    });

    if (existingRequest) {
      return NextResponse.json(
        { message: "Request already sent" },
        { status: 400 }
      );
    }

    // Create the mentorship request
    const request = await prisma.mentorshipRequest.create({
      data: {
        senderId: session.user.id,
        receiverId,
        status: "pending"
      },
      include: {
        sender: true
      }
    });

    // Create notification for the receiver
    await prisma.notification.create({
      data: {
        userId: receiverId,
        type: 'request',
        message: `${request.sender.userName} has sent you a mentorship request`,
        isRead: false
      }
    });

    return NextResponse.json({ message: "Request sent successfully", request });
  } catch (error) {
    console.error("Mentorship request error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 
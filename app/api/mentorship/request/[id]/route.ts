import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { status } = await req.json();
    const validStatuses = ['accepted', 'rejected', 'pending'] as const;
    type RequestStatus = typeof validStatuses[number];

    if (!validStatuses.includes(status as RequestStatus)) {
      return NextResponse.json(
        { message: "Invalid status" },
        { status: 400 }
      );
    }

    const request = await prisma.mentorshipRequest.findUnique({
      where: { id: params.id },
      include: { sender: true }
    });

    if (!request) {
      return NextResponse.json(
        { message: "Request not found" },
        { status: 404 }
      );
    }

    if (request.receiverId !== session.user.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Update request status
    const updatedRequest = await prisma.mentorshipRequest.update({
      where: { id: params.id },
      data: { status }
    });

    // Create notification for the sender
    await prisma.notification.create({
      data: {
        userId: request.senderId,
        type: 'request',
        message: `Your mentorship request has been ${status} by ${session.user.email}`,
        isRead: false
      }
    });

    return NextResponse.json({ message: `Request ${status}`, request: updatedRequest });
  } catch (error) {
    console.error("Request status update error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 
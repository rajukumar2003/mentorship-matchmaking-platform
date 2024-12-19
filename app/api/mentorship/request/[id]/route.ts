import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Ensure the user is authenticated
    if (!session?.user?.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Extract the ID from the request URL
    const id = req.nextUrl.pathname.split("/").pop();
    if (!id) {
      return NextResponse.json(
        { message: "Invalid request: Missing ID" },
        { status: 400 }
      );
    }

    // Parse the request body
    const { status } = await req.json();
    const validStatuses = ["accepted", "rejected", "pending"] as const;

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { message: "Invalid status" },
        { status: 400 }
      );
    }

    // Find the mentorship request
    const request = await prisma.mentorshipRequest.findUnique({
      where: { id },
      include: { sender: true },
    });

    if (!request) {
      return NextResponse.json(
        { message: "Request not found" },
        { status: 404 }
      );
    }

    // Verify that the logged-in user is the receiver
    if (request.receiverId !== session.user.id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Update the request status
    const updatedRequest = await prisma.mentorshipRequest.update({
      where: { id },
      data: { status },
    });

    // Create a notification for the sender
    await prisma.notification.create({
      data: {
        userId: request.senderId,
        type: "request",
        message: `Your mentorship request has been ${status} by ${session.user.email}`,
        isRead: false,
      },
    });

    return NextResponse.json({
      message: `Request ${status}`,
      request: updatedRequest,
    });
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

import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string;
      name?: string;
      image?: string;
      userName?: string;
      hasProfile?: boolean;
      dbUserId?: string;
    }
  }

  interface User {
    id: string;
    email: string;
    userName: string;
    password?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    userName?: string;
    dbUserId?: string;
  }
}

declare module "@prisma/client" {
  interface Profile {
    dbUserId?: string;
  }
} 
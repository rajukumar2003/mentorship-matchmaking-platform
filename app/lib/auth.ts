import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide both email and password.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with this email.");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials.");
        }

        return { id: user.id, email: user.email, userName: user.userName };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      }
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        try {
          let dbUser = await prisma.user.findUnique({
            where: { email: profile?.email || "" },
          });

          if (!dbUser && profile?.email) {
            dbUser = await prisma.user.create({
              data: {
                email: profile.email,
                userName: profile.name || "Google User",
                password: await bcrypt.hash(Math.random().toString(36), 10),
              },
            });
          }
            if (dbUser) {
                // @ts-ignore - Temporarily ignore type checking for this line
                profile.dbUserId = dbUser.id;
          }

          return true;
        } catch (error) {
          console.error("Error saving Google user:", error);
          return false;
        }
      }
      return true;
    },
    
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.dbUserId || token.id as string;
        session.user.userName = token.userName;
        
        const profile = await prisma.profile.findUnique({
          where: { userId: session.user.id }
        });
        session.user.hasProfile = !!profile;
      }
      return session;
    },
    async jwt({ token, user, profile }) {
        if (profile) {
            // @ts-ignore - Temporarily ignore type checking for this line
            token.dbUserId = profile.dbUserId;
      }
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.userName = user.userName;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
}; 
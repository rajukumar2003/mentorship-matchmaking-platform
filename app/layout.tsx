import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "./providers/SessionProvider";
import { Toaster } from "sonner";
import { QueryProvider } from '@/providers/QueryProvider';


export const metadata: Metadata = {
  title: "Find Mentor",
  description: "Find right mentor today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <AuthProvider>
            {children}
            <Toaster
              position="top-center"
            />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

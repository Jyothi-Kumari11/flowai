import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "FlowAI – Smart Project Management",
    template: "%s | FlowAI",
  },
  description:
    "AI-powered project management platform. Manage tasks, collaborate with your team, and get intelligent insights.",
  keywords: ["project management", "AI", "tasks", "collaboration", "SaaS"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "FlowAI – Smart Project Management",
    description: "AI-powered project management platform.",
    siteName: "FlowAI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

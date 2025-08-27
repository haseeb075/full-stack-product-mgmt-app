import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import QueryProvider from "@/providers/query-provider";
import Header from "@/components/logic/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Product Management",
  description: "Full-stack app with Next.js & Prisma backend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

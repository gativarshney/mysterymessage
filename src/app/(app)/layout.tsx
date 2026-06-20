import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "@/app/globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "mystery message",
  description: "anonymous portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased text-neutral-200 bg-neutral-950`}>
          <Navbar/>
          {children} 
        </body>
    </html>
  );
}
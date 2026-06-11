import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from './components/Header';
import Footer from "./components/Footer";
import Aosanimation from "./components/Aosanimation";
import SmoothScroll from './components/SmoothScroll';
import ChatBot from "./components/ChatBot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mamun Miah | Full Stack Web Developer",
  description: "I'm Mamun Miah, a results-driven Full Stack Web Developer with over 7 years of experience building high-performance, scalable web applications and SaaS solutions.",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <link
        rel="preload"
        as="image"
        href="/images/about.avif"
        fetchPriority="high"
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <Header />
        <Aosanimation />
        <SmoothScroll />
        {children}
        <ChatBot />
        <Footer />
      </body>
    </html>
  );
}

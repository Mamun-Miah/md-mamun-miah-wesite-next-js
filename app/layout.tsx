import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from './components/Header';
import Footer from "./components/Footer";
import Aosanimation from "./components/Aosanimation";
import SmoothScroll from './components/SmoothScroll';
import ChatBot from "./components/ChatBot";
import StructuredData from "./components/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = 'https://mamundev.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Mamun Miah | Full Stack & AI Developer',
    template: '%s | Mamun Miah',
  },
  description:
    'Mamun Miah is a Full Stack Web Developer with 7+ years of experience building high-performance Next.js apps, scalable backend APIs, RAG-powered AI systems, and LLM integrations. Available for freelance hire.',
  keywords: [
    'Full Stack Developer',
    'Next.js developer for hire',
    'React developer freelance',
    'hire full stack developer Bangladesh',
    'AI developer RAG pipeline',
    'LangChain developer freelance',
    'custom web development services',
    'SaaS developer freelance',
    'Node.js backend developer',
    'LLM integration developer',
    'Mamun Miah developer',
  ],
  authors: [{ name: 'Mamun Miah', url: SITE_URL }],
  creator: 'Mamun Miah',
  publisher: 'Mamun Miah',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Mamun Miah — Full Stack & AI Developer',
    title: 'Mamun Miah | Full Stack & AI Developer for Hire',
    description:
      'Hire Mamun Miah — a seasoned Full Stack & AI Developer specializing in Next.js, scalable APIs, RAG pipelines, and LLM-powered SaaS products.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mamun Miah — Full Stack & AI Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mamun Miah | Full Stack & AI Developer for Hire',
    description:
      'Hire Mamun Miah — Next.js, Node.js, AI/LLM Engineering, RAG Systems, and custom web development.',
    images: ['/images/og-image.jpg'],
    creator: '@mamunmiahdev',
  },
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

        <StructuredData />
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

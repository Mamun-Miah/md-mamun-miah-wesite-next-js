import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Hero from '../components/Hero';
import AboutContent from '../components/AboutContent';

const shareImage = {
  url: '/images/og-image.jpg',
  width: 1200,
  height: 630,
  type: 'image/jpeg',
  alt: 'Portrait of Mamun Miah, Full Stack and AI Developer',
};

export const metadata: Metadata = {
  title: 'About Mamun Miah | Full Stack & AI Developer with 7+ Years Experience',
  description:
    'Learn about Mamun Miah — a results-driven Full Stack Web Developer & AI Engineer with 7+ years of experience building production-grade Next.js apps, scalable APIs, and RAG-powered AI systems. Available for freelance hire.',
  keywords: [
    'about Mamun Miah developer',
    'full stack developer 7 years experience',
    'Next.js expert freelance',
    'AI developer portfolio',
    'Bangladesh full stack developer',
    'React Next.js developer biography',
  ],
  alternates: {
    canonical: 'https://mamundev.com/about',
  },
  openGraph: {
    type: 'website',
    siteName: 'Mamun Miah',
    title: 'About Mamun Miah | Full Stack & AI Developer',
    description:
      'Results-driven Full Stack & AI Developer with 7+ years of experience. Discover skills, experience, and the technology stack Mamun Miah uses.',
    url: 'https://mamundev.com/about',
    images: [shareImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Mamun Miah | Full Stack & AI Developer',
    description:
      '7+ years building web apps, APIs, and AI systems. Discover who Mamun Miah is.',
    images: [shareImage],
  },
};

const About = () => {
  return (
    <main>
      <Hero
        title="Full Stack Software Developer"
        description="I'm Mamun Miah, a full stack software developer with 7+ years of experience. I build web applications end to end, from responsive interfaces to the APIs and databases behind them. I focus on making software fast, reliable, and easy to maintain."
        backgroundImage="images/about-us-bg.png"
        sideContent={
          <Image
            src="/mamun_miah-dev.jpeg"
            alt="Portrait of Mamun Miah"
            width={400}
            height={400}
            priority
            unoptimized
            className="h-auto w-56 shrink-0 rounded-[1.75rem] border border-white/20 bg-white/5 p-1.5 shadow-xl shadow-black/25 sm:w-64 lg:w-[22rem]"
          />
        }
      />
      <AboutContent />
    </main>
  );
};

export default About;

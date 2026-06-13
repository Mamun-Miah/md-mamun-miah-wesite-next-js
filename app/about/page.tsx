import React from 'react';
import Hero from '../components/Hero';
import AboutContent from '../components/AboutContent';

export const metadata = {
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
    title: 'About Mamun Miah | Full Stack & AI Developer',
    description:
      'Results-driven Full Stack & AI Developer with 7+ years of experience. Discover skills, experience, and the technology stack Mamun Miah uses.',
    url: 'https://mamundev.com/about',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Mamun Miah | Full Stack & AI Developer',
    description:
      '7+ years building web apps, APIs, and AI systems. Discover who Mamun Miah is.',
    images: ['/images/og-image.jpg'],
  },
};

const About = () => {
  return (
    <main>
      <Hero
        title="About My Mission"
        description="
            I am a results-driven Full Stack Web Developer with 7+ years of hands-on experience architecting and shipping production-grade applications.
            
            My goal is simple: to help businesses like yours grow through cutting-edge technology and strategic digital positioning. By combining deep full-stack expertise with an AI-first development mindset, I deliver solutions that are not just visually stunning, but functionally superior and optimized for long-term ROI."
        backgroundImage="images/about-us-bg.png"
      />
      <AboutContent />
    </main>
  );
};

export default About;
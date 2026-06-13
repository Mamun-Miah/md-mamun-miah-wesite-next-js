import type { Metadata } from 'next';
import Hero from './components/Hero';

export const metadata: Metadata = {
  title: 'Full Stack & AI Developer | Next.js Expert',
  description:
    'Hire Mamun Miah — a Full Stack Web Developer & AI Engineer with 7+ years of experience. Specializing in Next.js, React, Node.js, RAG pipelines, LangChain agents, and custom SaaS development. Available for freelance projects.',
  keywords: [
    'hire full stack developer',
    'Next.js developer freelance',
    'React developer for hire',
    'AI developer freelance',
    'LangChain developer',
    'RAG pipeline developer',
    'Node.js developer Bangladesh',
    'custom SaaS developer',
    'full stack developer portfolio',
    'Mamun Miah developer',
  ],
  alternates: {
    canonical: 'https://mamundev.com',
  },
  openGraph: {
    title: 'Mamun Miah | Hire Full Stack & AI Developer',
    description:
      'Full Stack & AI Developer with 7+ years experience. Next.js, Node.js, RAG systems, LangChain agents, and custom web apps. Open for freelance hire.',
    url: 'https://mamundev.com',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
};

import ServicesSection from './components/Services';
import Contact from './components/Contact';
import Portfolio from './components/Portfolio';
import Technologies from './components/Technologies';

const page = () => {
  return (
    <div>
      <Hero
        title="Transforming Ideas into Reality"
        description="I build high-performance, scalable web applications and SaaS solutions that help businesses grow. From custom frontend interfaces to secure backend databases, I focus on robust engineering and seamless user experiences."
        backgroundImage="/images/about.avif"
        showTyping={true}  //  Enable animation only on Home
        typingText={["AI Integration, PEFT, RAG", "Custom Web Development", "Performance Optimization", "Robust Backend APIs", "Full Stack Solutions"]}
        calltoAction={
          <a
            href="#contact-us"
            className="btn secondery-btn font-bold px-8"
          >
            Start Your Project
          </a>
        }
      />
      <ServicesSection />
      <Technologies />
      <Portfolio />
      <Contact />
    </div>
  )
}

export default page;

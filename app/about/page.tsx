import React from 'react';
import Hero from '../components/Hero';
import AboutContent from '../components/AboutContent';

export const metadata = {
  title: 'About Me - Mamun Miah | Full Stack Web Developer',
  description: `Results-driven Full Stack Web Developer with 7+ years of experience building high-performance web applications and strategic SEO solutions.`,
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
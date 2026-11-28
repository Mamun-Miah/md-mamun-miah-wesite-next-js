import React from 'react';
import Image from 'next/image';
import { pageMetadata, pages, PORTRAIT_PATH } from '@/lib/seo';
import { profileSchema } from '@/lib/schema';
import Hero from '../components/Hero';
import AboutContent from '../components/AboutContent';
import StructuredData from '../components/StructuredData';

export const metadata = pageMetadata(pages.about);

const About = () => {
  return (
    <main>
      <StructuredData data={profileSchema} />
      <Hero
        title="Full Stack Software Developer"
        description="I'm Mamun Miah, a full stack software developer with 7+ years of experience. I build web applications end to end, from responsive interfaces to the APIs and databases behind them. I focus on making software fast, reliable, and easy to maintain."
        backgroundImage="images/about-us-bg.png"
        sideContent={
          <Image
            src={PORTRAIT_PATH}
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

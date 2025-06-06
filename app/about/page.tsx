import React from 'react'
import Hero from '../components/Hero';
export const metadata = {
  title: 'About Us - Mamun Miah',
  description: `From working with small startups to large enterprises, I've learned how to craft SEO & Website Development strategies that deliver real results.`,
};

const About = () => {
  return (
    
    <Hero
        title="About Me"
        description="My journey in SEO and web development began over 7 years ago when I discovered the power of search engines in driving business success. From working with small startups to large enterprises, I've learned how to craft SEO strategies that deliver real results. My goal is to help businesses achieve online growth through technical expertise and data-driven decisions."
        backgroundImage="images/about-us-bg.png"
      />
  )
}

export default About
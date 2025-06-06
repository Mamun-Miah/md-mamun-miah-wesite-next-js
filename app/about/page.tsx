import React from 'react'
import Hero from '../components/Hero';
export const metadata = {
  title: 'About Us - Mamun Miah',
  description: `From working with small startups to large enterprises, I've learned how to craft SEO & Website Development strategies that deliver real results.`,
};

const About = () => {
  return (
    
    <Hero
        title="About "
        description="With 7+ years of experience in SEO & web development, I help businesses grow online with strategy and style."
        backgroundImage="/assets/images/about-hero.jpg"
      />
  )
}

export default About
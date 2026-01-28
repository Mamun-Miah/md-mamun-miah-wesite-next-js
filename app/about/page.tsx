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
        description="
            I am a Full Stack Web Developer with over 7 years of experience building scalable, high-performance websites and web applications.

            I specialize in both front-end and back-end development, creating secure, responsive, and user-friendly digital solutions. Beyond development, I integrate advanced SEO strategies directly into the development process ensuring websites are optimized for speed, visibility, and long-term growth from day one.

            I am passionate about modern web technologies, clean code, and continuous learning. I enjoy solving complex problems, improving performance, and aligning technical solutions with real business objectives."
        backgroundImage="images/about-us-bg.png"
      />
  )
}

export default About
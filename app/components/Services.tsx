"use client";

import React from "react";
import Card from "./SingleServiceCard";
import DecryptedText from "./animation/DecryptedText";
// Assuming Card component is in the same directory
// Main ServicesSection component
const ServicesSection: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 lg:py-20" id="services" suppressHydrationWarning data-aos="fade-up">
      {/* Heading and Description Section */}
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <h1 className="mainheading">CREATIVE SERVICE</h1>
        

        {/* Example 3: Animate on view (runs once) */}
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8">
          <div className="min-w-0 lg:col-span-6">
            <h2 className="subheading" >
          <DecryptedText
            text="How Can I Help Elevate Your Business?"
            animateOn="view"
            revealDirection="center"
            speed={130}
            useOriginalCharsOnly
          />
        </h2>
          </div>
          <div className="min-w-0 lg:col-span-6">
            <p className="para mb-8">
              I specialize in delivering high-impact digital solutions that combine 
              modern frontend engineering with robust, scalable backend architecture. My goal is to help 
              your business build powerful applications, streamline operations, 
              and achieve sustainable growth through technology.
            </p>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <section className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 items-stretch gap-5 lg:gap-6">
        <Card
          title="Custom Web Development"
          details="I build high-performance, scalable websites and web apps that convert visitors into customers, ensuring a seamless experience across all devices."
          image="fa-solid fa-laptop-code text-[100px] text-[#48CDA0]"
          bg="bg-[#143D60]"
          link="/website-development"
        />
        <Card
          title="Robust Backend & APIs"
          details="I design and implement secure, scalable backend architectures, RESTful/GraphQL APIs, and robust databases to power complex web applications."
          image="fa-solid fa-server text-[100px] text-[#FF8000]"
          bg="bg-[#143D60]"
          link="/backend-development"
        />
        <Card
          title="AI & LLM Engineering"
          details="I build RAG systems, LangChain agents, fine-tuned models, and AI-powered features that make your applications intelligently autonomous."
          image="fa-solid fa-brain text-[100px] text-[#a855f7]"
          bg="bg-[#143D60]"
          link="/ai-development"
        />
        <Card
          title="Technical SEO & Speed"
          details="I optimize Core Web Vitals, crawlability, and loading speeds to ensure search engines can rank your applications easily."
          image="fa-brands fa-searchengin text-[100px] text-[#E6BC13]"
          bg="bg-[#143D60]"
          link="/seo-service"
        />
      </section>
    </div>
  );
};

export default ServicesSection;

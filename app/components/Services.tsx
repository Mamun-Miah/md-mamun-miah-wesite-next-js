"use client";

import React from "react";
import Card from "./SingleServiceCard";
import DecryptedText from "./animation/DecryptedText";
// Assuming Card component is in the same directory
// Main ServicesSection component
const ServicesSection: React.FC = () => {
  return (
    <div className="py-24" id="services" suppressHydrationWarning data-aos="fade-up">
      {/* Heading and Description Section */}
      <div className="lg:mx-24 md:mx-24 mx-5">
        <h1 className="mainheading">CREATIVE SERVICE</h1>
        

        {/* Example 3: Animate on view (runs once) */}
        
        <div className="grid lg:grid-cols-12 gap-5">
          <div className="col-span-6">
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
          <div className="col-span-6 ms-2">
            <p className="para mb-8">
              I specialize in delivering high-impact digital solutions that combine 
              cutting-edge web development with strategic SEO. My goal is to help 
              your business dominate the digital landscape, drive meaningful engagement, 
              and achieve sustainable growth through technology.
            </p>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <section className="lg:mx-24 md:mx-24 mx-5 grid lg:grid-cols-3 justify-center items-center gap-5">
        <Card
          title="Custom Web Development"
          details="I build high-performance, scalable websites and web apps that convert visitors into customers, ensuring a seamless experience across all devices."
          image="fa-solid fa-laptop-code text-[100px] text-[#48CDA0]"
          bg="bg-[#143D60]"
          link="/website-development"
        />
        <Card
          title="Conversion-Ready SEO"
          details="I implement data-driven SEO strategies that dominate search rankings, drive organic traffic, and significantly boost your business visibility."
          image="fa-brands fa-searchengin text-[100px] text-[#FF8000]"
          bg="bg-[#143D60]"
          link="/seo-service"
        />
        <Card
          title="Strategic Consulting"
          details="I provide expert guidance on digital transformation, performance optimization, and scalable architecture to help your business stay ahead."
          image="fa-solid fa-headset text-[100px] text-[#E6BC13]"
          bg="bg-[#143D60]"
          link="/#contact-us"
        />
      </section>
    </div>
  );
};

export default ServicesSection;

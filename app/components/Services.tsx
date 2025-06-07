'use client';

import React from 'react';
import Card from './SingleServiceCard'; // Assuming Card component is in the same directory


// Main ServicesSection component
const ServicesSection: React.FC = () => {
  

  return (
    
    <div>
      {/* Heading and Description Section */}
      <div 
              
      
      className="lg:mt-12 lg:mx-24 pt-8 md:mx-24 mx-5">
        <h1 className="mainheading">
          CREATIVE SERVICE
        </h1>
        <div className="grid lg:grid-cols-12 gap-5">
          <div className="col-span-6">
            <p className="subheading">
              How Can I Help Elevate Your Business?
            </p>
          </div>
          <div className="col-span-6 ms-2">
            <p className="para mb-8">
              I specialize in delivering top-tier SEO strategies and professional
              website development to help businesses thrive in the digital
              landscape. With a results-driven approach, I ensure that every
              project enhances your online presence, drives traffic, and maximizes
              growth.
            </p>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <section className="lg:mx-24 md:mx-24 mx-5 grid lg:grid-cols-3 justify-center items-center gap-5" >
        <Card
          title="Website Development"
          details="I create fast, responsive, and visually engaging websites tailored to your business goals. From design to deployment, I ensure a seamless user experience."
          image="fa-solid fa-laptop-code text-[100px] text-[#48CDA0]"
          bg="bg-[#4C1F7A]"
          
        />
        <Card
          title="SEO Service"
          details="I optimize websites to improve search rankings, drive organic traffic, and increase conversions with proven SEO strategies."
          image="fa-brands fa-searchengin text-[100px] text-[#FF8000]"
          bg="bg-[#143D60]"
          
        />
        <Card
          title="24/7 Support"
          details="I provide round-the-clock support to keep your website running smoothly, ensuring quick issue resolution and continuous optimization."
          image="fa-solid fa-headset text-[100px] text-[#E6BC13]"
          bg="bg-[#780C28]"
          
        />
      </section>
    </div>
  );
};

export default ServicesSection;
// components/Hero.tsx
'use client';

import React from 'react';

interface HeroProps {
  title: string;
  description: string;
  backgroundImage?: string; 
  calltoAction?: React.ReactNode; // Optional prop for call to action button
}

const Hero: React.FC<HeroProps> = ({ title, description, backgroundImage, calltoAction }) => {
  return (
    <div className="hero lg:h-[105vh] h-[100vh] pb-24 mt-[-80px] lg:mt-[-100px]" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="hero-content flex-col lg:flex-row lg:mt-[130px] z-10 text-white"
      
      >
        {/* If you want to include the image later, uncomment this section:
        <img
          src="/assets/images/Mamun_Miah.png"
          className="max-w-sm rounded-lg shadow-2xl p-1 mt-1"
          alt="Mamun Miah"
        /> */}
        <div className="grid lg:grid-cols-12 w-full">
          <div className="col-span-2"></div>
          <div className="col-span-8 flex flex-col justify-center items-center text-center">
            <h1 className="lg:text-5xl text-4xl tracking-wide font-bold">
              {title}
            </h1>
            <p className="py-6 lg:mx-32 text-xl">
              {description}
            </p>
            {calltoAction}
          </div>
          <div className="col-span-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

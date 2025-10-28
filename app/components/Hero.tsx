'use client';

import React from 'react';
import { motion } from "framer-motion";
import TextType from './animation/TextType';
import LiquidEther from './animation/LiquidEther';

interface HeroProps {
  title: string;
  description: string;
  backgroundImage?: string; 
  calltoAction?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({ title, description, backgroundImage, calltoAction }) => {
  return (
    <section
      className="relative hero pt-24 lg:h-[105vh] h-[110vh] pb-24 mt-[-90px] lg:mt-[-100px] overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Animated background */}
      <div className="lg:h-[105vh] h-[110vh] mt-[-90px] lg:mt-[-100px] absolute inset-0 z-0">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.35}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={1000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Content layer */}
      <div className="relative hero-content flex-col lg:flex-row lg:mt-[130px] z-10 text-gray-200">
        <div className="grid lg:grid-cols-12 w-full">
          <div className="col-span-2"></div>
          <div className="col-span-8 flex flex-col justify-center items-center text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:text-5xl text-4xl tracking-wide leading-snug font-bold"
            >
              {title}
              <br />
              <TextType 
                text="Expert SEO & Web Development"
                typingSpeed={75}
                pauseDuration={1500}
                showCursor={true}
                cursorCharacter="."
              />
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="py-6 lg:mx-32 text-xl"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
            >
              {calltoAction}
            </motion.div>
          </div>
          <div className="col-span-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

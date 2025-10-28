'use client';

import React from 'react';
import { motion } from "framer-motion";
import TextType from './animation/TextType';
// import LiquidEther from './animation/LiquidEther';

interface HeroProps {
  title: string;
  description: string;
  backgroundImage?: string; 
  calltoAction?: React.ReactNode;
  showTyping?: boolean; // New prop
}

const Hero: React.FC<HeroProps> = ({ title, description, backgroundImage, calltoAction, showTyping }) => {
  return (
    <section
      className="relative hero pt-24 lg:h-[105vh] h-[110vh] pb-24 mt-[-90px] lg:mt-[-100px] overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
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
              {showTyping && (
                <TextType 
                  text="Expert SEO & Web Development"
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="."
                />
              )}
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


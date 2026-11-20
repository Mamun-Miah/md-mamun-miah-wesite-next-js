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
  typingText?: string | string[];
}

const Hero: React.FC<HeroProps> = ({ title, description, backgroundImage, calltoAction, showTyping, typingText }) => {
  return (
    <section
      className="relative hero min-h-[min(70svh,900px)] bg-[#000248] pt-32 pb-14 sm:pt-40 sm:pb-20 lg:pt-44 lg:pb-24 mt-[-90px] lg:mt-[-100px] overflow-hidden"
      style={{
        backgroundImage: backgroundImage
          ? `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url(${backgroundImage})`
          : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative hero-content w-full max-w-5xl px-5 sm:px-6 lg:px-8 z-10 text-gray-200">
          <div className="flex min-w-0 w-full flex-col justify-center items-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-4xl break-words text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight leading-tight font-bold"
            >
              {title}
              {showTyping && (
                <span className="mt-3 block min-h-[2.5em] sm:min-h-[1.25em]">
                  <TextType
                    as="span"
                    className="max-w-full"
                    text={typingText || "Full Stack Web Developer"}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="."
                  />
                </span>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="max-w-3xl py-6 text-base sm:text-lg lg:text-xl leading-relaxed"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="max-w-full"
            >
              {calltoAction}
            </motion.div>
          </div>
      </div>
    </section>
  );
};

export default Hero;

'use client';
import React from 'react';
import Image from 'next/image';

const technologies = [
//   { src: 'technology/html.svg', alt: 'HTML' },
{ src: 'technology/nextjs.svg', alt: 'Next js' },
  { src: 'technology/tailwind-css.svg', alt: 'Tailwind' },
  
  { src: 'technology/java-script.svg', alt: 'JavaScript' },
  { src: 'technology/node-js.svg', alt: 'Node.js' },
  { src: 'technology/php.svg', alt: 'PHP' },
  { src: 'technology/react.svg', alt: 'React' },
  { src: 'technology/mysql.svg', alt: 'MySQL' },
  { src: 'technology/mongodb.svg', alt: 'MongoDB' },
  { src: 'technology/express.svg', alt: 'Express' },

  { src: 'technology/laravel.svg', alt: 'Laravel' },
];

const Technologies = () => {
  return (
    <section className="mt-24 lg:pt-10 pt-6 lg:pb-3 bg-slate-100" suppressHydrationWarning data-aos="fade-up">
      <h1 className="text-center mainheading">What I Work With</h1>
      <h2 className="subheading text-center lg:mx-[6rem] mx-2">
        The technologies I use to build fast, secure, and scalable solutions.
      </h2>
      <div className="flex justify-center items-center my-16 mx-5">
        <div className="grid lg:grid-cols-5 grid-cols-2 lg:gap-24 lg:space-y-1 space-y-8 gap-8">
          {technologies.map((tech, index) => (
            <div key={index} className="w-36 h-36 relative hover:translate-y-5 transition">
              <Image
                src={tech.src}
                alt={tech.alt}
                fill
                className="object-contain"
                priority={index < 3} // Load top 3 faster
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;

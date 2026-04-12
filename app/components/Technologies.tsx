'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCode, 
  faServer, 
  faCloud, 
  faGlobe, 
  faMagnifyingGlass,
  faScrewdriverWrench
} from '@fortawesome/free-solid-svg-icons';
import {
  faReact,
  faNodeJs,
  faPhp,
  faLaravel,
  faWordpress,
  faDocker,
  faAws,
  faGitAlt,
  faJs
} from '@fortawesome/free-brands-svg-icons';

const techCategories = [
  {
    title: "Languages & Frameworks",
    icon: faCode,
    color: "from-blue-500/10 to-transparent",
    techs: [
      { name: "JavaScript", icon: faJs },
      { name: "TypeScript", icon: faCode },
      { name: "PHP", icon: faPhp },
      { name: "React", icon: faReact },
      { name: "Next.js", icon: faCode },
      { name: "Laravel", icon: faLaravel },
      { name: "NestJS", icon: faServer }
    ]
  },
  {
    title: "Backend & Database",
    icon: faServer,
    color: "from-emerald-500/10 to-transparent",
    techs: [
      { name: "Node.js", icon: faNodeJs },
      { name: "REST API", icon: faServer },
      { name: "Socket.io", icon: faGlobe },
      { name: "MySQL", icon: faServer },
      { name: "MongoDB", icon: faServer },
      { name: "PostgreSQL", icon: faServer },
      { name: "Redis", icon: faServer },
      { name: "Prisma ORM", icon: faCode }
    ]
  },
  {
    title: "Cloud & DevOps",
    icon: faCloud,
    color: "from-sky-500/10 to-transparent",
    techs: [
      { name: "Docker", icon: faDocker },
      { name: "AWS", icon: faAws },
      { name: "Linux CLI", icon: faServer },
      { name: "GitHub Actions", icon: faGitAlt },
      { name: "Git", icon: faGitAlt }
    ]
  },
  {
    title: "CMS & Platforms",
    icon: faGlobe,
    color: "from-amber-500/10 to-transparent",
    techs: [
      { name: "WordPress", icon: faWordpress },
      { name: "Shopify", icon: faGlobe },
      { name: "Squarespace", icon: faGlobe },
      { name: "WIX", icon: faGlobe },
      { name: "Google Sites", icon: faGlobe }
    ]
  },
  {
    title: "Digital Strategy & SEO",
    icon: faMagnifyingGlass,
    color: "from-rose-500/10 to-transparent",
    techs: [
      { name: "Core Web Vitals", icon: faMagnifyingGlass },
      { name: "PageSpeed", icon: faMagnifyingGlass },
      { name: "Technical SEO", icon: faMagnifyingGlass },
      { name: "Search Console", icon: faMagnifyingGlass }
    ]
  },
  {
    title: "Developer & AI Tools",
    icon: faScrewdriverWrench,
    color: "from-purple-500/10 to-transparent",
    techs: [
      { name: "Claude / GPT", icon: faScrewdriverWrench },
      { name: "Cursor / Copilot", icon: faCode },
      { name: "Postman", icon: faServer },
      { name: "Figma", icon: faGlobe }
    ]
  }
];

const Technologies = () => {
  return (
    <section className="py-24 bg-[#f8fafc] relative overflow-hidden" id="tech-stack">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-5 lg:px-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h1 className="mainheading">MY EXPERTISE</h1>
          <h2 className="subheading">Modern Tech Ecosystem</h2>
          <p className="para max-w-2xl mx-auto">
            A comprehensive suite of technologies and tools I leverage to build 
            scalable, high-performance digital solutions for my clients.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 lg:gap-8">
          {techCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] transition-all duration-500 overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="flex items-center mb-10">
                <div className="w-12 h-12 bg-[#3b6790] rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-[#3b679020] group-hover:rotate-12 transition-transform duration-500">
                  <FontAwesomeIcon icon={category.icon} />
                </div>
                <h3 className="ml-5 text-xl font-extrabold text-[#000248] tracking-tight">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {category.techs.map((tech, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center px-4 py-2.5 bg-white border border-slate-100 rounded-full text-sm font-bold text-slate-600 shadow-sm hover:border-[#3b6790] hover:text-[#3b6790] hover:shadow-md transition-all cursor-default"
                  >
                    <FontAwesomeIcon icon={tech.icon} className="mr-2.5 text-[10px] opacity-70" />
                    {tech.name}
                  </motion.div>
                ))}
              </div>

              {/* Decorative corner element */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-slate-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;

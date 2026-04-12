"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Hospital Management System",
    tech: "Next.js, TypeScript, Prisma, MySQL",
    desc: "Boosting operational efficiency by 40% with a secure, role-based healthcare platform featuring doctor dashboards and integrated e-commerce.",
    link: "https://drsdermabd.com",
  },
  {
    title: "ERP Market Management System",
    tech: "JavaScript, Node.js, PostgreSQL",
    desc: "Centralizing stock tracking and sales monitoring for local businesses, reducing manual processing time by 40% through automation.",
    link: "https://erp-2iu5.onrender.com",
  },
  {
    title: "Corporate Website",
    tech: "React, Node.js, API Integration",
    desc: "Accelerating brand presence with 30% faster load times and 40% improved rendering efficiency through optimized architecture.",
    link: "https://obliqa.com",
  },
  {
    title: "E-commerce Store",
    tech: "WordPress, WooCommerce, PHP, bKash API",
    desc: "Achieving 90+ PageSpeed scores and 30% growth in organic visibility while reducing checkout friction through custom API integrations.",
    link: "https://ksamotorsbd.com",
  },
  {
    title: "LMS Platform",
    tech: "PHP, Bootstrap, MySQL",
    desc: "Improving course delivery efficiency by 35% with a custom student dashboard and streamlined enrollment system.",
    link: "https://skillspark.mapleitfirm.com",
  },
  {
    title: "Lead Generation Automation Tool",
    tech: "JavaScript, Chrome APIs",
    desc: "Automating lead extraction from social platforms to accelerate sales pipelines and marketing outreach efficiency.",
    link: "https://github.com/Mamun-Miah/FB-Page-Link-Collector-Extension",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function PortfolioPage() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#afc2d320] to-transparent" id="portfolio">
      {/* Title */}
      <div className="container mx-auto px-6 lg:px-24 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl"
        >
          <h1 className="mainheading mb-2">My Projects</h1>
          <h2 className="subheading mb-4">Crafted With Real-World Needs</h2>
          <p className="para max-w-2xl text-[#333]">
            I build software that solves problems from full-stack web apps to automation tools. Below are some highlighted projects from my journey.
          </p>
        </motion.div>
      </div>

      {/* Projects Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="container mx-auto px-6 lg:px-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {projects.map((p, i) => (
          <motion.div
            key={i}
            variants={card}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="group relative rounded-[2.5rem] bg-white p-[1px]"
          >
            {/* Gradient border on hover */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-[#3b6790] to-[#efb036] opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative bg-white rounded-[2.5rem] p-8 h-full flex flex-col justify-between shadow-lg group-hover:shadow-2xl transition-all">
              <div>
                <h3 className="heading3 mb-2 text-[#1b1b1b]">
                  {p.title}
                </h3>
                <p className="text-sm font-semibold text-[#efb036] mb-3 tracking-wide">
                  {p.tech}
                </p>
                <p className="para text-[#333] leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <Link
                href={p.link}
                target="_blank"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-[#3b6790] group-hover:gap-3 transition-all"
              >
                View Project
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* GitHub CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-center mt-20"
      >
        <Link
          href="https://github.com/Mamun-Miah"
          target="_blank"
          className="inline-block bg-gradient-to-r from-[#3b6790] to-[#2a5175] text-white text-lg md:text-xl px-10 py-4 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg"
        >
          Visit Full GitHub
        </Link>
      </motion.div>
    </section>
  );
}
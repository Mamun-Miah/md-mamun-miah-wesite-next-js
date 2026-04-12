'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faMicrochip, faChartLine, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const AboutContent = () => {
  return (
    <div className="bg-white">
      {/* Professional Summary Section */}
      <section className="py-24 border-b border-slate-100">
        <div className="container mx-auto px-5 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mainheading mb-4 text-[#3b6790]">Professional Journey</h2>
              <h3 className="subheading mb-8">7+ Years of Delivering Digital Excellence</h3>
              <p className="para text-justify mb-6">
                I am a results-driven Full Stack Web Developer specializing in architecting and shipping production-grade web applications. With a focus on the modern JavaScript/TypeScript ecosystem (React, Next.js, Node.js) and cloud infrastructure (AWS, Docker, Linux), I have over 7 years of experience helping businesses transform complex ideas into scalable reality.
              </p>
              <p className="para text-justify">
                My career has been defined by a commitment to measurable business outcomes. Whether it is improving site performance, reducing server downtime, or increasing conversion rates, I align every technical decision with your core business objectives.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3b679008] rounded-full -mr-16 -mt-16" />
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#3b6790] shadow-sm shrink-0">
                    <FontAwesomeIcon icon={faRocket} />
                  </div>
                  <div className="ml-5">
                    <h4 className="text-xl font-bold text-[#000248]">High Performance</h4>
                    <p className="text-slate-500">Optimizing core vitals for maximum speed and SEO visibility.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#efb036] shadow-sm shrink-0">
                    <FontAwesomeIcon icon={faCodeBranch} />
                  </div>
                  <div className="ml-5">
                    <h4 className="text-xl font-bold text-[#000248]">Scalable Architecture</h4>
                    <p className="text-slate-500">Building robust backends and clean frontends that grow with you.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#3b6790] shadow-sm shrink-0">
                    <FontAwesomeIcon icon={faChartLine} />
                  </div>
                  <div className="ml-5">
                    <h4 className="text-xl font-bold text-[#000248]">Business Focused</h4>
                    <p className="text-slate-500">Aligning technical solutions with real-world ROI and growth.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI-First Mindset Section */}
      <section className="py-24 bg-[#000248] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3b679015] rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="container mx-auto px-5 lg:px-24">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[#efb036] font-bold tracking-[0.3em] uppercase mb-4">Innovation First</h2>
              <h3 className="text-5xl font-bold mb-8 leading-tight">The AI-First Development Mindset</h3>
              <p className="text-slate-300 text-xl leading-relaxed">
                In a rapidly evolving digital landscape, I adopt an AI-first approach to accelerate delivery without compromising quality. By leveraging advanced tools like Claude, ChatGPT, and GitHub Copilot, I ensure faster iterations, cleaner code, and cutting-edge security for every project.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Rapid Execution", 
                desc: "Using AI to automate boilerplate and focus on solving complex business logic.", 
                icon: faRocket 
              },
              { 
                title: "Superior Security", 
                desc: "AI-assisted code reviews to identify vulnerabilities before they reach production.", 
                icon: faMicrochip 
              },
              { 
                title: "Future Proof", 
                desc: "Staying ahead of trends to ensure your website remains modern for years to come.", 
                icon: faChartLine 
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all text-center"
              >
                <div className="w-16 h-16 bg-[#3b6790] rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6 shadow-xl shadow-[#3b679020]">
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
                <p className="text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise & Industries Section */}
      <section className="py-24">
        <div className="container mx-auto px-5 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="mainheading">Industry Focus</h2>
            <h3 className="subheading">Proven Results Across Diverse Sectors</h3>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                { label: "E-Commerce", value: "Built high-conversion stores reducing friction and increasing ROI." },
                { label: "Healthcare", value: "Secure, role-based role-based systems for medical administration (HMS)." },
                { label: "SaaS Solutions", value: "Scalable cloud-integrated software with seamless user onboarding." },
                { label: "Corporate Strategy", value: "Boosting brand visibility with speed-optimized corporate portals." }
              ].map((item, i) => (
                <div key={i} className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex items-center group hover:bg-white hover:border-[#3b6790] hover:shadow-lg transition-all">
                  <div className="w-2 h-2 bg-[#efb036] rounded-full mr-6 group-hover:scale-150 transition-transform" />
                  <div>
                    <h5 className="text-xl font-bold text-[#000248] mb-1">{item.label}</h5>
                    <p className="text-slate-500">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-[#3b679020] rounded-[2.5rem] rotate-3" />
              <div className="relative bg-[#3b679010] h-full min-h-[400px] rounded-[2.5rem] border border-slate-100 p-12 flex flex-col justify-center items-center text-center overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-[#efb036]" />
                 <h4 className="text-3xl font-bold text-[#000248] mb-6">Let&apos;s Transform Your Vision</h4>
                 <p className="para mb-10">
                   Whether you need a full-scale web application or a strategic SEO overhaul, I am here to help you dominate the digital landscape.
                 </p>
                 <Link href="/#contact-us" className="btn secondery-btn px-10 h-16 font-bold text-xl flex items-center justify-center">
                   Work With Me
                 </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutContent;

'use client';

import React from 'react';
import Hero from '../components/Hero';
import Card from '../components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDatabase, 
  faServer, 
  faNetworkWired, 
  faShieldHalved, 
  faCloud, 
  faTerminal
} from '@fortawesome/free-solid-svg-icons';
import { Ourachivment } from '../components/Ourachivment';
import { motion } from 'framer-motion';
import Link from 'next/link';

const BackendDevelopmentPage = () => {
  const benefits = [
    {
      title: "Scalable Architecture",
      desc: "Designed to handle high concurrent traffic and scale resources efficiently as your business grows.",
      icon: faNetworkWired,
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      title: "Bulletproof Security",
      desc: "Implementing industry-standard authentication (JWT, OAuth), data encryption, and secure API protocols.",
      icon: faShieldHalved,
      color: "bg-emerald-500/10 text-emerald-600"
    },
    {
      title: "Cloud & DevOps Integration",
      desc: "Automated deployment workflows, containerization with Docker, and hosting on robust cloud infrastructure.",
      icon: faCloud,
      color: "bg-orange-500/10 text-orange-600"
    }
  ];

  const strategySteps = [
    { title: "Architecture & Schema Design", desc: "Structuring relational and non-relational database schemas for high performance and integrity." },
    { title: "Secure API Implementation", desc: "Developing documented RESTful & GraphQL endpoints with robust input validation." },
    { title: "Third-Party Integrations", desc: "Connecting payment gateways, authentication providers, and cloud services seamlessly." },
    { title: "Caching & Speed Optimization", desc: "Optimizing database queries and integrating Redis caching to minimize latency." },
    { title: "Cloud Deployment & CI/CD", desc: "Setting up GitHub Actions, Docker, and deploying server instances for maximum uptime." }
  ];

  return (
    <div className="bg-white">
      <Hero
        title="Scalable Backend & APIs"
        description="Robust, secure, and lightning-fast server-side solutions designed to power your web applications, optimize data flow, and grow seamlessly with your user base."
        backgroundImage="/images/seo-service-bg.avif"
        calltoAction={
          <Link href="/#contact-us" className="btn secondery-btn px-10 h-16 font-bold text-xl">
            Discuss My Backend
          </Link>
        }
      />

      {/* Core Services Section */}
      <section className="py-24" id="services">
        <div className="container mx-auto px-5 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="mainheading">MY BACKEND CORE</h2>
            <h2 className="subheading">Reliability & Computational Precision</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <Card
              title="API Development"
              details="Building robust RESTful & GraphQL APIs with clean documentation, secure authentication, and rate limiting."
              geticon={<FontAwesomeIcon className='text-[100px] text-[#48CDA0]' icon={faServer} />}
              bg="bg-[#143D60]"
            />
            <Card
              title="Database Design"
              details="Structuring SQL & NoSQL systems (PostgreSQL, MongoDB) with optimized indexation and relationships."
              geticon={<FontAwesomeIcon className='text-[100px] text-[#FFD700]' icon={faDatabase} />}
              bg="bg-[#143D60]"
            />
            <Card
              title="System Integration"
              details="Seamlessly integrating third-party APIs, webhooks, payment gateways, and custom AI/LLM orchestrations."
              geticon={<FontAwesomeIcon className='text-[100px] text-[#FF8000]' icon={faNetworkWired} />}
              bg="bg-[#143D60]"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-5 lg:px-24">
          <div className="grid lg:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className={`w-16 h-16 ${benefit.color} rounded-2xl flex items-center justify-center text-3xl mb-8`}>
                  <FontAwesomeIcon icon={benefit.icon} />
                </div>
                <h3 className="text-2xl font-bold text-[#000248] mb-4">{benefit.title}</h3>
                <p className="para text-base">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-24 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3b679020] to-transparent" />
        <div className="container mx-auto px-5 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
               <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#efb03610] rounded-full blur-3xl" />
               <h2 className="mainheading">DEVELOPMENT CYCLE</h2>
               <h3 className="subheading mb-8">From Architecture to Production</h3>
               <p className="para mb-10">
                 Robust backend systems aren&apos;t built in a day. I follow a structured methodology to analyze data structures, build secure pathways, optimize performance, and launch with maximum reliability.
               </p>
               <div className="space-y-4">
                 {strategySteps.map((step, i) => (
                   <div key={i} className="flex items-start gap-5 p-6 bg-white border border-slate-100 rounded-[2.5rem] hover:border-[#3b6790] hover:shadow-md transition-all">
                     <div className="text-[#3b6790] font-black text-2xl opacity-20 italic">
                       {String(i + 1).padStart(2, '0')}
                     </div>
                     <div>
                       <h4 className="text-xl font-bold text-[#000248] mb-1">{step.title}</h4>
                       <p className="text-slate-500 text-sm">{step.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
            <div className="bg-[#143D60] p-12 rounded-[2.5rem] text-white shadow-2xl relative">
               <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mb-16" />
               <div className="text-center mb-10">
                 <FontAwesomeIcon icon={faTerminal} className="text-6xl text-[#efb036] mb-6" />
                 <h3 className="text-3xl font-extrabold">Need a High-Performance Engine?</h3>
               </div>
               <p className="text-slate-200 text-lg text-center mb-10 leading-relaxed">
                 Power your custom applications and platforms with secure, scalable APIs and modern database systems optimized for high throughput.
               </p>
               <div className="space-y-4 mb-10">
                 <div className="flex items-center gap-3 justify-center">
                   <div className="w-2 h-2 bg-[#48CDA0] rounded-full" />
                   <p className="font-bold">Complimentary Consultation Included</p>
                 </div>
                 <div className="flex items-center gap-3 justify-center">
                   <div className="w-2 h-2 bg-[#48CDA0] rounded-full" />
                   <p className="font-bold">Clean & Documented Code</p>
                 </div>
               </div>
                <div className="flex justify-center">
                  <Link href="/#contact-us" className="btn secondery-btn w-fit px-10 h-16 font-extrabold text-xl shadow-xl shadow-[#efb03630]">
                    Discuss Your Backend
                  </Link>
                </div>
            </div>
          </div>
        </div>
      </section>

      <Ourachivment />
    </div>
  );
};

export default BackendDevelopmentPage;

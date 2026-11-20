'use client';

import React from 'react';
import Hero from '../components/Hero';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLaptopCode, 
  faRocket, 
  faShieldHalved, 
  faMobileScreenButton,
  faMagnifyingGlassChart,
  faLayerGroup,
  faCogs,
  faVialCircleCheck,
  faCloudArrowUp
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import Link from 'next/link';

const WebsiteDevelopmentPage = () => {
  const features = [
    {
      title: "Lightning Fast Speed",
      desc: "Websites optimized for Core Web Vitals, ensuring near-instant load times and superior user retention.",
      icon: faRocket,
      color: "text-orange-500"
    },
    {
      title: "Enterprise-Grade Security",
      desc: "Robust architecture with secure data handling and SSL integration to protect your business assets.",
      icon: faShieldHalved,
      color: "text-blue-500"
    },
    {
      title: "Mobile-First Design",
      desc: "Flawless performance across all devices, from high-res monitors to the latest smartphones.",
      icon: faMobileScreenButton,
      color: "text-purple-500"
    },
    {
      title: "SEO-Ready Core",
      desc: "Built-in technical SEO optimization to ensure your site is ready to dominate search rankings from day one.",
      icon: faMagnifyingGlassChart,
      color: "text-emerald-500"
    }
  ];

  const processSteps = [
    { title: "Strategy & Planning", desc: "Understanding your goals and architecting a solution that delivers ROI.", icon: faLayerGroup },
    { title: "Design & UX", desc: "Creating high-end, conversion-focused prototypes for your review.", icon: faLaptopCode },
    { title: "Agile Development", desc: "Building your platform with clean, scalable code and regular updates.", icon: faCogs },
    { title: "QA & Testing", desc: "Rigorous stress testing for speed, security, and responsive perfection.", icon: faVialCircleCheck },
    { title: "Launch & Growth", desc: "Deploying your site to a secure cloud environment for global accessibility.", icon: faCloudArrowUp }
  ];

  return (
    <main className="bg-white">
      <Hero
        title="Ultimate Website Solutions"
        description="Professional website development services that ensure you stand out in the digital world and connect with your audience effectively through high-performance software."
        backgroundImage="/images/seo-service-bg.avif"
        calltoAction={
          <Link href="/#contact-us" className="btn secondery-btn max-w-full whitespace-normal px-6 sm:px-10 h-auto min-h-14 sm:min-h-16 py-4 font-bold text-base sm:text-xl text-center">
            Start Your Project
          </Link>
        }
      />

      {/* Why Us Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-16">
            <h2 className="mainheading">CORE STRENGTHS</h2>
            <h2 className="subheading">Built for Performance & Scale</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="min-w-0 bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className={`w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:bg-[#3b6790] group-hover:text-white transition-all ${feature.color}`}>
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <h3 className="text-xl font-bold text-[#000248] mb-4">{feature.title}</h3>
                <p className="para text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="min-w-0">
              <h2 className="mainheading">MY METHODOLOGY</h2>
              <h3 className="subheading mb-8">A Streamlined Path to Digital Success</h3>
              <p className="para mb-10">
                Building a successful website is not just about code. It’s about a strategic process that aligns your technical infrastructure with your business goals. I follow a rigorous lifecycle to ensure every project is delivered on time, within budget, and above expectations.
              </p>
              <div className="space-y-6">
                {processSteps.map((step, i) => (
                  <div key={i} className="flex items-center p-5 bg-slate-50 border border-slate-100 rounded-2xl group hover:border-[#3b6790] transition-colors">
                    <div className="w-10 h-10 shrink-0 bg-white rounded-lg flex items-center justify-center text-[#3b6790] shadow-sm font-bold">
                      {i + 1}
                    </div>
                    <div className="min-w-0 ml-4 sm:ml-5">
                      <h4 className="text-lg font-bold text-[#000248]">{step.title}</h4>
                      <p className="text-sm text-slate-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="min-w-0 bg-[#000248] p-6 sm:p-8 xl:p-12 rounded-[3rem] text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#3b679030] rounded-full blur-3xl -mr-32 -mt-32" />
               <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 relative z-10">Ready to transform your digital presence?</h3>
               <p className="text-slate-300 text-base sm:text-lg mb-8 sm:mb-10 relative z-10 leading-relaxed">
                 From small startups to large enterprises, I provide the technical expertise needed to build a platform that grows with your business.
               </p>
               <ul className="space-y-4 mb-10 relative z-10">
                 {["High-Performance Next.js Apps", "Scalable Laravel Solutions", "Conversion-Focused Shopify Stores", "Secure WordPress Portals"].map((item, i) => (
                   <li key={i} className="flex items-center">
                     <div className="w-1.5 h-1.5 shrink-0 bg-[#efb036] rounded-full mr-3" />
                     {item}
                   </li>
                 ))}
               </ul>
               <Link href="/#contact-us" className="btn secondery-btn w-full max-w-full whitespace-normal px-5 h-auto min-h-14 sm:min-h-16 py-4 font-extrabold text-base sm:text-xl text-center relative z-10">
                 Consult My Strategy
               </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default WebsiteDevelopmentPage;

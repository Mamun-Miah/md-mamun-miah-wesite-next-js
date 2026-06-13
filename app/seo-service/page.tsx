'use client';

import React from 'react';
import Hero from '../components/Hero';
import Card from '../components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFileAlt, 
  faRocket, 
  faMagnifyingGlassChart,
  faMobileScreenButton,
  faCogs
} from '@fortawesome/free-solid-svg-icons';
import { Ourachivment } from '../components/Ourachivment';
import { motion } from 'framer-motion';
import Link from 'next/link';

const TechnicalSeoPage = () => {
  const benefits = [
    {
      title: "Core Web Vitals Pass",
      desc: "Optimizing LCP, FID, and CLS scores to ensure your website passes Google's strict usability assessments.",
      icon: faRocket,
      color: "bg-orange-500/10 text-orange-600"
    },
    {
      title: "Enhanced Search Visibility",
      desc: "Structuring schema markup, sitemaps, and robots.txt so search engine crawlers can index your content accurately.",
      icon: faMagnifyingGlassChart,
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      title: "Mobile-First Optimization",
      desc: "Making sure layouts adapt flawlessly and load instantly on all mobile viewport sizes and network speeds.",
      icon: faMobileScreenButton,
      color: "bg-emerald-500/10 text-emerald-600"
    }
  ];

  const processSteps = [
    { title: "Performance & Lighthouse Audit", desc: "Analyzing bundle sizes, server response times, and identify loading bottlenecks." },
    { title: "Structured Data Implementation", desc: "Adding JSON-LD schemas and semantic HTML5 structures to help engines understand your pages." },
    { title: "Metadata & Content Tuning", desc: "Optimizing head elements, titles, descriptions, and structural heading tags for target queries." },
    { title: "Crawl Budget Optimization", desc: "Cleaning redirect chains, configuring canoncal links, and managing sitemaps/robots files." },
    { title: "Continuous Monitoring", desc: "Setting up Google Search Console alerts to monitor ranking drops or crawl issues." }
  ];

  return (
    <div className="bg-white">
      <Hero
        title="Technical SEO & Optimization"
        description="Providing the developer-level speed tuning, schema structuring, and Core Web Vitals optimization needed to get your high-performance web applications ranking and converting."
        backgroundImage="/images/seo-service-bg.avif"
        calltoAction={
          <Link href="/#contact-us" className="btn secondery-btn px-10 h-16 font-bold text-xl">
            Audit My Site Speed
          </Link>
        }
      />

      {/* Core Services Section */}
      <section className="py-24" id="services">
        <div className="container mx-auto px-5 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="mainheading">MY OPTIMIZATION CORE</h2>
            <h2 className="subheading">Technical SEO for Modern Web Engines</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <Card
              title="Speed & Performance Tuning"
              details="Code splitting, image compression, resource prefetching, and caching setups to hit 90+ Lighthouse scores."
              geticon={<FontAwesomeIcon className='text-[100px] text-[#48CDA0]' icon={faRocket} />}
              bg="bg-[#143D60]"
            />
            <Card
              title="Crawlability & Schema"
              details="Structuring custom JSON-LD schemas, breadcrumbs, sitemaps, and clean robots guidelines for search bots."
              geticon={<FontAwesomeIcon className='text-[100px] text-[#FFD700]' icon={faFileAlt} />}
              bg="bg-[#143D60]"
            />
            <Card
              title="Responsive Optimization"
              details="Adapting design systems, assets, and typography configurations to deliver great mobile-first experiences."
              geticon={<FontAwesomeIcon className='text-[100px] text-[#FF8000]' icon={faMobileScreenButton} />}
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
               <h2 className="mainheading">OPTIMIZATION WORKFLOW</h2>
               <h3 className="subheading mb-8">From Audit to Rank Growth</h3>
               <p className="para mb-10">
                 Good SEO isn&apos;t magic; it is clean code, fast servers, and semantic layout tags. I implement structured improvements to ensure search engines favor your platform.
               </p>
               <div className="space-y-4">
                 {processSteps.map((step, i) => (
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
                 <FontAwesomeIcon icon={faCogs} className="text-6xl text-[#efb036] mb-6" />
                 <h3 className="text-3xl font-extrabold">Ready to Rank #1?</h3>
               </div>
               <p className="text-slate-200 text-lg text-center mb-10 leading-relaxed">
                 Power up your visibility on Google. Combine speed optimizations with technical SEO strategies to increase organic traffic.
               </p>
               <div className="space-y-4 mb-10">
                 <div className="flex items-center gap-3 justify-center">
                   <div className="w-2 h-2 bg-[#48CDA0] rounded-full" />
                   <p className="font-bold">Core Web Vitals Audit Included</p>
                 </div>
                 <div className="flex items-center gap-3 justify-center">
                   <div className="w-2 h-2 bg-[#48CDA0] rounded-full" />
                   <p className="font-bold">Transparent Analytics Setups</p>
                 </div>
               </div>
                <div className="flex justify-center">
                  <Link href="/#contact-us" className="btn secondery-btn w-fit px-10 h-16 font-extrabold text-xl shadow-xl shadow-[#efb03630]">
                    Discuss Technical SEO
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

export default TechnicalSeoPage;

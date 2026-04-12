'use client';

import React from 'react';
import Hero from '../components/Hero';
import Card from '../components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFileAlt, 
  faCogs, 
  faSearch, 
  faMagnifyingGlassChart, 
  faArrowTrendUp, 
  faUsersViewfinder, 
  faBullseye
} from '@fortawesome/free-solid-svg-icons';
import { Ourachivment } from '../components/Ourachivment';
import { motion } from 'framer-motion';
import Link from 'next/link';

const SeoServicePage = () => {
  const benefits = [
    {
      title: "Targeted Organic Traffic",
      desc: "Connect with customers who are actively searching for your specific products and services.",
      icon: faUsersViewfinder,
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      title: "Measurable ROI",
      desc: "Data-driven strategies that show exactly how your investment transforms into leads and sales.",
      icon: faArrowTrendUp,
      color: "bg-emerald-500/10 text-emerald-600"
    },
    {
      title: "Market Domination",
      desc: "Outrank competitors and capture the lion's share of search demand in your niche.",
      icon: faBullseye,
      color: "bg-orange-500/10 text-orange-600"
    }
  ];

  const strategySteps = [
    { title: "Technical Audit", desc: "Identifying and fixing technical bottlenecks that hinder rankings." },
    { title: "Deep Keyword Analysis", desc: "Uncovering high-intent keywords with low competition and high volume." },
    { title: "Content Optimization", desc: "Aligning your on-page content with search intent and user value." },
    { title: "Authority Building", desc: "Ethical link building and boosting your website's domain authority." },
    { title: "Conversion Tracking", desc: "Setting up Google Search Console and Analytics to track every milestone." }
  ];

  return (
    <div className="bg-white">
      <Hero
        title="Dominating Search Rankings"
        description="SEO provides a powerful and visible online presence that drives significant growth in sales, profitability, and cost-efficiency. I deliver real, measurable business results through strategic search engine optimization."
        backgroundImage="/images/seo-service-bg.avif"
        calltoAction={
          <Link href="/#contact-us" className="btn secondery-btn px-10 h-16 font-bold text-xl">
            Audit My Website
          </Link>
        }
      />

      {/* Core Services Section */}
      <section className="py-24" id="services">
        <div className="container mx-auto px-5 lg:px-24">
          <div className="text-center mb-16">
            <h1 className="mainheading">MY SEO CORE</h1>
            <h2 className="subheading">Technical & Content Precision</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <Card
              title="On-Page SEO"
              details="Optimizing content, HTML structure, and user experience to improve relevance and search visibility."
              geticon={<FontAwesomeIcon className='text-[100px] text-[#48CDA0]' icon={faFileAlt} />}
              bg="bg-[#143D60]"
            />
            <Card
              title="Technical SEO"
              details="Enhancing website speed, mobile-friendliness, and crawlability to ensure search engines can properly access and index your site."
              geticon={<FontAwesomeIcon className='text-[100px] text-[#FFD700]' icon={faCogs} />}
              bg="bg-[#143D60]"
            />
            <Card
              title="Keyword Strategy"
              details="Identifying high-impact keywords your audience is searching for to guide content and drive targeted traffic."
              geticon={<FontAwesomeIcon className='text-[100px] text-[#FF8000]' icon={faSearch} />}
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
               <h2 className="mainheading">THE ROADMAP</h2>
               <h3 className="subheading mb-8">From Audit to Dominance</h3>
               <p className="para mb-10">
                 SEO is a long-term strategy, not a one-time fix. My roadmap is designed to build a sustainable foundation that continues to grow your traffic and revenue month after month.
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
                 <FontAwesomeIcon icon={faMagnifyingGlassChart} className="text-6xl text-[#efb036] mb-6" />
                 <h3 className="text-3xl font-extrabold">Ready to Rank #1?</h3>
               </div>
               <p className="text-slate-200 text-lg text-center mb-10 leading-relaxed">
                 Don&apos;t let your competitors capture your customers. Start your journey to search engine dominance today with a professional SEO strategy.
               </p>
               <div className="space-y-4 mb-10">
                 <div className="flex items-center gap-3 justify-center">
                   <div className="w-2 h-2 bg-[#48CDA0] rounded-full" />
                   <p className="font-bold">Complimentary Audit Included</p>
                 </div>
                 <div className="flex items-center gap-3 justify-center">
                   <div className="w-2 h-2 bg-[#48CDA0] rounded-full" />
                   <p className="font-bold">Transparent Reporting</p>
                 </div>
               </div>
                <div className="flex justify-center">
                  <Link href="/#contact-us" className="btn secondery-btn w-fit px-10 h-16 font-extrabold text-xl shadow-xl shadow-[#efb03630]">
                    Free SEO Consultation
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

export default SeoServicePage;
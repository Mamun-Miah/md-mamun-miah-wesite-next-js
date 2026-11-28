'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PROFILE_LINKS } from '@/lib/seo';

const Footer = () => {
  return (
    <footer className="bg-[#000248] text-white pt-12 sm:pt-16 lg:pt-20 overflow-hidden relative">
      {/* Decorative Gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#3b679020] rounded-full blur-3xl -mr-32 -mt-32" />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-12 gap-8 pb-10 sm:pb-12 lg:pb-16">
          {/* Brand Info */}
          <div className="min-w-0 xl:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <Image src="/images/logo.svg" alt="Mamun Miah Logo" width={160} height={40} className="rounded-lg brightness-0 invert" />
            </Link>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-sm">
              Helping businesses scale through custom full stack web development and modern cloud solutions. Delivering digital excellence with an AI-first mindset.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: faLinkedin, href: PROFILE_LINKS.linkedin, label: 'LinkedIn' },
                { icon: faGithub, href: PROFILE_LINKS.github, label: 'GitHub' },
                { icon: faFacebook, href: PROFILE_LINKS.facebook, label: 'Facebook' },
                { icon: faInstagram, href: PROFILE_LINKS.instagram, label: 'Instagram' },
              ].map(({ icon, href, label }) => (
                <motion.a
                  key={href}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-11 h-11 shrink-0 bg-slate-800 rounded-lg flex items-center justify-center text-slate-300 hover:bg-[#3b6790] hover:text-white transition-all shadow-md"
                >
                  <FontAwesomeIcon icon={icon} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="min-w-0 xl:col-span-2 space-y-6">
            <h3 className="text-lg xl:text-xl font-bold tracking-wider uppercase text-[#efb036]">Navigation</h3>
            <ul className="space-y-4">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/books', label: 'Books in Bangla' },
                { href: '/#services', label: 'Services' },
                { href: '/#portfolio', label: 'Portfolio' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="min-w-0 xl:col-span-3 space-y-6">
            <h3 className="text-lg xl:text-xl font-bold tracking-wider uppercase text-[#efb036]">Specialties</h3>
            <ul className="space-y-4">
              {['Custom Web Apps', 'Backend & APIs', 'AI & LLM Engineering', 'Technical SEO', 'Cloud Deployment'].map((service) => (
                <li key={service} className="text-slate-400 cursor-default hover:text-white transition-colors">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="min-w-0 xl:col-span-3 space-y-6">
            <h3 className="text-lg xl:text-xl font-bold tracking-wider uppercase text-[#efb036]">Contact Info</h3>
            <div className="space-y-5">
              <div className="flex min-w-0 items-start text-slate-400 group">
                <FontAwesomeIcon icon={faEnvelope} className="shrink-0 mt-1 text-[#3b6790] mr-3 group-hover:scale-110 transition-transform" />
                <a href="mailto:mamun.miah.dev@gmail.com" className="min-w-0 [overflow-wrap:anywhere] hover:text-white transition-colors">mamun.miah.dev@gmail.com</a>
              </div>
              <div className="flex items-center text-slate-400 group cursor-default">
                <FontAwesomeIcon icon={faPaperPlane} className="shrink-0 text-[#3b6790] mr-3 group-hover:scale-110 transition-transform" />
                <span className="min-w-0">Gazipur, Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Area */}
        <div className="border-t border-slate-800 py-8 sm:py-10 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Mamun Miah. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

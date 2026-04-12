'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-[#000248] text-white pt-20 overflow-hidden relative">
      {/* Decorative Gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#3b679020] rounded-full blur-3xl -mr-32 -mt-32" />

      <div className="container mx-auto px-5 lg:px-24">
        <div className="grid lg:grid-cols-12 gap-12 pb-16">
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <Image src="/images/logo.svg" alt="Mamun Miah Logo" width={160} height={40} className="rounded-lg brightness-0 invert" />
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
              Helping businesses grow through high-performance web development and strategic SEO. Delivering digital excellence with an AI-first mindset.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: faLinkedin, href: "https://www.linkedin.com/in/mamun-miah-dev/" },
                { icon: faGithub, href: "https://github.com/Mamun-Miah" },
                { icon: faFacebook, href: "https://facebook.com/mamun.miah.dev" },
                { icon: faInstagram, href: "https://www.instagram.com/mamun.miah.dev/" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-300 hover:bg-[#3b6790] hover:text-white transition-all shadow-md"
                >
                  <FontAwesomeIcon icon={social.icon} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold tracking-wider uppercase text-[#efb036]">Navigation</h3>
            <ul className="space-y-4">
              {['Home', 'About', 'Services', 'Portfolio'].map((link) => (
                <li key={link}>
                  <Link
                    href={link === 'Home' ? '/' : `/#${link.toLowerCase()}`}
                    className="text-slate-400 hover:text-white hover:translate-x-1 transition-all inline-block"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-xl font-bold tracking-wider uppercase text-[#efb036]">Specialties</h3>
            <ul className="space-y-4">
              {['Custom Web Apps', 'Strategic SEO', 'Full Stack Solutions', 'Cloud Deployment'].map((service) => (
                <li key={service} className="text-slate-400 cursor-default hover:text-white transition-colors">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-xl font-bold tracking-wider uppercase text-[#efb036]">Contact Info</h3>
            <div className="space-y-5">
              <div className="flex items-center text-slate-400 group">
                <FontAwesomeIcon icon={faEnvelope} className="text-[#3b6790] mr-3 group-hover:scale-110 transition-transform" />
                <a href="mailto:mamun.miah.dev@gmail.com" className="hover:text-white transition-colors">mamun.miah.dev@gmail.com</a>
              </div>
              <div className="flex items-center text-slate-400 group">
                <FontAwesomeIcon icon={faPhone} className="text-[#3b6790] mr-3 group-hover:scale-110 transition-transform" />
                <a href="tel:+8801620173656" className="hover:text-white transition-colors">+880 1620 173656</a>
              </div>
              <div className="flex items-center text-slate-400 group cursor-default">
                <FontAwesomeIcon icon={faPaperPlane} className="text-[#3b6790] mr-3 group-hover:scale-110 transition-transform" />
                <span>Gazipur, Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Area */}
        <div className="border-t border-slate-800 py-10 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm gap-4">
          <p>© {new Date().getFullYear()} Mamun Miah. All rights reserved.</p>
          <div className="flex space-x-8">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

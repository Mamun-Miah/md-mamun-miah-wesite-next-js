'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navlink from './ActiveNavlink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const details = document.querySelector("details[open]") as HTMLDetailsElement | null;
      if (details) {
        const target = e.target as HTMLElement;
        if (!details.contains(target) || target.tagName === "A") {
          details.open = false;
        }
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <header className="relative z-20 mx-4 lg:mx-8">
      <div className="navbar bg-white/20 backdrop-blur-md rounded-2xl mt-5 px-4 lg:px-8 shadow-sm border border-white/30">

        {/* Navbar Start: Mobile Menu Toggle & Desktop Logo */}
        <div className="navbar-start flex-1 lg:flex-none lg:w-1/4">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" aria-label="menu mobile" className="btn btn-ghost lg:hidden p-0 w-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-[1.5rem] z-[50] mt-4 w-64 p-4 shadow-2xl border border-slate-100 text-slate-800">
              <li className="mb-2"><Navlink href="/">Home</Navlink></li>
              <li className="mb-2">
                <details>
                  <summary className="font-bold py-3 text-[#3b6790]">Services</summary>
                  <ul className="pl-4 mt-2 space-y-2 border-l-2 border-slate-100">
                    <li><Navlink href="/website-development">Website Development</Navlink></li>
                    <li><Navlink href="/seo-service">SEO Service</Navlink></li>
                  </ul>
                </details>
              </li>
              <li className="mb-2"><Navlink href="/about">About Me</Navlink></li>
              <li className="mb-2"><Navlink href="/blog">Blog</Navlink></li>
              <li><Navlink href="/fiverr-keyword-research">Tools</Navlink></li>
            </ul>
          </div>

          {/* Desktop Logo (Hidden on mobile) */}
          <Link href="/" className="hidden lg:flex items-center">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={140}
              height={40}
              className="brightness-0 invert h-auto w-[120px] transition-transform hover:scale-105"
            />
          </Link>
        </div>

        {/* Navbar Center: Desktop Menu (Hidden on mobile) & Mobile Logo (Hidden on desktop) */}
        <div className="navbar-center justify-center lg:flex-grow">
          {/* Mobile Logo: Centered on mobile */}
          <Link href="/" className="lg:hidden flex items-center justify-center">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={120}
              height={35}
              className="brightness-0 invert h-auto w-[100px]"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal gap-4 px-1 text-white font-bold text-[1.1rem]">
              <li><Navlink href="/">Home</Navlink></li>
              <li>
                <details className="group">
                  <summary className="hover:text-[#efb036] transition-colors cursor-pointer list-none flex items-center gap-1 after:hidden">
                    Services
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <ul className="p-3 z-[50] mt-4 bg-white rounded-2xl shadow-2xl border border-slate-100 text-slate-800 w-56">
                    <li className="mb-1"><Link href="/website-development" className="hover:bg-slate-50 py-3 rounded-xl font-medium">Website Development</Link></li>
                    <li><Link href="/seo-service" className="hover:bg-slate-50 py-3 rounded-xl font-medium">SEO Service</Link></li>
                  </ul>
                </details>
              </li>
              <li><Navlink href="/about">About Me</Navlink></li>
              <li><Navlink href="/blog">Blog</Navlink></li>
              <li><Navlink href="/fiverr-keyword-research">Tools</Navlink></li>
            </ul>
          </div>
        </div>

        {/* Navbar End: Contact Button */}
        <div className="navbar-end flex-1 lg:flex-none lg:w-1/4">
          {/* Desktop Button */}
          <Link
            href="/#contact-us"
            className="btn secondery-btns hidden lg:flex min-h-0 h-10 px-6 font-extrabold shadow-lg"
          >
            Contact me
          </Link>

          {/* Mobile Icon Button */}
          <Link
            href="/#contact-us"
            className="btn btn-ghost btn-circle lg:hidden text-[#efb036] hover:bg-white/10"
            aria-label="contact me"
          >
            <FontAwesomeIcon icon={faPaperPlane} className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

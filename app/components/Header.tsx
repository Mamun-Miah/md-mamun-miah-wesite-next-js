'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navlink from './ActiveNavlink'; 

const Header: React.FC = () => {
  return (
    <header className="relative z-20 mx-8">
      <div className="navbar bg-white/20 backdrop-blur-md rounded-lg mt-5 px-5">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li><Navlink href="/">Home</Navlink></li>

              <li>
                <a>Services</a>
                <ul className="p-2 text-black">
                  <li><Navlink href="/website-development">Website Development</Navlink></li>
                  <li><a>SEO Service</a></li>
                </ul>
              </li>
              <li><Navlink href="/about">About Me</Navlink></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>
          <Link href="/" className="ms-5">
            <Image
              src="/images/logo.svg"
              alt="Logo"
              width={160}
              height={50}
              className="lg:w-[10rem] w-[8rem] lg:mt-[-10px] lg:ms-[-25px] max-sm:ms-[5px]"
            />
          </Link>
        </div>

        <div className="navbar-center hidden z-10 lg:flex">
          <ul className="menu menu-horizontal px-1 text-[#eefb39] text-[1.1rem]">
            <li><Navlink href="/" >Home</Navlink></li>
            <li>
              <details>
                <summary>Services</summary>
                <ul className="p-2 z-10 text-black">
                  <li><Link href="/website-development">Website Development</Link></li>
                  <li><a>SEO Service</a></li>
                </ul>
              </details>
            </li>
            <li><Navlink href="/about" >About Me</Navlink></li>
            <li><Link href="#">Blog</Link></li>
          </ul>
        </div>

        <div className="navbar-end">
          <a
            href="https://mdmamunmiah.com/#contact-us"
            className="btn secondery-btn max-sm:hidden"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact me
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

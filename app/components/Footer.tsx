'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <footer className="footer flex flex-wrap justify-between bg-[#080934] text-white p-10">
        <aside>
          <Image src="/images/logo.svg" alt="Logo" width={144} height={144} className="rounded-lg" />
          {/* <p className="font-bold ms-1">Delivering Trusted Services Since 2017</p> */}
        </aside>

        <nav>
          <h6 className="heading5footer font-bold">My Services</h6>
          <Link href='/website-development' className="link link-hover">Web Development</Link>
          <Link href='/seo-service' className="link link-hover">SEO Service</Link>
        </nav>

        <nav>
          <h6 className="heading5footer font-bold">Quick Links</h6>
          <Link href='/' className="link link-hover">Home</Link>
          <Link href='/about' className="link link-hover">About Me</Link>
          <Link href='https://mamundev.com/#contact-us' className="link link-hover">Contact</Link>
        </nav>

        <nav>
          <h6 className="heading5footer font-bold">Follow Me</h6>
          <div className="grid grid-flow-col gap-4 text-white">
            <a target="_blank" aria-label="Linkedin" href="https://www.linkedin.com/in/mamun-miah-dev/">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a target="_blank" aria-label="Instagram" href="https://www.instagram.com/mamun.miah.dev/">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </div>
        </nav>
      </footer>

      <div className="footer footer-center bg-[#101253] text-white p-4">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All rights reserved by Mamun Miah</p>
        </aside>
      </div>
    </>
  );
};

export default Footer;

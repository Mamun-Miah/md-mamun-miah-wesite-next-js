'use client';

import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  const [status, setStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      // replace with your actual API logic
      await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });

      setStatus('success');
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <>
      <div className="lg:mx-24 mx-5 mt-24 bg-[#fbfbfd]" id="contact-us">
        <div className="w-full lg:max-w-lg space-y-3 mb-4 ">
          <h1 className="mainheading">CONTACT</h1>
          <p className="subheading">Let&apos;s Work Together!</p>
          <p className="text-justify text-[#000248]">
            Have a project in mind? Need expert SEO or website development services? I&#39;m here to help! Whether it&apos;s optimizing your online presence, creating a professional website, or boosting your brand, I&#39;m just a message away.
          </p>
        </div>
      </div>

      <section className="my-8 lg:mx-24 mx-5 grid lg:grid-cols-2 gap-5">
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
            <input type="text" name="name" placeholder="Full Name" className="input input-bordered w-full" required />
            <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" required />
            <input type="number" name="phone" placeholder="Phone" className="input input-bordered w-full" required />
            <textarea name="message" placeholder="Message" className="textarea textarea-bordered w-full" required></textarea>
            <button type="submit" className="btn w-full secondery-btn">Send Message</button>
          </form>

          {status === 'success' && <div className="alert alert-success my-4">Message sent successfully!</div>}
          {status === 'error' && <div className="alert alert-error my-4">Failed to send message.</div>}
        </div>

        <div className="space-y-6 lg:ms-12 max-md:mt-5">
          <h1 className="subheading">Contact information</h1>

          <div className="flex flex-col text-lg space-y-4">
            <p className="text-black">
              <span className="font-medium text-gray text-3xl">
                <FontAwesomeIcon icon={faLocationDot} className="text-3xl me-2 maincolor" />
                Address:
              </span><br />
              <span className="ms-10">Gazipur, Dhaka, Bangladesh</span>
            </p>
            <p className="text-black">
              <span className="font-medium text-gray text-3xl">
                <FontAwesomeIcon icon={faPhone} className="text-3xl me-2 maincolor" />
                Phone:
              </span><br />
              <span className="ms-11">+8801620173656</span>
            </p>
            <p className="text-black">
              <span className="font-medium text-gray text-3xl">
                <FontAwesomeIcon icon={faEnvelope} className="text-3xl me-2 maincolor" />
                Email:
              </span><br />
              <span className="ms-11">mamun.miah.dev@gmail.com</span>
            </p>
          </div>
        </div>
      </section>

      <div className="pt-[70px] lg:pt-[100px]">
        <div className="border-2 border-accent1 w-full">
          <iframe
            width="100%"
            height="400"
            frameBorder="0"
            scrolling="no"
            marginHeight={0}
            marginWidth={0}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.06463178524!2d90.25452953216559!3d23.780752661854898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sid!4v1739086588617!5m2!1sen!2sid"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Contact;

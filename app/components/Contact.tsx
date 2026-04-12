'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
};

type Status = 'idle' | 'sending' | 'success' | 'error';

const statusMessages: Record<Status, string> = {
  idle: '',
  sending: 'Sending...',
  success: 'Message sent successfully!',
  error: 'Failed to send message.',
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ fullName: '', email: '', phone: '', message: '' });
      } else {
        const data = await res.json();
        console.error(data.error || data.message || 'Error sending message');
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section className="py-24 bg-white overflow-x-hidden" id="contact-us" suppressHydrationWarning data-aos="fade-up">
      <div className="container mx-auto px-5 lg:px-24">
        <div className="lg:grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Header & Info */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <h1 className="mainheading">CONTACT ME</h1>
              <h2 className="subheading">Let&apos;s Build Something Great</h2>
              <p className="para text-justify">
                Have a project in mind or just want to say hi? I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-[#3b6790] transition-all hover:bg-white hover:shadow-lg">
                <div className="w-12 h-12 bg-[#3b6790] rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-[#3b679030]">
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <div className="ml-5">
                  <p className="text-xs font-bold text-[#efb036] uppercase tracking-[0.2em] mb-1">Location</p>
                  <p className="text-lg font-bold text-[#000248]">Gazipur, Dhaka, Bangladesh</p>
                </div>
              </div>

              <div className="flex items-center p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-[#3b6790] transition-all hover:bg-white hover:shadow-lg">
                <div className="w-12 h-12 bg-[#3b6790] rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-[#3b679030]">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className="ml-5">
                  <p className="text-xs font-bold text-[#efb036] uppercase tracking-[0.2em] mb-1">Contact No</p>
                  <p className="text-lg font-bold text-[#000248]">+8801620173656</p>
                </div>
              </div>

              <div className="flex items-center p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-[#3b6790] transition-all hover:bg-white hover:shadow-lg">
                <div className="w-12 h-12 bg-[#3b6790] rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-[#3b679030]">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div className="ml-5">
                  <p className="text-xs font-bold text-[#efb036] uppercase tracking-[0.2em] mb-1">Email Details</p>
                  <p className="text-md font-bold text-[#000248]">mamun.miah.dev@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-4 md:p-6 lg:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3b679005] rounded-full -mr-16 -mt-16" />
              <div className="relative">
                <h3 className="text-2xl font-bold text-[#000248] mb-6 lg:mb-8">Quick Message</h3>
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-500 ml-1">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="John Doe"
                        className="input input-bordered w-full h-14 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        autoComplete="name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-500 ml-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="email@example.com"
                        className="input input-bordered w-full h-14 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 ml-1">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+880..."
                      className="input input-bordered w-full h-14 bg-slate-50 border-slate-200 focus:bg-white transition-all"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      pattern="^\+?\d{7,15}$"
                      title="Enter a valid phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 ml-1">Your Message</label>
                    <textarea
                      name="message"
                      placeholder="Hi, I'd like to talk about..."
                      className="textarea textarea-bordered w-full h-40 bg-slate-50 border-slate-200 focus:bg-white transition-all resize-none"
                      required
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn w-full secondery-btn h-16 font-extrabold text-xl shadow-xl shadow-[#efb03630]" disabled={status === 'sending'}>
                    {statusMessages[status] || 'Send Message Now'}
                  </button>
                </form>

                {status === 'success' && (
                  <div className="alert alert-success mt-6 rounded-xl font-bold">{statusMessages.success}</div>
                )}
                {status === 'error' && (
                  <div className="alert alert-error mt-6 rounded-xl font-bold">{statusMessages.error}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
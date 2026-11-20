import React from 'react'
import MotionCounter from '../components/Counter';
import Link from 'next/link';
export const Ourachivment = () => {
  return (
    <section className="text-center py-16 bg-gray-100" suppressHydrationWarning data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="subheading mb-4">Our Achievements</h2>
          <p className="para">We have successfully built and deployed high-performance, scalable web systems for clients worldwide.</p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10 lg:gap-12 items-start my-10 sm:my-16'>
          <div className='min-w-0 text-center'>
            <MotionCounter to={98} duration={3} />
            <h2 className="para my-3">Performance Score <br />Lighthouse %</h2>
          </div>
          <div className='min-w-0 text-center'>
            <MotionCounter to={65} duration={3} />
            <h2 className="para my-3">Load Time Optimization <br />Decrease %</h2>
          </div>
          <div className='min-w-0 text-center'>
            <MotionCounter to={50} duration={3} />
            <h2 className="para my-3">Scalable Apps <br />Delivered +</h2>
          </div>
          <div className='min-w-0 text-center'>
            <MotionCounter to={99} duration={3} />
            <h2 className="para my-3">System Uptime <br />SLA %</h2>
          </div>
        </div>
        <div className="flex justify-center">
          <Link href="/#contact-us" className='btn secondery-btn w-full sm:w-fit max-w-full whitespace-normal px-6 sm:px-10 h-auto min-h-14 sm:min-h-16 py-4 text-center font-extrabold'>Discuss Your Project</Link>
        </div>
      </div>
    </section>
  )
}

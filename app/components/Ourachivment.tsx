import React from 'react'
import MotionCounter from '../components/Counter';
import Link from 'next/link';
export const Ourachivment = () => {
  return (
    <section className="text-center py-16 bg-gray-100 " suppressHydrationWarning data-aos="fade-up">
            <div>
                <h2 className="subheading mb-4">Our Achievements</h2>
                <p className="para mb-16">We have successfully built and deployed high-performance, scalable web systems for clients worldwide.</p>
            </div>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-12 md:gap-24 justify-center items-center lg:mx-16 md:mx-24 mx-5 my-16'>
                <div className='text-center h-24 '>
                    <MotionCounter to={98} duration={3} />
                    <h2 className="para my-3">Performance Score <br />Lighthouse %</h2>
                </div>
                <div className='text-center h-24'>
                    <MotionCounter to={65} duration={3} />
                    <h2 className="para my-3">Load Time Optimization <br />Decrease %</h2>
                </div>
                <div className='text-center h-24'>
                    <MotionCounter to={50} duration={3} />
                    <h2 className="para my-3">Scalable Apps <br />Delivered +</h2>
                </div>
                <div className='text-center h-24'>
                    <MotionCounter to={99} duration={3} />
                    <h2 className="para my-3">System Uptime <br />SLA %</h2>   
                </div>
            </div>

           
             <div className="flex justify-center">
               <Link href="/#contact-us" className='btn secondery-btn btn-wide h-16 font-extrabold'>Discuss Your Project</Link>  
             </div>
            
        </section>
  )
}

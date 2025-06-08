import React from 'react'
import MotionCounter from '../components/Counter';
export const Ourachivment = () => {
  return (
    <section className="text-center py-16 bg-gray-100 " data-aos="fade-up">
            <div>
                <h2 className="subheading mb-4">Our Achievements</h2>
                <p className="para mb-16">We have successfully helped numerous clients achieve their SEO goals.</p>
            </div>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-24 justify-center items-center lg:mx-16 md:mx-24 mx-5 my-16'>
                <div className='text-center h-24 '>
                    <MotionCounter to={83} duration={3} />
                    <h2 className="para my-3">Organic Traffic <br />Increase +</h2>
                </div>
                <div className='text-center h-24'>
                    <MotionCounter to={42} duration={3} />
                    <h2 className="para my-3">Bounce Rate <br />Decrease -</h2>
                </div>
                <div className='text-center h-24'>
                    <MotionCounter to={32} duration={3} />
                    <h2 className="para my-3">Average Visit Duration <br />Increase +</h2>
                </div>
                <div className='text-center h-24'>
                    <MotionCounter to={21} duration={3} />
                    <h2 className="para my-3">Pages Per Session <br />Increase +</h2>   
                </div>
            </div>

           
              <a href="https://mdmamunmiah.com/#contact-us"><button className='btn btn-wide bg-yellow-300 hover:bg-amber-500'>Free SEO Consultation</button></a>  
            
        </section>
  )
}

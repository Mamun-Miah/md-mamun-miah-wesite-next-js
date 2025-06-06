'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';

const Hero = () => {
  return (
    <div className="hero h-[110vh] max-sm:h-[90vh] website-bg relative">
      <div className="hero-content p-0 max-sm:pt-16 flex-col lg:flex-row z-10 text-white">

        <div className="grid lg:grid-cols-5 md:grid-cols-3 w-full">
          
          <div className="col-span-2 lg:mx-12 max-xl:mx-12 mx-3">
            <h1 className="lg:text-5xl max-sm:text-center text-4xl tracking-wide uppercase font-bold">
              Ultimate<br /> Website<br /> Solutions
            </h1>
            <p className="py-6 max-sm:text-center text-xl">
              Professional website development services will ensure you stand out in the digital world and connect with your audience effectively.
            </p>
            <div className="max-sm:flex justify-center items-center">
              <button className="btn bg-[#8728c7] text-white btn-sm btn-wide">
                <a href="https://mdmamunmiah.com/#contact-us">MAKE AN APPOINTMENT</a>
              </button>
            </div>

            <div className="mt-8 flex items-center max-sm:flex max-sm:justify-center">
              <FontAwesomeIcon icon={faGlobe} size="3x" className="me-3 text-[#a858e9]" />
              <div>
                <p>Website:</p>
                <p>mdmamunmiah.com</p>
              </div>
            </div>
          </div>

          <div className="col-span-3" />
        </div>
      </div>
    </div>
  );
};

export default Hero;

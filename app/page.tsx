import React from 'react'
import Hero from './components/Hero';
import Services from './components/Services';
import Technologies from './components/Technologies';
const page = () => {
  return (
    <div>
      <Hero
        title="Boost Your Business with Expert SEO & Web Development"
        description="I'm Mamun Miah, with over 7 years of experience helping businesses grow online through effective SEO and stunning websites. Let’s take your online presence to the next level!"
        backgroundImage="/images/about.avif" 
        calltoAction=  <a
              href="https://mdmamunmiah.com/#contact-us"
              className="btn secondery-btn"
            >
              Get Your Service Now
            </a>
      />
      <Services/>
      <Technologies/>
      </div>
  )
}

export default page
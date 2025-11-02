// app/page.tsx (Home Page)
import React from 'react'
import Hero from './components/Hero';
import ServicesSection from './components/Services';
import Technologies from './components/Technologies';
import Contact from './components/Contact';
import Portfolio from './components/Portfolio';

const page = () => {
  return (
    <div>
      <Hero
        title="Boost Your Business with"
        description="I'm Mamun Miah, with over 7 years of experience helping businesses grow online through effective SEO and stunning websites. Let’s take your online presence to the next level!"
        backgroundImage="/images/about.avif"
        showTyping={true}  //  Enable animation only on Home
        calltoAction={
          <a
            href="https://mdmamunmiah.com/#contact-us"
            className="btn secondery-btn"
          >
            Get Your Service Now
          </a>
        }
      />
      <ServicesSection />
      <Portfolio/>
      <Technologies />
      <Contact />
    </div>
  )
}

export default page;

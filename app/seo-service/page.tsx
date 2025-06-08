import React from 'react'
import Hero from '../components/Hero';
const page = () => {
  return (
    <div>
        <Hero
        title="Search Engine Optimization"
        description="SEO provides a powerful and visible online presence that drives significant growth in sales, profitability, and cost-efficiency for our clients. It&rsquo;s not just about rankings, it&rsquo;s about delivering real, measurable business results."
        backgroundImage="images/seo-service-bg.avif"
        calltoAction=  <a
              href="https://mdmamunmiah.com/#contact-us"
              className="btn secondery-btn"
            >
              Get SEO Service Now
            </a>
      /></div>
  )
}

export default page
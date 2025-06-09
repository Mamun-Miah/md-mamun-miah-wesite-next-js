import React from 'react'
import Hero from '../components/Hero';
import Card from '../components/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faCogs, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Ourachivment } from '../components/Ourachivment';

export const metadata = {
  title: 'SEO SERVICE - Mamun Miah',
};
const page = () => {
  return (
    <div >
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
      />
        <section data-aos="fade-up" className="lg:mx-24 my-16 md:mx-24 mx-5 grid lg:grid-cols-3 justify-center items-center gap-5" >
            <Card
            title="On-Page SEO"
            details="Optimizing content, HTML structure, and user experience to improve relevance and search visibility."
            geticon=<FontAwesomeIcon className='text-[100px] text-[#48CDA0]' icon={faFileAlt} />
            bg="bg-[#4B4B4B]"
            
            />
            <Card
            title="Tecnical SEO"
            details="Enhancing website speed, mobile-friendliness, and crawlability to ensure search engines can properly access and index your site."
            geticon=<FontAwesomeIcon className='text-[100px] text-[#FFD700]' icon={faCogs} />
            bg="bg-[#4B4B4B]"
            
            />
            <Card
            title="Keyword Research"
            details="Identifying high-impact keywords your audience is searching for to guide content and drive targeted traffic."
            geticon=<FontAwesomeIcon className='text-[100px] text-[#FF8000]' icon={faSearch} />
            bg="bg-[#4B4B4B]"
            
            />
        </section>
        <Ourachivment />
        
      </div>
  )
}

export default page
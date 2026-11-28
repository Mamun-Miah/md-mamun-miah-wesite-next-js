import { pageMetadata, pages } from '@/lib/seo';
import { websiteSchema } from '@/lib/schema';
import Hero from './components/Hero';
import StructuredData from './components/StructuredData';
import ServicesSection from './components/Services';
import Contact from './components/Contact';
import Portfolio from './components/Portfolio';
import Technologies from './components/Technologies';

export const metadata = pageMetadata(pages.home);

const page = () => {
  return (
    <div>
      <StructuredData data={websiteSchema} />
      <Hero
        title="Mamun Miah, Full Stack & AI Developer"
        description="I build high-performance, scalable web applications and SaaS solutions that help businesses grow. From custom frontend interfaces to secure backend databases, I focus on robust engineering and seamless user experiences."
        backgroundImage="/images/about.avif"
        showTyping={true}  //  Enable animation only on Home
        typingText={["AI Integration, PEFT, RAG", "Custom Web Development", "Performance Optimization", "Robust Backend APIs", "Full Stack Solutions"]}
        calltoAction={
          <a
            href="#contact-us"
            className="btn secondery-btn font-bold px-8"
          >
            Start Your Project
          </a>
        }
      />
      <ServicesSection />
      <Technologies />
      <Portfolio />
      <Contact />
    </div>
  )
}

export default page;

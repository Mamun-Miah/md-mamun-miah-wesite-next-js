import Hero from './components/Hero';
import ServicesSection from './components/Services';
import Contact from './components/Contact';
import Portfolio from './components/Portfolio';
import Technologies from './components/Technologies';

const page = () => {
  return (
    <div>
      <Hero
        title="Transforming Ideas into Reality"
        description="I build high-performance, full-stack web applications and deliver data-driven SEO strategies that help businesses scale. From concept to deployment, I focus on measurable results and stunning user experiences."
        backgroundImage="/images/about.avif"
        showTyping={true}  //  Enable animation only on Home
        typingText={["Custom Web Development", "Performance Optimization", "Strategic SEO", "Full Stack Solutions"]}
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
      <Portfolio/>
      <Contact />
    </div>
  )
}

export default page;

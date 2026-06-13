const SITE_URL = 'https://mamundev.com';

/**
 * JSON-LD Structured Data component for rich search results.
 * Implements Person + ProfessionalService schemas.
 * Google uses this to populate Knowledge Panels and rich snippets.
 */
export default function StructuredData() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    dateCreated: '2024-01-01',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntity: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Mamun Miah',
      givenName: 'Mamun',
      familyName: 'Miah',
      jobTitle: 'Full Stack Web Developer & AI Engineer',
      description:
        'Full Stack Web Developer with 7+ years of experience building high-performance Next.js applications, scalable backend APIs, RAG-powered AI systems, and LLM integrations. Available for freelance hire.',
      url: SITE_URL,
      email: 'mamun.miah.dev@gmail.com',
      telephone: '+8801620173656',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Gazipur',
        addressRegion: 'Dhaka',
        addressCountry: 'BD',
      },
      sameAs: [
        'https://www.linkedin.com/in/mamun-miah-dev/',
        'https://github.com/Mamun-Miah',
        'https://facebook.com/mamun.miah.dev',
        'https://www.instagram.com/mamun.miah.dev/',
      ],
      knowsAbout: [
        'Next.js',
        'React.js',
        'Node.js',
        'TypeScript',
        'PostgreSQL',
        'MongoDB',
        'REST API Development',
        'GraphQL',
        'LangChain',
        'LangGraph',
        'RAG Systems',
        'LLM Integration',
        'AI Development',
        'Technical SEO',
        'Core Web Vitals',
        'Docker',
        'Cloud Deployment',
      ],
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Full Stack Developer',
        occupationLocation: {
          '@type': 'Country',
          name: 'Bangladesh',
        },
        skills:
          'Next.js, React, Node.js, TypeScript, PostgreSQL, MongoDB, LangChain, RAG, AI Engineering',
      },
    },
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#service`,
    name: 'Mamun Miah — Full Stack & AI Development Services',
    description:
      'Professional web development, AI integration, and technical SEO services by Mamun Miah. Specializing in Next.js, scalable APIs, RAG pipelines, and LLM-powered SaaS products.',
    url: SITE_URL,
    telephone: '+8801620173656',
    email: 'mamun.miah.dev@gmail.com',
    areaServed: 'Worldwide',
    priceRange: '$$',
    provider: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Mamun Miah',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Web Development',
            description:
              'High-performance, SEO-ready websites and web apps built with Next.js and React.',
            url: `${SITE_URL}/website-development`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Backend API Development',
            description:
              'Scalable, secure REST & GraphQL APIs built with Node.js, PostgreSQL, and MongoDB.',
            url: `${SITE_URL}/backend-development`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AI & LLM Engineering',
            description:
              'RAG pipelines, LangChain agents, fine-tuned LLMs, and AI-powered SaaS integrations.',
            url: `${SITE_URL}/ai-development`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Technical SEO Optimization',
            description:
              'Core Web Vitals tuning, schema markup, sitemap configuration, and crawlability improvements.',
            url: `${SITE_URL}/seo-service`,
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}

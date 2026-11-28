import type { Metadata } from 'next';

export const SITE_URL = 'https://mamundev.com';
export const SITE_NAME = 'Mamun Miah';
export const PORTRAIT_PATH = '/mamun_miah-dev.jpeg';
export const PROFILE_LINKS = {
  linkedin: 'https://www.linkedin.com/in/mamun-miah-dev/',
  github: 'https://github.com/Mamun-Miah',
  facebook: 'https://www.facebook.com/mamun.miah.dev',
  instagram: 'https://www.instagram.com/mamun.miah.dev/',
};

export function siteUrl(path: string) {
  return new URL(path, SITE_URL).href;
}

export function shareCard(file: string, alt: string) {
  return {
    url: `/images/og-${file}.jpg`,
    alt,
    width: 1200,
    height: 630,
    type: 'image/jpeg',
  };
}

const portraitCard = shareCard('image', 'Mamun Miah, Full Stack and AI Developer');

export type SeoPage = {
  path: `/${string}`;
  title: string;
  description: string;
  image?: ReturnType<typeof shareCard>;
  index?: boolean;
};

export const pages = {
  home: {
    path: '/',
    title: `${SITE_NAME} | Full Stack & AI Developer`,
    description: 'Mamun Miah builds Next.js web applications, scalable APIs, and AI systems. Explore his freelance development services, projects, and programming books.',
  },
  about: {
    path: '/about',
    title: `About ${SITE_NAME} | Full Stack & AI Developer`,
    description: 'Meet Mamun Miah, a full stack developer from Bangladesh with 7+ years of experience building web applications, APIs, and AI systems.',
  },
  books: {
    path: '/books',
    title: `JavaScript OOP & Rust Books in Bangla | ${SITE_NAME}`,
    description: 'Read two free programming books in Bangla: a JavaScript OOP guide with code examples and exercises, and a Rust book translation covering ownership and borrowing.',
    image: shareCard('books', 'Free programming books in Bangla: JavaScript OOP and Rust'),
  },
  web: {
    path: '/website-development',
    title: `Custom Website Development | ${SITE_NAME}`,
    description: 'Hire Mamun Miah to build responsive websites, SaaS products, and custom web applications with Next.js, React, and TypeScript.',
    image: shareCard('website-development', 'Full stack web development with Next.js, React, and TypeScript'),
  },
  backend: {
    path: '/backend-development',
    title: `Backend & API Development | ${SITE_NAME}`,
    description: 'Mamun Miah builds REST and GraphQL APIs, database integrations, and cloud deployments using Node.js, PostgreSQL, MongoDB, and Docker.',
    image: shareCard('backend-development', 'Backend and API development: REST, GraphQL, and databases'),
  },
  ai: {
    path: '/ai-development',
    title: `AI & LLM Engineering Services | ${SITE_NAME}`,
    description: 'Build custom AI chatbots, retrieval-augmented generation (RAG) pipelines, and LLM integrations with Mamun Miah.',
    image: shareCard('ai-development', 'AI and LLM engineering: RAG, agents, and integrations'),
  },
  seo: {
    path: '/seo-service',
    title: `Technical SEO & Web Performance | ${SITE_NAME}`,
    description: 'Get a technical SEO audit from Mamun Miah covering Core Web Vitals, structured data, sitemaps, and crawlability for your website.',
    image: shareCard('seo-service', 'Technical SEO and web performance: Core Web Vitals, crawling, and schema'),
  },
  fiverr: {
    path: '/fiverr-keyword-research',
    title: `Free Fiverr Keyword Research Tool | ${SITE_NAME}`,
    description: 'Enter a seed keyword to find Fiverr autocomplete suggestions for your gig. Use the free tool and guide to build a list of relevant search terms.',
    image: shareCard('fiverr-keyword-research', 'Free Fiverr keyword research tool for gig search suggestions'),
  },
  blog: {
    path: '/blog',
    title: `Web Development Blog | ${SITE_NAME}`,
    description: 'Read practical guides on websites, domains, technical SEO, and web performance on the developer blog.',
    image: shareCard('blog', 'Developer blog about websites, domains, and web performance'),
    index: false,
  },
} satisfies Record<string, SeoPage>;

export function pageMetadata(
  { path, title, description, image = portraitCard, index = true }: SeoPage,
  article?: { publishedTime?: string },
): Metadata {
  const url = siteUrl(path);
  const images = [{ ...image, url: siteUrl(image.url) }];
  const social = { title, description, images };

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index, follow: true, ...(index && { 'max-image-preview': 'large' }) },
    openGraph: {
      ...social,
      url,
      siteName: SITE_NAME,
      locale: 'en_US',
      ...(article ? { type: 'article', ...article } : { type: 'website' }),
    },
    twitter: { ...social, card: 'summary_large_image' },
  };
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Full Stack Developer | Custom Web Development Services',
  description:
    'Hire Mamun Miah for custom website development using Next.js, React, and TypeScript. High-performance, mobile-first, SEO-ready websites and SaaS products delivered on time.',
  keywords: [
    'custom website development services',
    'Next.js developer for hire',
    'React website development',
    'high-performance website developer',
    'SEO-ready website development',
    'responsive website design and development',
    'SaaS website development',
    'mobile-first web development',
    'freelance web developer Bangladesh',
  ],
  alternates: {
    canonical: 'https://mamundev.com/website-development',
  },
  openGraph: {
    title: 'Custom Website Development Services | Mamun Miah',
    description:
      'High-performance, SEO-ready websites and web apps built with Next.js. Hire Mamun Miah for your next digital project.',
    url: 'https://mamundev.com/website-development',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Website Development Services | Mamun Miah',
    description:
      'Next.js, React, TypeScript — professional website development for businesses and startups.',
    images: ['/images/og-image.jpg'],
  },
};

export default function WebsiteDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

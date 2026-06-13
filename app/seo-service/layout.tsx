import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technical SEO Services | Core Web Vitals & Speed Optimization',
  description:
    'Technical SEO and performance optimization by Mamun Miah. Core Web Vitals audits, schema markup, sitemap configuration, Next.js speed tuning, and crawlability improvements to rank higher on Google.',
  keywords: [
    'technical SEO services for web apps',
    'Core Web Vitals optimization',
    'Next.js SEO optimization services',
    'website speed optimization freelance',
    'schema markup implementation',
    'Lighthouse score optimization',
    'crawlability improvement service',
    'SEO audit developer',
    'Google ranking optimization',
    'structured data implementation',
    'technical SEO developer Bangladesh',
  ],
  alternates: {
    canonical: 'https://mamundev.com/seo-service',
  },
  openGraph: {
    title: 'Technical SEO & Speed Optimization Services | Mamun Miah',
    description:
      'Core Web Vitals, schema markup, sitemap, and Next.js performance tuning. Get your site ranking on Google.',
    url: 'https://mamundev.com/seo-service',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Technical SEO & Speed Optimization Services | Mamun Miah',
    description:
      'Core Web Vitals optimization, schema markup, Lighthouse 90+ scores, and crawlability improvements.',
    images: ['/images/og-image.jpg'],
  },
};

export default function SeoServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

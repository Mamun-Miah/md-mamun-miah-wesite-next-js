import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Fiverr Keyword Research Tool | Gig SEO & Tag Finder',
  description:
    'Find high-volume, low-competition tags and search queries on Fiverr. Use our 100% free Fiverr Keyword Research Tool to optimize your gigs, find the best tags, and rank first on Fiverr search.',
  keywords: [
    'Fiverr keyword research',
    'Fiverr keyword research tool',
    'Fiverr SEO tool',
    'free Fiverr keyword research tool',
    'Fiverr tag finder',
    'Fiverr gig optimization',
    'Fiverr SEO search tags',
    'how to find keywords for Fiverr',
    'Fiverr search suggestion finder',
    'Fiverr ranking tags',
    'Fiverr SEO service',
  ],
  alternates: {
    canonical: 'https://mamundev.com/fiverr-keyword-research',
  },
  openGraph: {
    title: 'Free Fiverr Keyword Research Tool | Find Low Competition Tags',
    description:
      'Optimize your Fiverr gigs and rank #1 with our free Fiverr Keyword Research Tool. Find low-competition search tags easily.',
    url: 'https://mamundev.com/fiverr-keyword-research',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Fiverr Keyword Research Tool & Gig Tag Finder',
    description:
      'Optimize your Fiverr gigs and rank #1 with our free Fiverr Keyword Research Tool. Find low-competition search tags easily.',
    images: ['/images/og-image.jpg'],
  },
};

export default function FiverrKeywordResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

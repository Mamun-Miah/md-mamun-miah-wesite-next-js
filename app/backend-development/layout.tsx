import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Backend API Development Services | Node.js & PostgreSQL',
  description:
    'Hire Mamun Miah for scalable backend development: RESTful & GraphQL APIs, PostgreSQL, MongoDB, Docker, and cloud deployments. Secure, fast, and production-ready backend systems.',
  keywords: [
    'custom API development services',
    'Node.js backend developer for hire',
    'REST API development freelance',
    'GraphQL API developer',
    'scalable backend architecture',
    'PostgreSQL developer',
    'MongoDB backend developer',
    'backend developer Bangladesh',
    'Docker cloud deployment developer',
    'backend API freelance developer',
  ],
  alternates: {
    canonical: 'https://mamundev.com/backend-development',
  },
  openGraph: {
    title: 'Backend API Development Services | Mamun Miah',
    description:
      'Scalable REST & GraphQL APIs, PostgreSQL/MongoDB, Docker, and CI/CD pipelines. Hire a backend specialist.',
    url: 'https://mamundev.com/backend-development',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Backend API Development Services | Mamun Miah',
    description:
      'Node.js, PostgreSQL, MongoDB, Docker — scalable backend systems for your web application.',
    images: ['/images/og-image.jpg'],
  },
};

export default function BackendDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

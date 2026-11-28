import { pages, PORTRAIT_PATH, PROFILE_LINKS, SITE_NAME, siteUrl, type SeoPage } from './seo';

const context = 'https://schema.org';
export const WEBSITE_ID = siteUrl('/#website');

const personIdentity = {
  '@type': 'Person',
  '@id': siteUrl('/#person'),
  name: SITE_NAME,
  url: siteUrl(pages.about.path),
};

const profileId = `${personIdentity.url}#profile`;
const person = {
  ...personIdentity,
  givenName: 'Mamun',
  familyName: 'Miah',
  jobTitle: 'Full Stack Web Developer & AI Engineer',
  description: pages.about.description,
  image: siteUrl(PORTRAIT_PATH),
  mainEntityOfPage: { '@id': profileId },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Gazipur',
    addressRegion: 'Dhaka',
    addressCountry: 'BD',
  },
  sameAs: Object.values(PROFILE_LINKS),
  knowsAbout: [
    'Full stack web development',
    'Next.js',
    'React',
    'TypeScript',
    'Backend API development',
    'AI and LLM engineering',
    'Retrieval-augmented generation',
    'Technical SEO',
  ],
};

export const websiteSchema = {
  '@context': context,
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: siteUrl(pages.home.path),
  name: SITE_NAME,
  alternateName: 'mamundev.com',
  description: pages.home.description,
  inLanguage: 'en',
  publisher: person,
};

export const profileSchema = {
  '@context': context,
  '@type': 'ProfilePage',
  '@id': profileId,
  url: personIdentity.url,
  name: `About ${SITE_NAME}`,
  description: pages.about.description,
  inLanguage: 'en',
  isPartOf: { '@id': WEBSITE_ID },
  mainEntity: person,
};

export function serviceSchema(page: SeoPage, name: string) {
  const url = siteUrl(page.path);

  return {
    '@context': context,
    '@type': 'Service',
    '@id': `${url}#service`,
    url,
    name,
    description: page.description,
    mainEntityOfPage: url,
    provider: personIdentity,
  };
}

export const keywordToolSchema = {
  '@context': context,
  '@type': 'WebApplication',
  '@id': siteUrl(`${pages.fiverr.path}#tool`),
  url: siteUrl(pages.fiverr.path),
  name: 'Fiverr Keyword Research Tool',
  description: pages.fiverr.description,
  applicationCategory: 'BusinessApplication',
  isAccessibleForFree: true,
  creator: personIdentity,
};

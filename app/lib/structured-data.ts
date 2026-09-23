import { content } from './content';
import { SITE_URL, TELEGRAM_URL } from './config';
import { courses, roadmapStages } from './site-data';

// Schema.org as a single graph: the crawler sees an organization, its website,
// three courses and an FAQ block rather than a bag of text. The data source is
// the same as for the markup (content.ts / site-data.ts), so the two cannot
// drift apart.

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const WEBPAGE_ID = `${SITE_URL}/#webpage`;

// SITE_URL already includes the base path.
const absolute = (file: string) => `${SITE_URL}${file}`;

const organization = {
  '@type': 'EducationalOrganization',
  '@id': ORGANIZATION_ID,
  name: content.brand,
  url: `${SITE_URL}/`,
  logo: absolute('/logo-mark.png'),
  description: content.footer.note,
  sameAs: [TELEGRAM_URL],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    url: TELEGRAM_URL,
    availableLanguage: ['en'],
  },
};

const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: content.brand,
  inLanguage: 'en',
  publisher: { '@id': ORGANIZATION_ID },
};

const webPage = (title: string, description: string) => ({
  '@type': 'WebPage',
  '@id': WEBPAGE_ID,
  url: `${SITE_URL}/`,
  name: title,
  description,
  inLanguage: 'en',
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': ORGANIZATION_ID },
  primaryImageOfPage: absolute('/opengraph-image.png'),
});

// Each level is a separate Course. There is no price in the markup because
// there is none on the page either.
const courseList = {
  '@type': 'ItemList',
  name: content.courses.title,
  itemListElement: courses.map((course, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Course',
      '@id': `${SITE_URL}/#course-${course.tier}`,
      name: course.title,
      description: course.description,
      url: `${SITE_URL}/#courses`,
      inLanguage: 'en',
      provider: { '@id': ORGANIZATION_ID },
      isAccessibleForFree: false,
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        inLanguage: 'en',
      },
    },
  })),
};

// The full program — the roadmap stages, in the order shown on the page.
const syllabus = {
  '@type': 'ItemList',
  name: content.roadmap.title,
  description: content.roadmap.sub,
  itemListElement: roadmapStages.map((stage) => ({
    '@type': 'ListItem',
    position: stage.order,
    name: stage.title,
    description: `${stage.summary} Modules: ${stage.modules.join(', ')}.`,
  })),
};

const faqPage = {
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  name: content.faq.title,
  inLanguage: 'en',
  isPartOf: { '@id': WEBPAGE_ID },
  mainEntity: content.faq.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

export const buildStructuredData = (title: string, description: string) => ({
  '@context': 'https://schema.org',
  '@graph': [organization, website, webPage(title, description), courseList, syllabus, faqPage],
});

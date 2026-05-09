export const siteConfig = {
  name: 'MindBridge',
  tagline: 'A space to talk, a community to belong',
  description: 'Peer-powered mental health support for African university students',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://mindbridge.ac.ke',
  ogImage: '/images/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/mindbridgeke',
    github: 'https://github.com/mindbridge',
    instagram: 'https://instagram.com/mindbridgeke',
  },
  keywords: [
    'mental health',
    'peer support',
    'university students',
    'Kenya',
    'Africa',
    'counselling',
    'anonymous',
    'community',
  ],
  authors: [
    {
      name: 'MindBridge Team',
      url: 'https://mindbridge.ac.ke',
    },
  ],
  creator: 'MindBridge',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    siteName: 'MindBridge',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindBridge',
    description: 'A space to talk, a community to belong',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const brandingConfig = {
  primaryColor: '#0ea5e9',
  accentColor: '#d946ef',
  fontFamily: 'Inter, system-ui, sans-serif',
  logo: {
    text: 'MindBridge',
    icon: '/icons/icon-192.png',
  },
  tone: {
    warm: true,
    nonClinical: true,
    culturallyAware: true,
    stigmaFree: true,
  },
};

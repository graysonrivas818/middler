export const metadata = {
  title: 'Privacy Policy - Middler',
  description: 'Read Middler\'s privacy policy to understand how we collect, use, and protect your personal information when using our paint calculator services.',
  openGraph: {
    siteName: 'Middler',
    title: 'Privacy Policy - Middler',
    description: 'Read Middler\'s privacy policy to understand how we collect, use, and protect your personal information when using our paint calculator services.',
    url: 'https://middler.com/privacy-policy',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy - Middler',
    description: 'Read Middler\'s privacy policy to understand how we collect, use, and protect your personal information when using our paint calculator services.'
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://middler.com/privacy-policy'
  }
};

export default function PrivacyPolicyLayout({ children }) {
  return children;
}
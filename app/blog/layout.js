export const metadata = {
  title: 'Blog - Middler Paint Estimator',
  description: 'Read the latest articles about painting, cost estimation, and home improvement tips from Middler.',
  alternates: {
    canonical: 'https://middler.com/blog'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function BlogLayout({ children }) {
  return (
    <>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Middler Paint Estimator Blog",
            "description": "Latest articles about painting, cost estimation, and home improvement tips",
            "url": "https://middler.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Middler",
              "url": "https://middler.com"
            }
          })
        }}
      />
      {children}
    </>
  );
}
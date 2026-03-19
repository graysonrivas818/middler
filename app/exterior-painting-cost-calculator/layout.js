import Script from 'next/script';

export const metadata = {
  title: 'Exterior Painting Cost Calculator | Fast, Accurate & Simple - Middler',
  description: 'Get fast, accurate estimates with our Exterior Painting Cost Calculator. Find the true cost to paint exterior of house anywhere in the USA, simple & reliable.',
  openGraph: {
    siteName: 'Middler',
    title: 'Exterior Painting Cost Calculator | Fast, Accurate & Simple - Middler',
    type: 'website',
    url: 'https://middler.com/exterior-painting-cost-calculator',
    images: [''], // Placeholder for image
    description: 'Get fast, accurate estimates with our Exterior Painting Cost Calculator. Find the true cost to paint exterior of house anywhere in the USA, simple & reliable.',
  },
  twitter: {
    card: 'summary',
    url: 'https://middler.com/exterior-painting-cost-calculator',
    title: 'Exterior Painting Cost Calculator | Fast, Accurate & Simple - Middler',
    description: 'Get fast, accurate estimates with our Exterior Painting Cost Calculator. Find the true cost to paint exterior of house anywhere in the USA, simple & reliable.',
    images: [''], // Placeholder for image
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://middler.com/exterior-painting-cost-calculator',
  },
};

// Exterior Page Schemas
const exteriorProductSchema = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Exterior Painting Cost Calculator",
  "image": "",
  "description": "Get fast, accurate estimates with our Exterior Painting Cost Calculator. Find the true cost to paint exterior of house anywhere in the USA, simple & reliable",
  "brand": {
    "@type": "Brand",
    "name": "Middler"
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://middler.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Exterior Painting Cost Calculator",
      "item": "https://middler.com/exterior-painting-cost-calculator"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do you calculate exterior painting cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We calculate cost based on home size, number of stories, paint type, wall condition, and the amount of prep work needed. Middler's calculator uses these details to give you a quick and clear estimate."
      }
    },
    {
      "@type": "Question",
      "name": "How much exterior paint for a 2000 square foot house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A 2000 sq ft house usually needs 10–18 gallons of paint, depending on the number of coats, texture of the walls, and paint brand."
      }
    },
    {
      "@type": "Question",
      "name": "How much to paint a 1500 sq ft house exterior near me?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Prices depend on your location, paint quality, and home condition. Use our calculator to get a fast estimate for your area."
      }
    },
    {
      "@type": "Question",
      "name": "Why is exterior house painting so expensive?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Exterior painting takes time, skill, and high-quality materials. It also includes cleaning, repairs, priming, and safety steps. The cost covers labor, paint, tools, and long-lasting protection for your home."
      }
    }
  ]
};

export default function ExteriorLayout({ children }) {
  return (
    <>
      {/* Google Maps API Script for Exterior page */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_ADDRESS_VALIDATION_API_KEY}&libraries=places`}
        strategy="beforeInteractive"
      />
      {/* Schema Scripts */}
      <Script
        id="exterior-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(exteriorProductSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}

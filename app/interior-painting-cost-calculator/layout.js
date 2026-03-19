import Script from 'next/script';

// Interior Page Schemas
const interiorProductSchema = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Interior Painting Cost Calculator",
  "image": "",
  "description": "Use our Interior Painting Cost Calculator to estimate the cost to paint interior of house anywhere in the USA. Get fast, accurate pricing for every room.",
  "brand": {
    "@type": "Brand",
    "name": "Middler"
  }
};

const breadcrumbSchema = {
  "@context": "https://schema.org/",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://middler.com/"
  }, {
    "@type": "ListItem",
    "position": 2,
    "name": "Interior Painting Cost Calculator",
    "item": "https://middler.com/interior-painting-cost-calculator"
  }]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How much should it cost to paint the interior of a 2000 sq ft house?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The cost depends on wall height, number of rooms, and paint type. On average, painting a 2000 sq ft home may range from moderate to higher budgets based on prep work and coats. Using Middler's calculator gives you a closer estimate for your home."
    }
  }, {
    "@type": "Question",
    "name": "How much paint for a 1000 sq ft house interior?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Most 1000 sq ft homes need several gallons for two coats, depending on wall conditions and color changes. Our calculator helps you see how much paint and labor your project may require."
    }
  }, {
    "@type": "Question",
    "name": "How much should I charge to paint a 20x20 room?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "A 20x20 room usually needs multiple gallons of paint and a few hours of labor. The price depends on ceiling height, wall repairs, and coats. Enter your room size in our tool for an exact estimate."
    }
  }, {
    "@type": "Question",
    "name": "How much does it cost to paint a 3 bedroom house interior?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "A 3-bedroom home often ranges widely in price depending on square footage, number of coats, ceiling height, and extra areas like trims and doors. The calculator helps you understand your expected total cost."
    }
  }, {
    "@type": "Question",
    "name": "How much cost to paint a room?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Room painting prices vary based on size and paint type, but our calculator gives you a clear estimate in seconds. You can enter any room size and get an accurate cost range instantly"
    }
  }]
};

export const metadata = {
  title: 'Interior Painting Cost Calculator - Middler',
  description: 'Use our Interior Painting Cost Calculator to estimate the cost to paint interior of house anywhere in the USA. Get fast, accurate pricing for every room.',
  openGraph: {
    siteName: 'Middler',
    title: 'Interior Painting Cost Calculator - Middler',
    description: 'Use our Interior Painting Cost Calculator to estimate the cost to paint interior of house anywhere in the USA. Get fast, accurate pricing for every room.',
    url: 'https://middler.com/interior-painting-cost-calculator',
    type: 'website',
    images: ['']
  },
  twitter: {
    card: 'summary',
    title: 'Interior Painting Cost Calculator - Middler',
    description: 'Use our Interior Painting Cost Calculator to estimate the cost to paint interior of house anywhere in the USA. Get fast, accurate pricing for every room.',
    images: ['']
  },
  alternates: {
    canonical: 'https://middler.com/interior-painting-cost-calculator'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function InteriorLayout({ children }) {
  return (
    <>
      {/* Schema Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(interiorProductSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      
      {/* Google Maps API Script for Interior page */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_ADDRESS_VALIDATION_API_KEY}&libraries=places`}
        strategy="beforeInteractive"
      />
      {children}
    </>
  );
}
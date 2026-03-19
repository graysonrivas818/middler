import Script from 'next/script';

// Get current year and month for dynamic meta tags
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.toLocaleString('default', { month: 'short' });

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
    "name": "Cost to Paint a House",
    "item": "https://middler.com/cost-to-paint-a-house"
  }]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does it cost to paint a house per square foot?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most painting projects range from $1.50 to $4.00 per square foot, depending on whether the work is interior or exterior."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to paint a house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Interior painting usually takes 2–5 days, while exterior painting projects take 3–7 days, depending on weather and home size."
      }
    },
    {
      "@type": "Question",
      "name": "Is it cheaper to paint in winter?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Many contractors offer off-season discounts during winter, especially for interior painting projects."
      }
    },
    {
      "@type": "Question",
      "name": "Does painting a house increase home value?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. A fresh paint job can increase home value by 2–5% and significantly improve curb appeal. Neutral colors and professional finishes provide the highest return on investment."
      }
    },
    {
      "@type": "Question",
      "name": "How do you calculate the cost for painting a house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Measure the paintable area, calculate paint needed by dividing area by coverage, then add paint cost, labor, supplies, and a small buffer for extras."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate is an interior painting cost calculator?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It provides a good estimate but not an exact price. Accuracy depends on measurements, number of coats, paint quality, surface condition, and local labor rates."
      }
    },
    {
      "@type": "Question",
      "name": "What is the average cost to paint the interior of a house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Professional interior painting typically costs between $2 and $6 per square foot, depending on the home's condition, layout, and location."
      }
    },
    {
      "@type": "Question",
      "name": "How do you calculate painting cost per square foot?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Divide the total painting cost, including paint, labor, and supplies, by the total paintable square footage."
      }
    },
    {
      "@type": "Question",
      "name": "How much does it cost to paint the interior of a 2000 square foot house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Painting the interior of a 2000 square foot house typically costs between $4,000 and $12,000, depending on prep work, ceiling height, number of rooms, and paint quality."
      }
    },
    {
      "@type": "Question",
      "name": "How much should it cost to paint the exterior of a 2000 square foot house?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Exterior painting for a 2000 square foot house usually costs between $3,000 and $10,000, depending on siding type, number of stories, and surface preparation."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate is a house painting cost calculator?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A house painting cost calculator is accurate for budgeting and planning, but final costs may vary based on on-site conditions and contractor pricing."
      }
    }
  ]
};

export const metadata = {
  title: `Cost to Paint a House | ${currentYear} Price Per Sq Ft - Middler`,
  description: `Painting a home costs $4.79–$9.04 per sq ft in ${currentMonth} ${currentYear}, depending on options and site conditions. Calculate your interior or exterior cost instantly.`,
  openGraph: {
    siteName: 'Middler',
    title: `Cost to Paint a House | ${currentYear} Price Per Sq Ft - Middler`,
    description: `Painting a home costs $4.79–$9.04 per sq ft in ${currentMonth} ${currentYear}, depending on options and site conditions. Calculate your interior or exterior cost instantly.`,
    url: 'https://middler.com/cost-to-paint-a-house',
    type: 'website',
    images: ['']
  },
  twitter: {
    card: 'summary',
    title: `Cost to Paint a House | ${currentYear} Price Per Sq Ft - Middler`,
    description: `Painting a home costs $4.79–$9.04 per sq ft in ${currentMonth} ${currentYear}, depending on options and site conditions. Calculate your interior or exterior cost instantly.`,
    images: [''],
    url: 'https://middler.com/cost-to-paint-a-house'
  },
  alternates: {
    canonical: 'https://middler.com/cost-to-paint-a-house'
  },
  robots: 'index, follow'
};

export default function CostToPaintAHouseLayout({ children }) {
  return (
    <>
      {/* Schema Scripts */}
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
      
      {/* Google Maps API Script for Cost to Paint a House page */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_ADDRESS_VALIDATION_API_KEY}&libraries=places`}
        strategy="beforeInteractive"
      />
      {children}
    </>
  );
}
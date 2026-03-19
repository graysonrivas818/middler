import PageLayout from "@/components/layouts/PageLayout";
import Script from 'next/script';

// Home Page Product Schema
const homeProductSchema = {
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Paint Cost Estimate Calculator",
  "image": "https://middler.com/images/mobile_mockup2.webp",
  "description": "Plan your painting project with confidence. Middler's paint calculator gives detailed cost estimates for interior & exterior house painting, including paint, material & labor.",
  "brand": {
    "@type": "Brand",
    "name": "Middler"
  }
};

// Home Page FAQ Schema
const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is a Middler Paint Calculator?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Middler is an easy-to-use online paint calculator that helps homeowners and professionals estimate how much paint & cost is needed for interior and exterior painting projects in the USA."
    }
  },{
    "@type": "Question",
    "name": "How does the Middler paint calculator work?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "You simply enter room dimensions, surface type, and number of coats. Middler calculates the estimated cost, approximate amount of paint required, helping reduce waste and extra costs."
    }
  },{
    "@type": "Question",
    "name": "Is Middler free to use?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes, Middler's paint estimator is completely free and available online without registration."
    }
  },{
    "@type": "Question",
    "name": "How accurate is the Middler paint estimator?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The paint calculator provides industry-standard estimates based on average paint coverage. Final requirements may vary depending on surface texture, paint brand, and application method."
    }
  },{
    "@type": "Question",
    "name": "How much does it cost to paint a room?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The cost to paint a room in the USA typically ranges from $300 to $1,000, depending on room size, paint quality, number of coats, and labor costs."
    }
  },{
    "@type": "Question",
    "name": "How much does it cost to paint per square foot?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Using a paint calculator square feet estimate, painting costs typically range from $1.50 to $4.00 per square foot in the USA, including paint and labor. DIY painting costs less, while professional services increase the price"
    }
  },{
    "@type": "Question",
    "name": "How do I calculate the cost of painting a room?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "- Measure wall square footage\n- Choose number of coats\n- Select paint quality\n- Add labor cost (if hiring a painter)\n- Include prep and supplies\nMiddler painting estimate cost automates this process instantly."
    }
  },{
    "@type": "Question",
    "name": "How much does a gallon of paint cost?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "A gallon of paint in the USA typically costs:\n- $20–$40 for basic paint\n- $40–$70 for premium paint\nPrices vary by brand and finish."
    }
  },{
    "@type": "Question",
    "name": "How much does it cost to paint a 12×12 room?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Painting a 12×12 room costs approximately:\n- $250–$450 (DIY)\n- $500–$900 (professional painter)\nCosts depend on ceiling height, coats, and paint type."
    }
  },{
    "@type": "Question",
    "name": "How much does labor cost for painting?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Professional painters usually charge $20–$50 per hour or $1–$3 per sq ft, depending on location and project complexity."
    }
  },{
    "@type": "Question",
    "name": "How much paint do I need and how much will it cost?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "One gallon covers about 350–400 sq ft and costs $20–$70. Multiply gallons needed by paint price to estimate total paint cost."
    }
  },{
    "@type": "Question",
    "name": "Why is my paint cost estimate higher than expected?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Paint costs increase due to:\n- Multiple coats\n- Premium paint\n- Surface repairs\n- High labor rates\n- Exterior or textured surfaces"
    }
  },{
    "@type": "Question",
    "name": "How accurate is a Middler painting Calculations?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "The Middler painting calculations provide close estimates based on average U.S. prices. Final costs may vary by contractor, region, and paint brand."
    }
  },{
    "@type": "Question",
    "name": "Is Middler suitable for professional painters?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes. Contractors and painters can use Middler to quickly estimate paint quantities & costs for client quotes."
    }
  },{
    "@type": "Question",
    "name": "Is Middler optimized for US homes?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes. Middler is designed using US standard measurements and paint coverage norms."
    }
  },{
    "@type": "Question",
    "name": "Can I access Middler on mobile devices?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "Yes. Middler works smoothly on desktops, tablets, and mobile devices."
    }
  }]
};

export const metadata = {
  title: 'Paint Calculator | House Paint Estimate Cost in USA - Middler',
  description: 'Middler\'s paint calculator gives detailed cost estimates for interior & exterior house painting in USA, including paint, material & labor.',
  openGraph: {
    siteName: 'Middler',
    title: 'Paint Calculator | House Paint Estimate Cost in USA - Middler',
    description: 'Middler\'s paint calculator gives detailed cost estimates for interior & exterior house painting in USA, including paint, material & labor.',
    url: 'https://middler.com/',
    type: 'website',
    images: ['https://middler.com/images/mobile_mockup2.webp']
  },
  twitter: {
    card: 'summary',
    title: 'Paint Calculator | House Paint Estimate Cost in USA - Middler',
    description: 'Middler\'s paint calculator gives detailed cost estimates for interior & exterior house painting in USA, including paint, material & labor.',
    images: ['https://middler.com/images/mobile_mockup2.webp']
  },
  alternates: {
    canonical: 'https://middler.com/'
  },
  robots: 'index, follow',
  other: {
    'google-site-verification': 'cXkEsP_rWBJOqS_x8q9XsG3hfwXWJgC9Wvnt93V-PcU'
  }
};

const Home = () => {
  return (
    <>
      <Script
        id="home-product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeProductSchema) }}
      />
      <script
        id="home-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }}
      />
      <PageLayout pageType="home" />
    </>
  );
};

export default Home;

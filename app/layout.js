import { Poppins } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Providers from './Providers';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap', // Optimize font loading
});

// Organization Schema Data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Middler",
  "alternateName": "Middler",
  "url": "https://middler.com/",
  "logo": "https://middler.com/images/logo.webp",
  "sameAs": [
    "https://www.linkedin.com/company/middler/",
    "https://www.instagram.com/middler_com/"
  ]
};

// Home Page Product Schema Data
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>

        <meta name="google-site-verification" content="cXkEsP_rWBJOqS_x8q9XsG3hfwXWJgC9Wvnt93V-PcU" />
        <meta name="google-site-verification" content="f3nKDvsuIi4oBCMJQ5SA08X9o4hG5Hsd-XugfyCAsbU" />



        
        {/* Preload critical resources */}
        <link rel="preload" href="/images/logo.webp" as="image" type="image/webp" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        {/* Schema scripts - optimized loading */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />

      </head>
      <body className={`${poppins.variable} font-sans`}>
        {/* Google Maps API Script - load before interactive for address autocomplete */}
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_ADDRESS_VALIDATION_API_KEY}&libraries=places`}
          strategy="beforeInteractive"
        />
        {/* Optimized Google Analytics - load after page is interactive */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T72TYPR1EE"
          strategy="lazyOnload"
        />
        <Script id="gtag-init" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T72TYPR1EE');
          `}
        </Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

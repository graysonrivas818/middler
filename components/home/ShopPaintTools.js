"use client";

import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const products = [
  {
    title: "Contractor's Case (64 Units) *Microfiber* Free Shipping!",
    price: "319.68",
    priceLabel: "$319.68 USD",
    image: "/images/products/contractors-case-microfiber.png",
    url: "https://www.cornerroller.com/products/contractors-case-64-units",
    alt: "Corner+ Contractor's Case Microfiber paint roller covers 64 units",
  },
  {
    title: '18" Dual Corner Roller Frame',
    price: "24.99",
    priceLabel: "$24.99 USD",
    image: "/images/products/dual-corner-roller-frame.jpg",
    url: "https://www.cornerroller.com/products/18-dual-roller-frame",
    alt: 'Corner+ 18 inch Dual Corner Roller Frame',
  },
  {
    title: `Contractor's Case- Polyester 1/2" Nap (64 Units) *Free Shipping*`,
    price: "287.68",
    priceLabel: "$287.68 USD",
    image: "/images/products/contractors-case-poly-half.jpg",
    url: "https://www.cornerroller.com/products/contractors-case-64-units-free-shipping",
    alt: `Corner+ Contractor's Case Polyester 1/2 inch Nap roller covers 64 units`,
  },
  {
    title: `Contractor's Case- Polyester 3/4" Nap (64 Units) *Free Shipping*`,
    price: "319.68",
    priceLabel: "$319.68 USD",
    image: "/images/products/contractors-case-poly-three-quarter.jpg",
    url: "https://www.cornerroller.com/products/contractors-case-64-units-free-shipping-1",
    alt: `Corner+ Contractor's Case Polyester 3/4 inch Nap roller covers 64 units`,
  },
];

const productListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Shop Painting Tools",
  description:
    "Professional painting tools and supplies from Corner+ Roller for contractors, painters, and DIYers.",
  itemListElement: products.map((product, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Product",
      name: product.title,
      image: `https://middler.com${product.image}`,
      url: product.url,
      brand: {
        "@type": "Brand",
        name: "Corner+ Roller",
      },
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: product.price,
        availability: "https://schema.org/InStock",
        url: product.url,
      },
    },
  })),
};

const ProductCard = ({ product }) => (
  <article className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(39,95,246,0.08)] p-4 lg:p-5 flex flex-col text-center h-full">
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="relative w-full aspect-[4/3] mb-4 rounded-xl overflow-hidden bg-[#f3f5f7]">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          className="object-contain p-3"
          sizes="(max-width: 1024px) 85vw, 25vw"
        />
      </div>
      <h3 className="text-sm lg:text-[15px] font-bold text-[#222] leading-snug min-h-[3.25rem]">
        {product.title}
      </h3>
    </a>

    <p className="mt-2 text-base lg:text-lg font-bold text-primary">
      {product.priceLabel}
    </p>

    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-auto pt-4 inline-flex items-center justify-center gap-2 w-full rounded-xl bg-primary hover:bg-primary-800 text-white text-sm font-semibold py-3 px-4 transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-4"
        aria-hidden="true"
      >
        <path d="M2.25 3a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.577A2.25 2.25 0 0 0 8.694 16.5h8.612a2.25 2.25 0 0 0 2.138-1.645l1.933-7.246A.75.75 0 0 0 20.655 6.5H6.197l-.47-1.76A1.875 1.875 0 0 0 3.886 3H2.25Z" />
        <path d="M8.25 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM17.25 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      </svg>
      View Product
    </a>
  </article>
);

const ShopPaintTools = () => {
  return (
    <section
      id="paint-tools"
      className="relative isolate overflow-hidden bg-[#eef5ff]"
      aria-labelledby="paint-tools-heading"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }}
      />

      {/* Top white wave */}
      <div className="pointer-events-none absolute inset-x-0 top-0 leading-[0]">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="block w-full h-[48px] sm:h-[64px] lg:h-[90px]"
          aria-hidden="true"
        >
          <path
            fill="#ffffff"
            d="M0,0 L1440,0 L1440,40 C1200,90 960,10 720,45 C480,80 240,20 0,55 Z"
          />
        </svg>
      </div>

      {/* Bottom white wave */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 leading-[0] rotate-180">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="block w-full h-[48px] sm:h-[64px] lg:h-[90px]"
          aria-hidden="true"
        >
          <path
            fill="#ffffff"
            d="M0,0 L1440,0 L1440,40 C1200,90 960,10 720,45 C480,80 240,20 0,55 Z"
          />
        </svg>
      </div>

      <div className="relative container pt-16 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24">
        <div className="flex flex-col items-center gap-3 lg:gap-4 mb-8 lg:mb-12 max-w-3xl mx-auto px-4 text-center">
          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-[11px] sm:text-xs font-semibold tracking-[0.08em] uppercase px-4 py-1.5">
            Shop Painting Tools
          </span>

          <h2
            id="paint-tools-heading"
            className="font-bold text-[26px] sm:text-[34px] lg:text-[44px] leading-[1.15] text-[#1a1a1a]"
          >
            Shop the Tools Behind{" "}
            <span className="text-primary">Better Paint Jobs</span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-[#5b6472] leading-relaxed max-w-2xl">
            Professional painting tools and supplies trusted by contractors,
            painters, and DIYers. Get the right tools for the job, all in one
            place.
          </p>
        </div>

        {/* Mobile / tablet slider */}
        <div className="lg:hidden px-4 pb-2 shop-paint-tools-swiper">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1.15}
            spaceBetween={16}
            centeredSlides
            pagination={{ clickable: true }}
            breakpoints={{
              480: {
                slidesPerView: 1.35,
                spaceBetween: 18,
              },
              640: {
                slidesPerView: 1.6,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2.1,
                spaceBetween: 20,
                centeredSlides: false,
              },
            }}
            className="!pb-10"
          >
            {products.map((product) => (
              <SwiperSlide key={product.url} className="!h-auto">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop grid */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.url} product={product} />
          ))}
        </div>

        <div className="mt-8 lg:mt-10 flex justify-center px-4">
          <a
            href="https://www.cornerroller.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white font-semibold text-sm lg:text-base px-8 py-3 transition-colors shadow-sm"
          >
            View All Products
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <style jsx global>{`
        .shop-paint-tools-swiper .swiper-pagination-bullet {
          background: #275ff6;
          opacity: 0.25;
        }
        .shop-paint-tools-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default ShopPaintTools;

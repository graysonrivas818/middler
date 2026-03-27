'use client';

import { estimateCards } from "@/app/constants";
import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Image from "next/image";

const Estimate = ({ pageType }) => {
  const [smallSize, setSmallSize] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const isSmallScreen = window.innerWidth < 992;
        setSmallSize(isSmallScreen ? true : false);
        setIsMobile(window.innerWidth < 768);
      }
    };

    handleResize();
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  // Content for costToPaintHouse page
  if (pageType === 'costToPaintHouse') {
    const paintingCosts = [
      { type: "Interior only", cost: "$1,500 – $4,500" },
      { type: "Exterior only", cost: "$2,000 – $6,500" },
      { type: "Interior + Exterior", cost: "$3,500 – $9,000" },
      { type: "Cost per square foot", cost: "$1.50 – $4.00" }
    ];

    const squareFootageCosts = [
      { size: "1,000 sq ft", interior: "$1,000 – $3,000", exterior: "$1,800 – $3,500" },
      { size: "1,500 sq ft", interior: "$1,500 – $4,000", exterior: "$2,200 – $4,800" },
      { size: "2,000 sq ft", interior: "$2,000 – $5,500", exterior: "$2,800 – $6,500" },
      { size: "3,000 sq ft", interior: "$3,000 – $7,500", exterior: "$4,000 – $9,000" }
    ];

    return (
      <>
        {/* First Table - Project Types */}
        <section className="relative pt-16 lg:py-10 order-2" style={{ paddingTop: isMobile ? '10px' : undefined }}>
          <div className="container">
            <div className="row">
              <div className="w-full">
                <div className="px-3 lg:px-5 py-10 flex flex-col items-center justify-center gap-[50px]">
                  <Heading
                    heading="How Much Will My Painting Project Cost?"
                    highlight="How Much Will"
                    preheading="estimate"
                  />
                  <p className="text-sm lg:text-xl text-center max-w-3xl">
                    Here's a quick look at national average painting costs:
                  </p>
                  
                  {/* Pricing Table */}
                  <div className="w-full max-w-4xl">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      {/* Table Header */}
                      <div className="grid grid-cols-2 bg-primary text-white font-semibold text-sm lg:text-lg">
                        <div className="p-4 lg:p-6 border-r border-white/20">Project Type</div>
                        <div className="p-4 lg:p-6">Average Cost</div>
                      </div>
                      
                      {/* Table Rows */}
                      {paintingCosts.map((item, idx) => (
                        <div key={idx} className={`grid grid-cols-2 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-200 last:border-b-0`}>
                          <div className="p-4 lg:p-6 border-r border-gray-200 font-medium text-sm lg:text-base">
                            {item.type}
                          </div>
                          <div className="p-4 lg:p-6 font-semibold text-primary text-sm lg:text-base">
                            {item.cost}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-sm lg:text-lg text-center text-gray-600 max-w-3xl">
                    Prices vary based on location, paint quality, surface condition, and labor rates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Second Table - Square Footage */}
        <section className="relative py-10 order-3">
          <div className="container">
            <div className="row">
              <div className="w-full">
                <div className="px-3 lg:px-5 py-10 flex flex-col items-center justify-center gap-[50px]">
                  <Heading
                    heading="Cost to Paint a House by Square Footage"
                    highlight="Cost to Paint a House"
                    preheading="pricing"
                  />
                  <p className="text-sm lg:text-xl text-center max-w-3xl">
                    Many painters price projects based on square footage.
                  </p>
                  
                  {/* Square Footage Pricing Table */}
                  <div className="w-full max-w-4xl">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                      {/* Table Header */}
                      <div className="grid grid-cols-3 bg-primary text-white font-semibold text-sm lg:text-lg">
                        <div className="p-4 lg:p-6 border-r border-white/20">Home Size</div>
                        <div className="p-4 lg:p-6 border-r border-white/20">Interior Cost</div>
                        <div className="p-4 lg:p-6">Exterior Cost</div>
                      </div>
                      
                      {/* Table Rows */}
                      {squareFootageCosts.map((item, idx) => (
                        <div key={idx} className={`grid grid-cols-3 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-200 last:border-b-0`}>
                          <div className="p-4 lg:p-6 border-r border-gray-200 font-medium text-sm lg:text-base">
                            {item.size}
                          </div>
                          <div className="p-4 lg:p-6 border-r border-gray-200 font-semibold text-primary text-sm lg:text-base">
                            {item.interior}
                          </div>
                          <div className="p-4 lg:p-6 font-semibold text-primary text-sm lg:text-base">
                            {item.exterior}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-sm lg:text-lg text-center text-gray-600 max-w-3xl">
                    These estimates include labor and standard materials but may increase for specialty finishes or heavy prep work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Alt tags for the background images
  const backgroundImageAlts = [
    "Interior house paint cost Estimate",
    "Cabinet paint cost estimate", 
    "Exterior house paint cost Estimate",
    "House paint estimate cost"
  ];

  return (
    <section className="relative pt-16 lg:py-10 order-2" style={{ paddingTop: isMobile ? '10px' : undefined }}>
      <div className="container">
        <div className="row">
          <div className="w-full">
            <div className="px-3 lg:px-5 py-10 flex flex-col items-center justify-center gap-[50px]">
              <Heading
                heading={smallSize ? "Answer a few questions and in 30 seconds, this is exactly what you'll see." : "Answer a few questions and in 30 seconds, this is exactly what you'll see."}
                highlight="Answer"
                preheading="estimate"
              />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 w-full">
                {estimateCards.map((card, idx) => (
                  <div
                    key={idx}
                    className={`rounded-xl px-3 py-6 lg:py-2.5 min-h-[150px] lg:min-h-[145px] h-full ${card.active
                      ? "bg-primary text-white grd_shdow border border-white"
                      : "bg-primary/10 border-[.5px] border-primary/50"
                      } relative flex flex-col justify-between items-center max-lg:text-center lg:items-start overflow-hidden`}
                  >
                    {/* Background Image using Next.js Image component */}
                    <Image
                      src={`/images/elements/${smallSize ? `1_${idx + 1}` : idx + 1}.webp`}
                      alt={backgroundImageAlts[idx]}
                      fill
                      className="object-cover object-center z-0"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                    />
                    
                    {/* Icon Image */}
                    <span className="relative z-10">
                      <Image
                        src={`/images/icons/${idx + 1}.webp`}
                        alt={backgroundImageAlts[idx]}
                        width={40}
                        height={40}
                        className="size-10"
                      />
                    </span>
                    
                    <div className="pb-2 relative z-10">
                      <span className="capitalize text-[11px] tracking-[1px] block mb-1.5">
                        {card.title}
                      </span>
                      <h3 className="font-semibold text-[26px] lg:text-[40px] leading-none">
                        {card.desc}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Estimate;

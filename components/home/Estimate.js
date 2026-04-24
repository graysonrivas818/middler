'use client';

import { estimateCards } from "@/app/constants";
import { pageContent } from "@/app/constants/pageContent";
import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Image from "next/image";

const Estimate = ({ pageType, content: contentOverride = null }) => {
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
  const content = contentOverride || pageContent[pageType];
  const estimateContent = content?.estimate;

  if (content?.layoutVariant === 'costToPaintHouse' && estimateContent) {
    const table1Headers = estimateContent.table1Headers || ["Project Type", "Average Cost"];
    const table2Headers = estimateContent.table2Headers || ["Home Size", "Interior Cost", "Exterior Cost"];

    const renderTable = (headers, rows) => (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div
          className="bg-primary text-white font-semibold text-sm lg:text-lg"
          style={{ display: 'grid', gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}
        >
          {headers.map((header, index) => (
            <div key={`${header}-${index}`} className={`p-4 lg:p-6 ${index < headers.length - 1 ? 'border-r border-white/20' : ''}`}>
              {header}
            </div>
          ))}
        </div>

        {rows.map((row, idx) => {
          const cells = Array.isArray(row)
            ? row
            : Object.values(row).filter((value) => value !== undefined);

          return (
            <div
              key={idx}
              className={`${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-200 last:border-b-0`}
              style={{ display: 'grid', gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))` }}
            >
              {cells.map((cell, cellIndex) => (
                <div
                  key={`${idx}-${cellIndex}`}
                  className={`p-4 lg:p-6 text-sm lg:text-base ${cellIndex === 0 ? 'font-medium' : 'font-semibold text-primary'} ${cellIndex < cells.length - 1 ? 'border-r border-gray-200' : ''}`}
                >
                  {cell}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );

    return (
      <>
        {/* First Table - Project Types */}
        <section className="relative pt-16 lg:py-10 order-2" style={{ paddingTop: isMobile ? '10px' : undefined }}>
          <div className="container">
            <div className="row">
              <div className="w-full">
                <div className="px-3 lg:px-5 py-10 flex flex-col items-center justify-center gap-[50px]">
                  <Heading
                    heading={estimateContent.heading}
                    highlight={estimateContent.headingHighlight}
                    preheading={estimateContent.preheading}
                  />
                  <p className="text-sm lg:text-xl text-center max-w-3xl">
                    {estimateContent.description}
                  </p>
                  
                  {/* Pricing Table */}
                  <div className="w-full max-w-4xl">
                    {renderTable(table1Headers, estimateContent.table1Rows)}
                  </div>
                  
                  <p className="text-sm lg:text-lg text-center text-gray-600 max-w-3xl">
                    {estimateContent.footer}
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
                    heading={estimateContent.table2Heading}
                    highlight={estimateContent.table2Highlight}
                    preheading={estimateContent.table2Preheading}
                  />
                  <p className="text-sm lg:text-xl text-center max-w-3xl">
                    {estimateContent.table2Description}
                  </p>
                  
                  {/* Square Footage Pricing Table */}
                  <div className="w-full max-w-4xl">
                    {renderTable(table2Headers, estimateContent.table2Rows)}
                  </div>
                  
                  <p className="text-sm lg:text-lg text-center text-gray-600 max-w-3xl">
                    {estimateContent.table2Footer}
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

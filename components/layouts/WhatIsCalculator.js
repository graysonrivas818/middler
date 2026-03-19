'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

const WhatIsCalculator = ({ content }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
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

  if (!content) return null;

  return (
    <section className="px-5 lg:px-10 pb-20 lg:pt-20 mt-60-px">
      <div className="container">
        <div className="row">
          <div className="w-full">
            <div className="flex flex-col-reverse max-lg:gap-y-10 lg:gap-x-20 lg:flex-row text-center lg:text-left items-start justify-between">
              <div className="lg:sticky lg:top-20 flex-shrink-0">
                <Image
                  src={content.image || "/images/mobile.webp"}
                  alt="Mobile illustration"
                  width={340}
                  height={340}
                  className="w-full max-w-[340px] lg:w-[340px] h-auto"
                />
              </div>
              <div className="w-full max-w-[800px] flex-col flex gap-10">
                <h2 className="font-bold text-2xl lg:text-[50px]">
                  <span className="text-primary">{content.headingHighlight} </span> {content.heading.replace(content.headingHighlight, '').trim()}
                </h2>
                <p className="text-sm lg:text-2xl text-left">
                  {content.description}
                </p>
                
                {/* DIY Pros and Cons section */}
                {content.diyPros && content.diyCons && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* DIY Pros */}
                    <div className="flex flex-col gap-3 p-4 lg:p-6 rounded-lg shadow-sm bg-green-50 border border-green-200">
                      <h4 className="font-bold text-sm lg:text-lg leading-tight text-green-800">
                        <span className="text-primary">DIY</span> Pros
                      </h4>
                      <ul className="space-y-2">
                        {content.diyPros.map((pro, idx) => (
                          <li key={idx} className="text-xs lg:text-base text-left leading-relaxed flex items-start gap-2">
                            <span className="text-green-600 mt-1 flex-shrink-0">•</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* DIY Cons */}
                    <div className="flex flex-col gap-3 p-4 lg:p-6 rounded-lg shadow-sm bg-red-50 border border-red-200">
                      <h4 className="font-bold text-sm lg:text-lg leading-tight text-red-800">
                        <span className="text-primary">DIY</span> Cons
                      </h4>
                      <ul className="space-y-2">
                        {content.diyCons.map((con, idx) => (
                          <li key={idx} className="text-xs lg:text-base text-left leading-relaxed flex items-start gap-2">
                            <span className="text-red-600 mt-1 flex-shrink-0">•</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                
                {/* Factors section */}
                {content.factors && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {content.factors.map((factor, idx) => {
                      const titleWords = factor.title.replace(':', '').split(' ');
                      const lastWord = titleWords[titleWords.length - 1];
                      const firstPart = titleWords.slice(0, -1).join(' ');
                      
                      return (
                        <div key={idx} className={`flex flex-col gap-3 p-4 lg:p-6 rounded-lg shadow-sm bg-white h-full min-h-[140px] ${idx === content.factors.length - 1 && content.factors.length % 2 === 1 ? 'md:col-span-2 md:max-w-md md:mx-auto' : ''}`}>
                          <h4 className="font-bold text-sm lg:text-lg leading-tight">
                            {firstPart} <span className="text-primary">{lastWord}:</span>
                          </h4>
                          <p className="text-xs lg:text-base text-left leading-relaxed flex-grow">
                            {factor.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                <p className="text-sm lg:text-2xl text-left">
                  {content.description2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsCalculator;


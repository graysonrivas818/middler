'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

const CalculateRoomCost = ({ content }) => {
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
    <section className="px-5 lg:px-10 pb-20 lg:pt-20">
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
                
                {/* Interior vs Exterior sections */}
                {content.interiorSection && content.exteriorSection ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Interior Section */}
                    <div className="flex flex-col gap-4 p-4 lg:p-6 rounded-lg shadow-sm bg-blue-50 border border-blue-200">
                      <h4 className="font-bold text-lg lg:text-xl text-blue-800">
                        {content.interiorSection.title}
                      </h4>
                      <p className="text-sm lg:text-base text-left">
                        {content.interiorSection.description}
                      </p>
                      <ul className="space-y-2">
                        {content.interiorSection.points.map((point, idx) => (
                          <li key={idx} className="text-sm lg:text-base text-left flex items-start gap-2">
                            <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm lg:text-base font-semibold text-blue-800">
                        {content.interiorSection.costRange}
                      </p>
                    </div>
                    
                    {/* Exterior Section */}
                    <div className="flex flex-col gap-4 p-4 lg:p-6 rounded-lg shadow-sm bg-orange-50 border border-orange-200">
                      <h4 className="font-bold text-lg lg:text-xl text-orange-800">
                        {content.exteriorSection.title}
                      </h4>
                      <p className="text-sm lg:text-base text-left">
                        {content.exteriorSection.description}
                      </p>
                      <ul className="space-y-2">
                        {content.exteriorSection.points.map((point, idx) => (
                          <li key={idx} className="text-sm lg:text-base text-left flex items-start gap-2">
                            <span className="text-orange-600 mt-1 flex-shrink-0">•</span>
                            {point}
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm lg:text-base font-semibold text-orange-800">
                        {content.exteriorSection.costRange}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm lg:text-2xl text-left">
                    {content.description2}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculateRoomCost;


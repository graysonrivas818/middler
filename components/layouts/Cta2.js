'use client';
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import { pageContent } from "@/app/constants/pageContent";

const ctaPoints = [
  "Lightning-fast estimates",
  "Data-driven accuracy",
  "Professional, branded reports",
  "Built for Painting Pros",
];

const Cta2 = ({ pageType = "home" }) => {
  const content = pageContent[pageType] || pageContent.home;
  const startEstimate = content.startEstimate;
  const benefits = content.benefits;
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

  return (
    <section className="px-5 lg:px-10 pb-20 lg:pt-20">
      <div className="container">
        <div className="row">
          <div className="w-full">
            <div className="flex flex-col-reverse  max-lg:gap-y-10 lg:gap-x-20 lg:flex-row text-center lg:text-left items-center justify-between">
              <Image
                src="/images/mobile.webp"
                alt="Mobile illustration"
                width={340}
                height={340}
                className="lg:w-[340px]"
              />
              <div className="w-full max-w-[800px] flex-col flex gap-10">
                {benefits ? (
                  <>
                    <h2 className="font-bold text-2xl lg:text-[50px]">
                      <span className="text-primary">{benefits.headingHighlight} </span> {benefits.heading.replace(benefits.headingHighlight, '').trim()}
                    </h2>
                    <p className="text-sm lg:text-2xl text-left">
                      {benefits.description}
                    </p>
                    <div className={`grid gap-2.5 lg:gap-5 py-2.5 max-lg:text-left ${
                      pageType === 'costToPaintHouse' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
                    }`}>
                      {benefits.points.map((point, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-[7.5px]"
                        >
                          <span className="bg-primary flex items-center justify-center text-white border border-primary rounded-full size-[18px] text-[8px] flex-shrink-0">
                            <FaCheck />
                          </span>
                          <p className="text-xs lg:text-lg">{point}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm lg:text-2xl text-left" dangerouslySetInnerHTML={{ __html: benefits.closingText }}>
                    </p>
                  </>
                ) : startEstimate ? (
                  <>
                    <h2 className="font-bold text-2xl lg:text-[50px]">
                      <span className="text-primary">{startEstimate.heading.split(' ')[0]}</span> {startEstimate.heading.split(' ').slice(1).join(' ')}
                    </h2>
                    <p className="text-sm lg:text-2xl text-left">
                      {startEstimate.description}
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="font-bold text-2xl lg:text-[50px]">
                      <span className="text-primary">Ready</span> {smallSize ? "Ready to Win More Jobs—Faster?" : "to Make Smarter Project Decisions—Faster?"}
                    </h2>
                    <p className="text-sm lg:text-2xl text-left">
                      {smallSize ? "Level up your next home project with Middler, the smart estimating tool built for everyone. Whether you're planning interiors, exteriors, or full renovations, Middler helps you create fast, accurate, and professional estimates—every single time." : "Level up your next home project with Middler, the smart estimating tool built for everyone. Whether you're planning interiors, exteriors, or full renovations, Middler helps you create fast, accurate, and professional estimates—every single time."}
                    </p>
                    <h3 className="font-bold text-2xl lg:text-[30px]" style={{
                      fontSize: isMobile ? '20px' : '',
                      fontWeight: isMobile ? '600' : '',
                      textAlign: isMobile ? 'left' : ''
                    }}>
                      Get <span className="text-primary">Smarter & faster </span>
                      Painting Estimates
                    </h3>
                    {!smallSize && <p className="text-[11px] lg:text-2xl">
                      No spreadsheets. No rough guesses. Just the painting cost calculator built for speed, accuracy, and trust.
                    </p>}
                    <div className="flex max-lg:text-left flex-col gap-2.5 lg:gap-5 py-2.5">
                      {[...Array(2)].map((_, colIdx) => {
                        const chunk = ctaPoints.slice(colIdx * 2, colIdx * 2 + 2);
                        return (
                          <ul
                            key={colIdx}
                            className="flex flex-col max-lg:gap-2.5 lg:flex-row lg:items-center justify-between"
                          >
                            {chunk.map((review, idx) => (
                              <li
                                key={idx}
                                className="flex items-center gap-[7.5px] min-w-60"
                              >
                                <span className="bg-primary flex items-center justify-center text-white border border-primary rounded-full size-[18px] text-[8px]">
                                  <FaCheck />
                                </span>
                                <p className="text-xs lg:text-lg">{review}</p>
                              </li>
                            ))}
                          </ul>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta2;
"use client";
import { useEffect, useState } from "react";
import GoogleRevs from "../ui/GoogleRevs";
import Heading from "../ui/Heading";
import Image from "next/image";
import { pageContent } from "@/app/constants/pageContent";

const Cta = ({ pageType = "home" }) => {
  const [awardsImg, setAwardsImg] = useState("/images/elements/exl.webp");
  const content = pageContent[pageType] || pageContent.home;
  const ctaContent = content.cta;

  const awards = [
    `Home Owners <br/> & Diyer`,
    `Real estate & <br/> Property managers`,
    `paint <br/> contractors`,
    `interior <br/> designers`,
  ];

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 992;
      setAwardsImg(
        isSmallScreen ? "/images/elements/exl2.webp" : "/images/elements/exl.webp"
      );
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="lg:py-20">
      <div className="container">
        <div className="row justify-center">
          <div className="w-full">
            <div className="flex flex-col lg:gap-7 max-lg:*:px-5 py-10 lg:py-[60px] items-center text-center bg-[#0b0b0b]/10 rounded-3xl lg:rounded-[40px] lg:*:px-[130px] lg:*:py-5 *:w-full">
              <div className="relative w-full flex items-center justify-center lg:py-3! max-lg:mb-10">
                <Image
                  src="/images/logo.webp"
                  alt="Company logo"
                  width={320}
                  height={150}
                  className="w-[160px] lg:w-[320px] relative z-[1] inline-block"
                />
                <Image
                  src="/images/logo.webp"
                  alt="Company logo background faded"
                  width={700}
                  height={150}
                  className="absolute inset-0 m-auto w-full max-w-[300px] lg:max-w-[700px] lg:h-[150px] object-contain opacity-15"
                />
              </div>
              <div className="pb-0!">
                <Heading
                  oh
                  heading={ctaContent ? ctaContent.heading : "Why Middler Certifies Estimates!"}
                  highlight={ctaContent ? ctaContent.headingHighlight : "Certifies"}
                  className="text-xl font-semibold!"
                />
                <p className="text-[11px] lg:text-[22px] mt-3 max-lg:mb-[35px] lg:mt-5">
                  {ctaContent ? ctaContent.description : "Because people will always doubt contractor pricing until a trusted platform like Middler starts certifying estimates. That's what we do — for painters, plumbers, and everyone else."}
                </p>
              </div>
              {ctaContent ? (
                <>
                  <div className="lg:pt-0!">
                    <p className="font-semibold text-[11px] lg:text-[22px] mb-4">
                      {ctaContent.subHeading}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                      <ul className="text-[11px] lg:text-[22px] text-left space-y-2">
                        {ctaContent.factors.slice(0, 3).map((factor, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>{factor}</span>
                          </li>
                        ))}
                      </ul>
                      <ul className="text-[11px] lg:text-[22px] text-left space-y-2">
                        {ctaContent.factors.slice(3, 6).map((factor, idx) => (
                          <li key={idx + 3} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>{factor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="lg:pt-0! mt-4">
                    <p className="font-medium text-[11px] lg:text-[22px]">
                      {ctaContent.closingText}
                    </p>
                  </div>
                </>
              ) : (
                <div className="lg:pt-0!">
                  <p className="font-medium text-[11px] lg:text-[22px]">
                    "Middler's prices are not for painters that are trying to rip
                    people off and not for customers who want to underpay
                    painters. The seal stands by that."
                  </p>
                </div>
              )}
              <div className="grid grid-cols-2 max-lg:px-0! lg:grid-cols-4 gap-y-10 gap-x-0 lg:gap-x-[25px] mt-10 lg:mt-0 lg:px-3! py-0!">
                {awards.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center flex-col text-center"
                  >
                    <Image
                      src={awardsImg}
                      alt={item}
                      width={200}
                      height={200}
                      className="w-[120px] lg:w-[200px]"
                    />
                    <div
                      className="text-primary-800 font-medium uppercase text-sm lg:text-xl py-[5px] lg:py-[7px] relative after:absolute after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-[108px] lg:after:w-[48%] after:bottom-0 after:bg-gradient-to-b after:from-primary after:to-primary-900"
                      dangerouslySetInnerHTML={{ __html: item }}
                    />
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

export default Cta;

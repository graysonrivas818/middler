'use client';
import { FaCheck } from "react-icons/fa";
import Image from "next/image";

const Benefits = ({ content }) => {
  if (!content) return null;

  return (
    <section className="px-5 lg:px-10 pb-20 lg:pt-20">
      <div className="container">
        <div className="row">
          <div className="w-full">
            <div className="flex flex-col-reverse  max-lg:gap-y-10 lg:gap-x-20 lg:flex-row text-center lg:text-left items-start justify-between">
              <div className="lg:sticky lg:top-20 flex-shrink-0">
                <Image
                  src="/images/mobile.webp"
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 py-2.5 max-lg:text-left">
                  {content.points.map((point, idx) => {
                    const parts = point.split(':');
                    const heading = parts[0];
                    const description = parts[1];
                    const headingWords = heading.split(' ');
                    const lastWord = headingWords[headingWords.length - 1];
                    const firstPart = headingWords.slice(0, -1).join(' ');
                    
                    return (
                      <div key={idx} className="flex flex-col gap-2 p-4 lg:p-6 rounded-lg shadow-md bg-white h-full min-h-[120px] lg:min-h-[140px]">
                        <h4 className="font-bold text-sm lg:text-lg leading-tight">
                          {firstPart} <span className="text-primary">{lastWord}</span>
                        </h4>
                        <p className="text-xs lg:text-base leading-relaxed flex-grow">{description}</p>
                      </div>
                    );
                  })}
                </div>
                <p className="text-sm lg:text-2xl text-left">
                  {content.closingText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
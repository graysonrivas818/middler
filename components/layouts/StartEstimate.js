'use client';
import Heading from "../ui/Heading";
import Link from "next/link";

const StartEstimate = ({ content }) => {
  if (!content) return null;

  return (
    <section className="py-16 lg:py-20">
      <div className="container">
        <div className="row justify-center">
          <div className="w-full max-w-4xl">
            <div className="flex flex-col items-center text-center gap-8 px-5">
              <Heading
                oh={true}
                heading={content.heading}
                highlight={content.headingHighlight}
                className="text-[26px] lg:text-4xl"
              />
              <p className="text-base lg:text-xl leading-relaxed text-gray-700 max-w-3xl">
                {content.description}
              </p>
              {content.ctaButton && (
                <Link 
                  href={content.ctaButton.url}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-primary hover:bg-primary-700 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  {content.ctaButton.text}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartEstimate;


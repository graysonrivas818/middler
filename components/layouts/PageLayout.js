"use client";
import dynamic from "next/dynamic";
import { useEffect, useState, Suspense } from "react";
import Header from "@/components/layouts/Header";
import Hero from "@/components/layouts/Hero";
import { pageContent } from "@/app/constants/pageContent";

// Non-critical components (lazy loaded)
const Brands = dynamic(() => import("@/components/home/Brands"), {
  loading: () => <div className="h-32 bg-gray-100 animate-pulse" />,
});

const Estimate = dynamic(() => import("@/components/home/Estimate"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
});

const TextSlider = dynamic(() => import("@/components/layouts/TextSlider"), {
  loading: () => <div className="h-20 bg-gradient-to-br from-primary-800 to-primary animate-pulse" />,
});

const GetStarted = dynamic(() => import("@/components/layouts/GetStarted"), {
  loading: () => <div className="h-32 bg-gray-100 animate-pulse" />,
});

const Cta = dynamic(() => import("@/components/layouts/Cta"), {
  loading: () => <div className="h-40 bg-gray-100 animate-pulse" />,
});

const OurProcess = dynamic(() => import("@/components/home/OurProcess"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
});

const WhoUseMiddler = dynamic(() => import("@/components/home/WhoUseMiddler"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
});

const Cta2 = dynamic(() => import("@/components/layouts/Cta2"), {
  loading: () => <div className="h-40 bg-gray-100 animate-pulse" />,
});

const WhatIsCalculator = dynamic(() => import("@/components/layouts/WhatIsCalculator"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
});

const CalculateRoomCost = dynamic(() => import("@/components/layouts/CalculateRoomCost"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
});

const StartEstimate = dynamic(() => import("@/components/layouts/StartEstimate"), {
  loading: () => <div className="h-40 bg-gray-100 animate-pulse" />,
});

const Footer = dynamic(() => import("@/components/layouts/Footer"), {
  loading: () => <div className="h-64 bg-gray-900 animate-pulse" />,
});

const Benefits = dynamic(() => import("@/components/layouts/Benefits"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
});

const Faq = dynamic(() => import("@/components/layouts/Faq"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
});

// Heavy modal components (only load when needed)
const GiftPopup = dynamic(() => import("@/components/modals/GiftPopup"));
const OpenPopup = dynamic(() => import("@/components/ui/OpenPopup"));
const ToastProvider = dynamic(() => import("@/components/ToastProvider"));

const PageLayout = ({ pageType = "home" }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Get content for this page type
  const content = pageContent[pageType] || pageContent.home;

  // Optimized useEffect - defer sessionStorage access
  useEffect(() => {
    // Use setTimeout to defer non-critical operations
    const timer = setTimeout(() => {
      setIsClient(true);
      try {
        const saved = sessionStorage.getItem("noEmailEntered");
        if (saved) {
          setShowPopUp(saved);
          sessionStorage.removeItem("noEmailEntered");
        }
      } catch (error) {
        console.warn("SessionStorage access failed:", error);
      }
    }, 100); // Small delay to prevent blocking

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Critical above-the-fold content */}
      <Header />

      {/* Conditional popup - only render when needed */}
      {isClient && showPopUp && (
        <Suspense fallback={null}>
          <GiftPopup
            showPopUp={showPopUp}
            setShowPopUp={setShowPopUp}
            isMainPage={true}
          />
        </Suspense>
      )}

      <main>
        {/* Critical content first */}
        {content.showHero !== false && (
          <Hero 
            title={content.hero.title}
            titleHighlight={content.hero.titleHighlight}
            description={content.hero.description}
            hideAddressForm={content.hideHeroAddressForm || false}
            hideStats={content.hideHeroStats || false}
            heroImage={content.hero.heroImage || "/images/hero_img.webp"}
            pageType={pageType}
          />
        )}
        
        {/* OurProcess Section - moved to second position for exterior page */}
        {pageType === "exterior" && (
          <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
            <OurProcess pageType={pageType} />
          </Suspense>
        )}
        
        {/* What Is Calculator Section - for interior page, but not for costToPaintHouse */}
        {content.whatIsCalculator && pageType !== "costToPaintHouse" && (
          <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
            <WhatIsCalculator content={content.whatIsCalculator} />
          </Suspense>
        )}
        
        {/* Below-the-fold content with lazy loading */}
        <div className="flex flex-col">
          {(content.showEstimate !== false && pageType !== 'costToPaintHouse') && (
            <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
              <Estimate />
            </Suspense>
          )}
          {pageType === 'costToPaintHouse' && (
            <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
              <Estimate pageType={pageType} />
            </Suspense>
          )}
          <Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse" />}>
            <Brands hideStats={content.hideHeroStats || false} />
          </Suspense>
        </div>
        
        {content.showTextSlider !== false && (
          <Suspense fallback={<div className="h-20 bg-gradient-to-br from-primary-800 to-primary animate-pulse" />}>
            <TextSlider text={content.textSlider.text} />
          </Suspense>
        )}
        
        {content.showGetStarted !== false && (
          <Suspense fallback={<div className="h-32 bg-gray-100 animate-pulse" />}>
            <GetStarted 
              heading={content.getStarted.heading}
              headingHighlight={content.getStarted.headingHighlight}
              preheading={content.getStarted.preheading}
              description={content.getStarted.description}
            />
          </Suspense>
        )}
        
        {pageType !== "exterior" && pageType !== "costToPaintHouse" && (
          <Suspense fallback={<div className="h-40 bg-gray-100 animate-pulse" />}>
            <Cta pageType={pageType} />
          </Suspense>
        )}
        
        {/* OurProcess Section - for non-exterior pages */}
        {pageType !== "exterior" && pageType !== "costToPaintHouse" && (
          <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
            <OurProcess pageType={pageType} />
          </Suspense>
        )}
        
        {/* Calculate Room Cost Section - for interior page */}
        {content.calculateRoomCost && pageType !== "exterior" && (
          <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
            <CalculateRoomCost content={content.calculateRoomCost} />
          </Suspense>
        )}
        
        <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
          <WhoUseMiddler pageType={pageType} />
        </Suspense>
        
        {content.showFaq && (
          <>
            {/* Benefits section for exterior page, Cta2 for others */}
            {pageType === "exterior" && content.benefits ? (
              <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
                <Benefits content={content.benefits} />
              </Suspense>
            ) : (
              <Suspense fallback={<div className="h-40 bg-gray-100 animate-pulse" />}>
                <Cta2 pageType={pageType} />
              </Suspense>
            )}
            {/* WhatIsCalculator for costToPaintHouse - after StartEstimate */}
            {content.whatIsCalculator && pageType === "costToPaintHouse" && (
              <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
                <WhatIsCalculator content={content.whatIsCalculator} />
              </Suspense>
            )}
            {content.startEstimate && pageType !== "exterior" && (
              <Suspense fallback={<div className="h-40 bg-gray-100 animate-pulse" />}>
                <StartEstimate content={content.startEstimate} />
              </Suspense>
            )}
            <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
              <Faq type={content.faqType} />
            </Suspense>
          </>
        )}
        
        {!content.showFaq && (
          <Suspense fallback={<div className="h-40 bg-gray-100 animate-pulse" />}>
            <Cta2 pageType={pageType} />
          </Suspense>
        )}
      </main>

      <Suspense fallback={<div className="h-64 bg-gray-900 animate-pulse" />}>
        <Footer />
      </Suspense>

      {/* Non-critical components */}
      {isClient && (
        <Suspense fallback={null}>
          <OpenPopup showPopUp={showPopUp} setShowPopUp={setShowPopUp} />
        </Suspense>
      )}
      
      <Suspense fallback={null}>
        <ToastProvider />
      </Suspense>
    </>
  );
};

export default PageLayout;


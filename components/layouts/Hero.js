"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import Button from "../ui/Button";
import Image from "next/image";

const Hero = ({
  title = "Instant Paint Cost Calculator",
  titleHighlight = "Instant",
  description = "Instantly find the true cost to paint a house with Middler—the most effective Paint calculator for rooms, interiors, and exteriors anywhere in the USA",
  hideAddressForm = false,
  hideStats = false,
  heroImage = "/images/hero_img.webp",
  pageType = "home",
}) => {
  const router = useRouter();
  const dropdownRef = useRef(null);
  const [address, setAddress] = useState("");
  const [error, setError] = useState(false);
  const [typed, setTyped] = useState(false);
  const [predictions, setPred] = useState([]);
  const [selectedAddr, setSelected] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const { getPlacePredictions, placePredictions } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_ADDRESS_VALIDATION_API_KEY,
  }) || { getPlacePredictions: () => {}, placePredictions: [] };
  const [, setCookie] = useCookies(["address"]);

  const isHome = pageType === "home";

  useEffect(() => {
    if (typed && address.length && getPlacePredictions) {
      try {
        getPlacePredictions({ input: address });
      } catch (error) {
        console.warn("Google Places API error:", error);
      }
    }
  }, [address, getPlacePredictions]);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768);
      }
    };

    checkMobile();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", checkMobile);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", checkMobile);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setTyped(false);
        setPred([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!placePredictions?.length || !window.google?.maps?.places) return;
    const svc = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    (async () => {
      const enriched = await Promise.all(
        placePredictions.map(
          (p) =>
            new Promise((resolve) => {
              svc.getDetails({ placeId: p.place_id }, (res, status) => {
                if (
                  status === window.google.maps.places.PlacesServiceStatus.OK
                ) {
                  const c = res.address_components;
                  const street = c.find((x) =>
                    x.types.includes("street_number")
                  )?.long_name;
                  const route = c.find((x) =>
                    x.types.includes("route")
                  )?.long_name;
                  if (!street || !route) return resolve(null);
                  const zip = c.find((x) =>
                    x.types.includes("postal_code")
                  )?.long_name;
                  const city = c.find((x) =>
                    x.types.includes("locality")
                  )?.long_name;
                  const st = c.find((x) =>
                    x.types.includes("administrative_area_level_1")
                  )?.short_name;
                  resolve({
                    ...p,
                    formattedAddress: `${street} ${route}, ${city}, ${st} ${zip}`,
                    zipCode: zip,
                  });
                } else resolve(null);
              });
            })
        )
      );
      setPred(enriched.filter(Boolean));
    })();
  }, [placePredictions]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedAddr) {
      setError(true);
      return;
    }

    setCookie(
      "address",
      {
        formattedAddress: selectedAddr.formattedAddress,
        zipCode: selectedAddr.zipCode,
      },
      { path: "/", maxAge: 60 * 60 * 24 * 7 }
    );
    router.push("/paint-estimator?step=2");
  };

  const titleRemainder = title
    .replace(titleHighlight, "")
    .replace(/\s+/g, " ")
    .trim();

  const addressForm = !hideAddressForm && (
    <form
      onSubmit={handleSubmit}
      className={`border border-primary-300 bg-white shadow-[0_4px_40px] shadow-primary/20 rounded-[20px] flex flex-col ${
        isHome
          ? "p-3 lg:p-4 gap-2 w-full"
          : "p-2 sm:p-3 max-lg:pb-5 max-lg:pt-2 lg:p-[30px] gap-2 lg:gap-5"
      }`}
      style={
        !isHome
          ? {
              width: isMobile ? "100%" : "100%",
              padding: isMobile ? "12px" : undefined,
              paddingTop: isMobile ? "35px" : undefined,
              borderRadius: isMobile ? "18px" : undefined,
              boxShadow: isMobile ? "0 10px 28px rgba(0,0,0,0.08)" : undefined,
            }
          : undefined
      }
    >
      <div className="relative py-1.5 lg:px-1.5 border-b-[1.5px] border-[rgba(51,51,51,0.15)] after:h-[3px] after:w-[89px] after:absolute after:-bottom-px after:left-0 after:bg-primary">
        <p
          className={`font-semibold ${
            isHome
              ? "text-sm lg:text-lg"
              : "max-[400px]:text-[3.45vw]! text-[3.5vw] lg:text-2xl max-sm:mt-2"
          }`}
          style={{ fontSize: !isHome && isMobile ? "14px" : undefined }}
        >
          Enter address of the property that&apos;s being painted
        </p>
      </div>
      <div
        className={`w-full flex flex-row items-stretch ${
          isHome ? "gap-2.5 lg:gap-4" : "gap-2.5 lg:gap-[30px]"
        }`}
        style={{ padding: !isHome && isMobile ? "10px" : undefined }}
      >
        <div
          ref={dropdownRef}
          className={`rounded-xl grow bg-[#f3f3f3] flex flex-col gap-2 relative ${
            isHome ? "py-2.5 px-3 lg:p-3" : "py-3 px-2 lg:p-3"
          }`}
          style={
            !isHome
              ? {
                  padding: isMobile ? "8px" : undefined,
                  height: isMobile ? "44px" : undefined,
                }
              : undefined
          }
        >
          <div
            className="flex gap-2 items-center"
            style={{ height: !isHome && isMobile ? "100%" : undefined }}
          >
            <span>
              <svg
                className={isHome ? "size-4 lg:size-5" : "size-3.5 lg:size-6"}
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.5 17.5L21.5 21.5"
                  stroke="#141B34"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.5 11.5C19.5 7.08172 15.9183 3.5 11.5 3.5C7.08172 3.5 3.5 7.08172 3.5 11.5C3.5 15.9183 7.08172 19.5 11.5 19.5C15.9183 19.5 19.5 15.9183 19.5 11.5Z"
                  stroke="#141B34"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <input
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setTyped(true);
                setSelected(null);
                if (error) setError(false);
              }}
              placeholder="3976 First St, Glendale CA, 98765"
              className="inline-block w-full grow outline-none! ios-nozoom"
              style={{
                fontSize: isMobile ? "13px" : isHome ? "15px" : "16px",
                lineHeight: isMobile ? "18px" : undefined,
              }}
            />
          </div>
          {typed && predictions.length > 0 && (
            <div className="absolute left-0 top-full mt-1 w-full bg-white rounded-lg shadow-[0_0_12px_rgba(0,0,0,0.15)] z-10 max-h-60 overflow-y-auto divide-y divide-black/15">
              {predictions.map((p) => (
                <div
                  key={p.place_id}
                  className="px-4 lg:px-4 lg:py-2 lg:first:pt-4 lg:last:pb-4 py-2 first:pt-4 last:pb-4 hover:bg-primary/10 cursor-pointer text-base text-left lg:text-base text-[#656E81]"
                  onClick={() => {
                    setAddress(p.formattedAddress);
                    setSelected(p);
                    setTyped(false);
                    setPred([]);
                  }}
                >
                  {p.formattedAddress}
                </div>
              ))}
            </div>
          )}
          {error && (
            <small className="text-red-600 text-xs absolute top-full left-2 mt-1">
              Please select a valid address *
            </small>
          )}
        </div>
        <Button
          type="submit"
          className={`rounded-xl! max-lg:py-3! max-lg:px-3! max-lg:whitespace-nowrap max-lg:text-xs cursor-pointer ${
            isHome ? "lg:py-3! lg:px-8! lg:text-base!" : ""
          } ${error ? "max-lg:mt-4" : ""}`}
          style={{
            padding: isMobile ? "8px 12px" : undefined,
            fontSize: isMobile ? "12px" : undefined,
            lineHeight: isMobile ? "1.2" : undefined,
            height: isMobile ? "40px" : undefined,
            borderRadius: isMobile ? "12px" : undefined,
          }}
        >
          Start Calculating
        </Button>
      </div>
    </form>
  );

  if (isHome) {
    return (
      <section className="relative mt-[52px] lg:mt-[68px] pt-5 lg:pt-6 pb-3 px-0 lg:px-10">
        <div className="container xl:px-10! 2xl:w-[1300px]!">
          <div className="relative flex flex-col gap-4 lg:gap-5">
            <div className="relative flex items-start justify-between gap-6 max-lg:px-5">
              <div className="flex flex-col max-w-3xl w-full max-lg:mx-auto max-lg:items-center max-lg:text-center lg:text-left">
                <h1 className="font-bold text-[28px] leading-[1.15] sm:text-[34px] lg:text-[42px] lg:leading-[1.15] mb-2">
                  <span className="text-primary">{titleHighlight}</span>
                  <br />
                  {titleRemainder}
                </h1>
                <p className="text-sm lg:text-lg leading-snug font-medium text-black/90">
                  {description}
                </p>
              </div>
              <div className="hidden lg:flex flex-col items-center shrink-0 opacity-25 pointer-events-none select-none pr-2 lg:pr-8">
                <Image
                  src="/images/elements/exl.webp"
                  alt="Middler Certified Estimate"
                  width={140}
                  height={140}
                  className="w-[100px] lg:w-[130px] h-auto"
                />
                <span className="mt-1 text-[10px] lg:text-xs font-bold tracking-wide text-center leading-tight uppercase text-black">
                  Middler
                  <br />
                  Certified Estimate
                </span>
              </div>
            </div>

            <div className="max-lg:px-5">{addressForm}</div>

            <div className="max-lg:px-5 w-full">
              <Image
                src="/images/newbanner.jpg"
                alt="Corner+ — The only roller that paints walls and corners. Find it at Menards."
                width={2172}
                height={724}
                className="hidden md:block w-full h-auto rounded-md object-cover"
                priority
                unoptimized
                sizes="(min-width: 1300px) 1300px, 100vw"
              />
              <Image
                src="/images/banner-mobile.png"
                alt="Corner+ — The only roller that paints walls and corners. Find it at Menards."
                width={750}
                height={900}
                className="block md:hidden w-full h-auto rounded-md object-cover"
                priority
                unoptimized
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative mt-14 lg:mt-20 pt-12 lg:pt-[70px] pb-3 sm:pb-10 px-0 lg:px-10">
      <div className="absolute -left-4 top-[126px] h-[540px] w-[250px] lg:-left-10 lg:top-1/2 lg:-translate-y-1/2 lg:size-1/2 bg-center bg-no-repeat bg-[url('/images/hero_el2.webp')] lg:bg-[url('/images/hero_el.webp')] bg-contain" />
      <div className="container xl:px-10! 2xl:w-[1300px]!">
        <div
          className={`row gap-y-[60px] sm:gap-y-14 lg:gap-y-8 gap-x-5 justify-center ${(pageType === "interior" || pageType === "exterior" || pageType === "costToPaintHouse") ? "xl:gap-x-[74px]" : "xl:gap-x-[74px]"} 2xl:gap-x-20 ${(pageType === "interior" || pageType === "exterior" || pageType === "costToPaintHouse") ? "items-end" : "items-center"} max-lg:text-center`}
        >
          <div
            className={`lg:w-6/12 ${(pageType === "interior" || pageType === "exterior" || pageType === "costToPaintHouse") ? "xl:w-[47%]" : "xl:w-[47%]"} 2xl:w-5/12 max-lg:order-1`}
          >
            <div className="flex flex-col max-lg:px-5 w-full">
              <h1
                style={{
                  fontSize: isMobile
                    ? "34px"
                    : pageType === "costToPaintHouse"
                      ? "36px"
                      : "56px",
                  fontWeight: isMobile ? "600" : "700",
                  lineHeight: isMobile ? "46px" : undefined,
                }}
                className="font-bold text-[40px] leading-14 lg:text-6xl lg:leading-[1.2] mb-3 lg:mb-5"
              >
                <span className="text-primary">{titleHighlight} </span>{" "}
                {titleRemainder}
              </h1>
              <p
                className="text-base lg:text-2xl leading-6 lg:leading-snug"
                style={{
                  fontSize: isMobile ? "15px" : "22px",
                  fontWeight: isMobile ? "400" : "500",
                }}
              >
                {description}
              </p>
            </div>
          </div>
          <div
            className="lg:w-6/12 max-lg:hidden lg:pt-20"
            style={pageType === "costToPaintHouse" ? { paddingInline: 0 } : {}}
          >
            <div
              className={`relative size-full ${pageType === "costToPaintHouse" ? "w-full" : "text-right"} lg:translate-y-8`}
            >
              <Image
                src={heroImage}
                alt="cost to paint a house"
                width={500}
                height={320}
                className={`object-contain ${pageType === "costToPaintHouse" ? "block h-auto w-full max-h-none rounded-none" : "inline-block max-h-[320px] rounded-2xl"}`}
                sizes={
                  pageType === "costToPaintHouse"
                    ? "(min-width: 1024px) 50vw, 100vw"
                    : undefined
                }
              />
            </div>
          </div>
          {!hideAddressForm && (
            <div className="mx-auto flex justify-center max-lg:order-2">
              {addressForm}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;

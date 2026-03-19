"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

///// COMPONENTS

///// LIBS
import {
  cabinetConditions,
  cabinetDetail,
  exteriorConditions,
  exteriorDetails,
  interiorConditions,
  interiorDetails,
} from "@/app/constants";
import {
  totalEstimate,
  totalEstimateAdjustedNewEstimate,
} from "@/helpers/main_forms";
import Progress from "../ui/Progress";
import Navbar from "./Navbar";

const Preview = ({
  navigation,
  estimator,
  dispatch,
  changeEstimatorValue,
  changePaintEstimator,
  changeObjectValue,
  addObjectToArray,
  changeEdit,
  changePopup,
  changePopupType,
  dropdown,
  setDropdown,
  setCountry,
  countries,
  validateNumber,
  validatePrice,
  requiredFields,
  cookies,
  businessEmailRef,
  previewRef,
}) => {
  const hasInterior =
    estimator.interiorSquareFeet &&
    estimator.interiorItems &&
    estimator.interiorItems.length > 0;

  const hasExterior =
    estimator.exteriorSquareFeet &&
    estimator.exteriorItems &&
    estimator.exteriorItems.length > 0;

  const hasCabinets = estimator.doorsAndDrawers;

  //// SERVICES
  const { getPlacePredictions, placePredictions } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_ADDRESS_VALIDATION_API_KEY,
  });
  const [predictionsWithZip, setPredictionsWithZip] = useState([]);

  useEffect(() => {
    getPlacePredictions({ input: estimator.businessAddress });
  }, [estimator.businessAddress]);

  useEffect(() => {
    getPlacePredictions({ input: estimator.clientPropertyAddress });
  }, [estimator.clientPropertyAddress]);

  useEffect(() => {
    if (placePredictions && placePredictions.length > 0) {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      const fetchZipCodes = async () => {
        const updatedPredictions = await Promise.all(
          placePredictions.map(async (prediction) => {
            return new Promise((resolve) => {
              service.getDetails(
                { placeId: prediction.place_id },
                (result, status) => {
                  if (
                    status === window.google.maps.places.PlacesServiceStatus.OK
                  ) {
                    const addressComponents = result.address_components;
                    const zipCode =
                      addressComponents.find((component) =>
                        component.types.includes("postal_code")
                      )?.long_name || "";
                    const city =
                      addressComponents.find((component) =>
                        component.types.includes("locality")
                      )?.long_name || "";
                    const state =
                      addressComponents.find((component) =>
                        component.types.includes("administrative_area_level_1")
                      )?.short_name || "";
                    const streetNumber =
                      addressComponents.find((component) =>
                        component.types.includes("street_number")
                      )?.long_name || "";
                    const route =
                      addressComponents.find((component) =>
                        component.types.includes("route")
                      )?.long_name || "";
                    const formattedAddress = `${streetNumber} ${route}, ${city}, ${state} ${zipCode}`;
                    resolve({ ...prediction, formattedAddress, zipCode });
                  } else {
                    resolve(prediction);
                  }
                }
              );
            });
          })
        );
        setPredictionsWithZip(updatedPredictions);
      };

      fetchZipCodes();
    }
  }, [placePredictions]);

  const showOriginalEstimate = () => {
    dispatch(changeEstimatorValue({ value: false, type: "adjustment" }));
  };

  return (
    <>
      <div
        ref={previewRef}
        className="w-full flex items-center flex-col justify-between gap-5 col-span-3"
      >
        <Navbar />
        <Progress step={1} />
        {estimator && (
          <div
            className={`rounded-3xl max-lg:w-full bg-[#EAF5FF]/60 px-4 py-6 lg:p-16`}
          >
            <div className="flex flex-col gap-6 lg:gap-12 items-center">
              <header className="flex flex-col text-center gap-3 lg:gap-5">
                <h2 className="text-black font-bold text-[26px] lg:text-4xl">
                  🎉Estimate Complete!
                </h2>
                <p className="text-[#1F2937] text-sm lg:text-lg">
                  Your price breakdown including labor, materials, and paint is
                  ready.
                </p>
              </header>

              <section className="flex flex-col">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    {
                      label: "Interior Estimate",
                      value: estimator.interiorEstimate,
                      adjusted: estimator.interiorAdjusted,
                    },
                    {
                      label: "Cabinets Estimate",
                      value: estimator.cabinetEstimate,
                      adjusted: estimator.cabinetAdjusted,
                    },
                    {
                      label: "Exterior Estimate",
                      value: estimator.exteriorEstimate,
                      adjusted: estimator.exteriorAdjusted,
                    },
                    {
                      label: "Total Estimate",
                      value: totalEstimate(estimator),
                      adjusted: totalEstimateAdjustedNewEstimate(estimator),
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="py-5 px-3 lg:py-8 lg:px-10 text-center bg-gradient-to-l from-[#275FF6] to-[#0039D4] rounded-[10px]"
                    >
                      <h5 className="text-white font-bold text-xs lg:text-xl mb-3 lg:mb-4">
                        {item.label}
                      </h5>
                      <p className="text-white font-semibold text-xl lg:text-3xl">
                        {estimator.adjustment
                          ? `$${parseInt(
                              item.adjusted.replace("$", "").replace(/,/g, ""),
                              10
                            ).toLocaleString("en-US", {
                              maximumFractionDigits: 0,
                            })}`
                          : `$${parseInt(
                              item.value.replace(/,/g, ""),
                              10
                            ).toLocaleString("en-US", {
                              maximumFractionDigits: 0,
                            })}`}
                      </p>
                    </div>
                  ))}
                </div>

                {hasInterior && (
                  <div className="flex flex-col gap-6 items-start w-full border-b border-b-neutral-300 my-4 lg:my-6 pb-4 lg:pb-6">
                    <h3 className="text-xl lg:text-3xl font-semibold text-black py-1 px-2.5 relative inline-block after:absolute after:top-full after:left-0 after:bg-primary after:w-full after:h-0.5">
                      Interior
                    </h3>

                    <div className="flex justify-between items-center w-full">
                      <div className="text-[#595858] text-xs lg:text-lg flex gap-2">
                        <span className="font-semibold text-black">
                          Interior Sqft:
                        </span>
                        <span>{estimator.interiorSquareFeet || "unknown"}</span>
                      </div>
                      <div className="text-[#595858] text-xs lg:text-lg flex gap-2 lg:w-[37%]">
                        <span className="font-semibold text-black">
                          Interior Condition:
                        </span>
                        <span>
                          {estimator.interiorCondition
                            ? interiorConditions.find(
                                (item) =>
                                  item.type === estimator.interiorCondition
                              )?.title
                            : "unknown"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between md:items-center w-full">
                      <div className="text-[#595858] text-xs lg:text-lg flex gap-2 flex-wrap">
                        <span className="font-semibold text-black">
                          Interior Details:
                        </span>
                        <span>
                          {estimator.interiorDetail
                            ? interiorDetails.find(
                                (item) => item.type === estimator.interiorDetail
                              )?.title
                            : "unknown"}
                        </span>
                      </div>
                      <div className="text-[#595858] text-xs lg:text-lg flex gap-2 flex-wrap flex-col lg:w-[37%] mt-4 md:mt-0">
                        <span className="font-semibold text-black">
                          Items to be Painted:
                        </span>
                        <span className="flex flex-wrap gap-2">
                          {estimator.interiorItems.map((item, idx) => (
                            <span
                              key={idx}
                              className="rounded-[30px] bg-[#D3DBF8] text-primary px-2.5 py-[9px]"
                            >
                              {item.title}
                            </span>
                          ))}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 lg:gap-5 flex-wrap border-b border-b-neutral-300 mb-4 lg:mb-6 pb-4 lg:pb-6">
                      <h3 className="text-xl lg:text-3xl font-semibold text-black py-1 px-2.5 relative inline-block after:absolute after:top-full after:left-0 after:bg-primary after:w-full after:h-0.5">
                        Extras:
                      </h3>
                      {estimator.interiorIndividualItems.map((item, idx) => (
                        <span
                          key={idx}
                          className="rounded-[30px] bg-[#D3DBF8] text-primary px-2.5 py-[9px] text-sm lg:text-lg"
                        >
                          {item.title} - ${item.price}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {hasCabinets && (
                  <div className="flex flex-col gap-6 items-start w-full border-b border-b-neutral-300 my-4 lg:my-6 pb-4 lg:pb-6">
                    <h3 className="text-xl lg:text-3xl font-semibold text-black py-1 px-2.5 relative inline-block after:absolute after:top-full after:left-0 after:bg-primary after:w-full after:h-0.5">
                      Cabinets
                    </h3>

                    <div className="flex justify-between items-center w-full">
                      <div className="text-[#595858] text-xs lg:text-lg flex gap-2">
                        <span className="font-semibold text-black">
                          Number of Cabinets
                        </span>
                        <span>{estimator.doorsAndDrawers || "unknown"}</span>
                      </div>
                      <div className="text-[#595858] text-xs lg:text-lg flex gap-2 lg:w-[37%]">
                        <span className="font-semibold text-black">
                          Cabinet Condition:
                        </span>
                        <span>
                          {estimator.cabinetCondition
                            ? cabinetConditions.find(
                                (item) =>
                                  item.type === estimator.cabinetCondition
                              )?.title
                            : "unknown"}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-end sm:items-center w-full">
                      <div className="text-[#595858] text-xs lg:text-lg flex gap-2 flex-wrap mb-3 sm:mb-0">
                        <span className="font-semibold text-black">
                          Painting Cabinet:
                        </span>
                        <span>{estimator.insideCabinet ? "Yes" : "No"}</span>
                      </div>
                      <div className="text-[#595858] text-xs lg:text-lg flex gap-2 flex-wrap flex-col lg:w-[37%]">
                        <span className="font-semibold text-black">
                          Cabinet Details:
                        </span>
                        <span className="flex flex-wrap gap-2">
                          <span className="rounded-[30px] bg-[#D3DBF8] text-primary px-2.5 py-[9px]">
                            {estimator.cabinetDetail
                              ? cabinetDetail.find(
                                  (item) =>
                                    item.type === estimator.cabinetDetail
                                )?.title
                              : "unknown"}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {hasExterior && (
                  <div className="flex flex-col gap-6 items-start w-full border-b border-b-neutral-300 mt-4 lg:mt-6 pb-4 lg:pb-6">
                    <h3 className="text-xl lg:text-3xl font-semibold text-black py-1 px-2.5 relative inline-block after:absolute after:top-full after:left-0 after:bg-primary after:w-full after:h-0.5">
                      Exterior
                    </h3>

                    <div className="flex justify-between items-center w-full">
                      <div className="text-[#595858] text-xs lg:text-lg flex gap-2">
                        <span className="font-semibold text-black">
                          Exterior Sqft:
                        </span>
                        <span>{estimator.exteriorSquareFeet || "unknown"}</span>
                      </div>
                      <div className="text-[#595858] text-xs lg:text-lg flex gap-2 lg:w-[37%]">
                        <span className="font-semibold text-black">
                          Exterior Condition:
                        </span>
                        <span>
                          {estimator.exteriorCondition
                            ? exteriorConditions.find(
                                (item) =>
                                  item.type === estimator.exteriorCondition
                              )?.title
                            : "unknown"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between md:items-center w-full">
                      <div className="text-[#595858] text-xs lg:text-lg flex gap-2 flex-wrap">
                        <span className="font-semibold text-black">
                          Exterior Details:
                        </span>
                        <span>
                          {estimator.exteriorDetail
                            ? exteriorDetails.find(
                                (item) => item.type === estimator.exteriorDetail
                              )?.title
                            : "unknown"}
                        </span>
                      </div>
                      <div className="text-[#595858] text-xs lg:text-lg flex gap-2 flex-wrap flex-col lg:w-[37%] mt-4 md:mt-0">
                        <span className="font-semibold text-black">
                          Items to be Painted:
                        </span>
                        <span className="flex flex-wrap gap-2">
                          {estimator.exteriorItems.map((item, idx) => (
                            <span
                              key={idx}
                              className="rounded-[30px] bg-[#D3DBF8] text-primary px-2.5 py-[9px]"
                            >
                              {item.title}
                            </span>
                          ))}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-2 lg:gap-5 flex-wrap border-b border-b-neutral-300 mb-4 lg:mb-6 pb-4 lg:pb-6">
                      <h3 className="text-xl lg:text-3xl font-semibold text-black py-1 px-2.5 relative inline-block after:absolute after:top-full after:left-0 after:bg-primary after:w-full after:h-0.5">
                        Extras:
                      </h3>
                      {estimator.exteriorIndividualItems.map((item, idx) => (
                        <span
                          key={idx}
                          className="rounded-[30px] bg-[#D3DBF8] text-primary px-2.5 py-[9px] text-sm lg:text-lg"
                        >
                          {item.title} - ${item.price}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* terms */}
                <div className="flex flex-col items-start gap-2 lg:gap-5 flex-wrap my-4 lg:my-8">
                  <h3 className="text-xl lg:text-3xl font-semibold text-black py-1 px-2.5 relative inline-block after:absolute after:top-full after:left-0 after:bg-primary after:w-full after:h-0.5">
                    Terms
                  </h3>
                  <div className="text-[#595858] text-xs lg:text-lg">
                    <span className="font-semibold text-black">
                      Paint Brand:
                    </span>{" "}
                    {estimator.paintBrand?.replace("_", " ") || "unknown"}
                  </div>
                </div>

                {/* action buttons */}
                {/* <div className="flex items-center gap-2 lg:gap-4">
                  {[
                    { t: "Print", icon: "print.webp" },
                    { t: "Save as PDF", icon: "pdf.webp" },
                    { t: "Resend Email", icon: "send.webp" },
                  ].map(({ t, icon }) => (
                    <button
                      key={t}
                      className="rounded-[20px] lg:rounded-4xl bg-[#043DD7] hover:bg-primary-800 text-white px-3 lg:px-10 lg:py-5 py-2.5 inline-flex items-center gap-1 lg:gap-3 text-[10px] lg:text-lg font-semibold"
                    >
                      <Image
                        src={`/images/icons/${icon}`}
                        alt={t}
                        width={28} // lg:max-h-7 ≈ 28px
                        height={28}
                        className="max-h-3.5 lg:max-h-7"
                      />
                      <span>{t}</span>
                    </button>
                  ))}
                </div> */}
              </section>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Preview;

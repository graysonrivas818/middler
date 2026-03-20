"use client";

import { useEffect, useState } from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

const PropertyAddress = ({
  estimator,
  dispatch,
  changeEstimatorValue,
  dropdown,
  setDropdown,
  loading,
  setLoading,
  setCookie,
  warning,
  setWarning,
  navigation,
  changePaintEstimator,
  changePopup,
  previewEstimate,
  trackFormEvents,
  changeEdit,
  paintEstimateSteps,
  paintEstimateFieldsRequired,
  requiredFields,
  setRequired,
}) => {
  const [predictionsWithZip, setPredictionsWithZip] = useState([]);
  const [userTyped, setUserTyped] = useState(false);
  const { getPlacePredictions, placePredictions } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_ADDRESS_VALIDATION_API_KEY,
  });

  useEffect(() => {
    if (estimator.value.clientPropertyAddress.length > 0 && userTyped) {
      setDropdown("clientPropertyAddress");
      getPlacePredictions({ input: estimator.value.clientPropertyAddress });
    }
  }, [estimator.value.clientPropertyAddress, userTyped]);

  useEffect(() => {
    if (placePredictions && placePredictions.length > 0 && window.google?.maps?.places) {
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

                    const streetNumber =
                      addressComponents.find((component) =>
                        component.types.includes("street_number")
                      )?.long_name || "";

                    const route =
                      addressComponents.find((component) =>
                        component.types.includes("route")
                      )?.long_name || "";

                    if (!streetNumber || !route) {
                      // ❌ Skip if incomplete
                      return resolve(null);
                    }

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

                    const formattedAddress = `${streetNumber} ${route}, ${city}, ${state} ${zipCode}`;

                    resolve({ ...prediction, formattedAddress, zipCode });
                  } else {
                    resolve(null); // ❌ Skip invalid
                  }
                }
              );
            });
          })
        );

        // ✅ Filter out nulls (incomplete or errored predictions)
        const filteredPredictions = updatedPredictions.filter(
          (p) => p !== null
        );
        setPredictionsWithZip(filteredPredictions);
      };

      fetchZipCodes();
    }
  }, [placePredictions]);

  useEffect(() => {
    if (estimator.value.clientPropertyAddress.length > 0 && !userTyped) {
      getPlacePredictions({ input: estimator.value.clientPropertyAddress });
    }
  }, []);

  return (
    <>
      <div className="pt-3 text-center">
        <h2 className="text-2xl font-bold text-[#333]">
          Get a Real Price on house painting. Enter address for instant quote.
        </h2>
      </div>
      <div className="relative w-full max-w-[820px]">
        <input
          type="text"
          placeholder="3976 First St., Glendale CA, 98765"
          value={estimator.value.clientPropertyAddress}
          onChange={(e) => (
            dispatch(
              changeEstimatorValue({
                value: e.target.value,
                type: "clientPropertyAddress",
              })
            ),
            setUserTyped(true)
          )}
          className="w-full px-5 py-3 rounded-[20px] border text-color-grayone border-[#656e81] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base lg:text-lg font-medium text-[#1F2937]"
        />

        {dropdown === "clientPropertyAddress" && (
          <div className="absolute w-full mt-2 bg-white shadow-[0_0_20px] shadow-black/20 rounded-[10px] z-10 max-h-[260px] overflow-y-auto dropdown">
            {estimator.value.clientPropertyAddress &&
              predictionsWithZip &&
              predictionsWithZip.map((item, idx) => (
                <div
                  key={idx}
                  className="px-5 py-2 cursor-pointer hover:bg-primary/5 text-[#656E81] max-lg:text-xs"
                  onClick={() => {
                    dispatch(
                      changeEstimatorValue({
                        value: item.formattedAddress,
                        type: "clientPropertyAddress",
                      })
                    ),
                      dispatch(
                        changeEstimatorValue({
                          value: item.zipCode,
                          type: "clientZipCode",
                        })
                      ),
                      setDropdown("");
                    setUserTyped(false);
                  }}
                >
                  {item.formattedAddress}
                </div>
              ))}
          </div>
        )}
        {Array.isArray(requiredFields) &&
          requiredFields.includes("clientPropertyAddress") && (
            <div className="flex items-center px-2 py-[2px] w-max mx-1 gap-x-3 border-[1px] border-red-300 rounded-lg mt-[2px]">
              <span className="text-red-500 text-[12px]">{warning}</span>
            </div>
          )}
      </div>
      <button
        onClick={() => {
          if (estimator.value.clientPropertyAddress.trim() === "") {
            setWarning("Address field required");

            let notFilled = [];
            notFilled.push("clientPropertyAddress");

            if (!requiredFields.includes("clientPropertyAddress")) {
              setRequired(notFilled);
            }

            return;
          }
          const matched = predictionsWithZip.find(
            (item) =>
              item.formattedAddress === estimator.value.clientPropertyAddress
          );

          if (!matched) {
            setWarning("Please select a valid address from the dropdown");

            let notFilled = [];
            notFilled.push("clientPropertyAddress");

            if (!requiredFields.includes("clientPropertyAddress")) {
              setRequired(notFilled);
            }

            return;
          }
          setCookie(
            "clientPropertyAddress",
            JSON.stringify({
              formattedAddress: matched.formattedAddress,
              zipCode: matched.zipCode,
            }),
            {
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
            }
          );

          paintEstimateFieldsRequired(
            +navigation.value.paintEstimator,
            estimator.value,
            dispatch,
            changePaintEstimator,
            changeEstimatorValue,
            paintEstimateSteps,
            setRequired,
            changePopup,
            previewEstimate,
            trackFormEvents,
            navigation,
            changeEdit,
            false
          );
        }}
        className="qsnre_btn"
      >
        start
      </button>
    </>
  );
};

export default PropertyAddress;

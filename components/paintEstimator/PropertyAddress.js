"use client";

const isValidUsZip = (value) => /^\d{5}$/.test(String(value || "").trim());

const PropertyAddress = ({
  estimator,
  dispatch,
  changeEstimatorValue,
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
  const zipValue = estimator.value.clientZipCode || "";

  const handleZipChange = (e) => {
    const next = e.target.value.replace(/\D/g, "").slice(0, 5);
    dispatch(
      changeEstimatorValue({
        value: next,
        type: "clientZipCode",
      })
    );
    dispatch(
      changeEstimatorValue({
        value: next,
        type: "clientPropertyAddress",
      })
    );
    if (warning) setWarning("");
  };

  const handleStart = () => {
    const cleanedZip = String(zipValue || "").trim();

    if (!isValidUsZip(cleanedZip)) {
      setWarning("Please enter a valid 5-digit ZIP code");

      const notFilled = ["clientZipCode"];
      if (!requiredFields.includes("clientZipCode")) {
        setRequired(notFilled);
      }
      return;
    }

    dispatch(
      changeEstimatorValue({
        value: cleanedZip,
        type: "clientZipCode",
      })
    );
    dispatch(
      changeEstimatorValue({
        value: cleanedZip,
        type: "clientPropertyAddress",
      })
    );

    setCookie(
      "clientPropertyAddress",
      {
        formattedAddress: cleanedZip,
        zipCode: cleanedZip,
      },
      {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      }
    );

    paintEstimateFieldsRequired(
      +navigation.value.paintEstimator,
      {
        ...estimator.value,
        clientZipCode: cleanedZip,
        clientPropertyAddress: cleanedZip,
      },
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
  };

  return (
    <>
      <div className="pt-2 text-center">
        <h2 className="text-[22px] lg:text-2xl font-bold text-[#333]">
          Get a Real Price on house painting. Please enter the ZIP CODE of the
          home.
        </h2>
      </div>
      <div className="relative w-full max-w-[820px]">
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={5}
          placeholder="Enter ZIP code (e.g. 90210)"
          aria-label="ZIP code"
          value={zipValue}
          onChange={handleZipChange}
          className="w-full px-5 py-3 rounded-[20px] border text-color-grayone border-[#656e81] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base lg:text-lg font-medium text-[#1F2937]"
        />

        {(warning ||
          (Array.isArray(requiredFields) &&
            (requiredFields.includes("clientZipCode") ||
              requiredFields.includes("clientPropertyAddress")))) && (
          <div className="flex items-center px-2 py-[2px] w-max mx-1 gap-x-3 border-[1px] border-red-300 rounded-lg mt-[2px]">
            <span className="text-red-500 text-[12px]">
              {warning || "Please enter a valid 5-digit ZIP code"}
            </span>
          </div>
        )}
      </div>
      <button onClick={handleStart} className="qsnre_btn">
        start
      </button>
    </>
  );
};

export default PropertyAddress;

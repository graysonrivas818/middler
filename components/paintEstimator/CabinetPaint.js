'use client';

import { useEffect, useState } from "react";

const CabinetPaint = ({
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
  return (
    <>
      <div className="pt-3 text-center">
        <h2 className="text-[26px] font-bold text-[#333]">
          Are you painting <i>any</i> cabinets?
        </h2>
        <p className={`mt-4 text-neutral-600 text-center`}>
          Cabinets can be <strong>anywhere</strong>. In the Kitchen, Bathrooms,
          Hallways, Bedrooms, Offices, Outside, Garage and anywhere in between.
        </p>
      </div>
      <div className="w-3/5 2xl:w-[60%] mb-5 pb-5 h-max rounded-xl max-lg:w-[80%] max-md:w-full px-5">
        <h1 className="text-xl md:text-2xl text-gray-800 mb-2 font-[600] text-center"></h1>
        <h2 className="text-md text-gray-800 mb-2 font-[400] text-center px-5"></h2>
        <div className="flex flex-wrap gap-5 justify-center">
          <button
            onClick={() =>
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
                true
              )
            }
            className="btn_prm"
          >
            Yes
          </button>
          <button
            onClick={() => {
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
            className="btn_scnd"
          >
            No
          </button>
        </div>
      </div>
    </>
  );
};

export default CabinetPaint;

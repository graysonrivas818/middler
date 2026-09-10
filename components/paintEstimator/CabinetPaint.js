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
      <div className="pt-2 text-center">
        <h2 className="text-[22px] lg:text-[26px] font-bold text-[#333]">
          Are you painting <i>any</i> cabinets?
        </h2>
        <p className={`mt-4 text-neutral-600 text-center`}>
          Cabinets can be <strong>anywhere</strong>. In the Kitchen, Bathrooms,
          Hallways, Bedrooms, Offices, Outside, Garage and anywhere in between.
        </p>
      </div>
     
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
     
      <div className="quote"><strong>Cabinet painting</strong> is an art. <strong>Hire a pro</strong> or at least <strong>use the best sprayer.</strong> It will pay off.</div>
    </>
  );
};

export default CabinetPaint;

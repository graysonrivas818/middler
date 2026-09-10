'use client';

import { useEffect, useState } from "react";

const ExteriorPaint = ({
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
          Are you painting the outside of the house?
        </h2>
      </div>
      <div className="flex flex-wrap gap-5">
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
      <div className="quote">  <strong>1 week or 1 month?</strong> A pro painter can finish your project <strong>4 times faster</strong>.</div>
    </>
  );
};

export default ExteriorPaint;

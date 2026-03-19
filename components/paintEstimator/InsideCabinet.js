'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

const InsideCabinet = ({
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
          Are you painting the inside of the cabinets?
        </h2>
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        <button
          onClick={() => (
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
            ),
            dispatch(
              changeEstimatorValue({ value: "yes", type: "insideCabinet" })
            )
          )}
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
            ),
              dispatch(
                changeEstimatorValue({ value: "no", type: "insideCabinet" })
              );
          }}
          className="btn_scnd"
        >
          No
        </button>
      </div>
      <div className="flex flex-col items-center justify-center gap-3">
        <p className="text-neutral-700">The blue part is the inside</p>
        <Image
          src="/images/cabinets/inside.webp"
          alt="Cabinet inside view"
          width={96}
          height={96}
          className="max-w-20 lg:max-w-24 rounded-xl"
        />
      </div>
    </>
  );
};

export default InsideCabinet;

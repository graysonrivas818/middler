'use client';

import { exteriorConditions } from "@/app/constants";

const ExteriorCondition = ({
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
          What condition is the outside of the home in?
        </h2>
      </div>
      <div className="grid lg:grid-cols-3 gap-5">
        {exteriorConditions.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              dispatch(
                changeEstimatorValue({
                  value: item.type,
                  type: "exteriorCondition",
                })
              );
            }}
            className={
              `py-2.5 px-8 min-w-[140px] rounded-[11px] text-xl font-semibold border-2 border-primary transition ` +
              (estimator.value.exteriorCondition == item.type
                ? " bg-transparent text-primary "
                : " bg-primary text-white")
            }
          >
            <span>{item.title}</span>
          </button>
        ))}
      </div>
      {Array.isArray(requiredFields) &&
        requiredFields.includes("exteriorCondition") && (
          <div className="flex items-center px-2 py-[2px] w-max mx-5 gap-x-3 border-[1px] border-red-300 rounded-lg mt-1 mb-1">
            <span className="text-red-500 text-[12px]">Please select one</span>
          </div>
        )}
      <div className="flex flex-col gap-4">
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
          className="qsnre_btn"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ExteriorCondition;

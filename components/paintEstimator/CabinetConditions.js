'use client';

import { cabinetConditions } from "@/app/constants";

const CabinetConditions = ({
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
          What condition are the cabinets in?
        </h2>
      </div>
      <div className="flex flex-wrap flex-col lg:flex-row gap-5">
        {cabinetConditions.map((item, idx) => (
          <button key={idx}
            onClick={() => {
              dispatch(
                changeEstimatorValue({
                  value: item.type,
                  type: "cabinetCondition",
                })
              );
            }}
            className={
              `py-2.5 px-8 min-w-[140px] rounded-[11px] text-xl font-semibold border-2 border-primary transition ` +
              (estimator.value.cabinetCondition == item.type
                ? " bg-transparent text-primary "
                : " bg-primary text-white")
            }
          >
            {item.title}
          </button>
        ))}
      </div>
      {Array.isArray(requiredFields) &&
        requiredFields.includes("cabinetCondition") && (
          <div className="flex items-center px-2 py-[2px] w-max mx-5 gap-x-3 border-[1px] border-red-300 rounded-lg mt-3">
            <span className="text-red-500 text-[12px]">Please select one</span>
          </div>
        )}
      <div className="flex flex-wrap gap-4">
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

export default CabinetConditions;

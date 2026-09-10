'use client';

import { interiorDetails } from "@/app/constants";

const InteriorDetail = ({
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
          How detailed is the inside of the house?
        </h2>
      </div>
      <div className="grid lg:grid-cols-3 gap-5">
        {interiorDetails.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              dispatch(
                changeEstimatorValue({
                  value: item.type,
                  type: "interiorDetail",
                })
              );
            }}
            className={
              `py-2 px-5 lg:py-2.5 lg:px-8 min-w-[120px] lg:min-w-[140px] rounded-[11px] text-base lg:text-xl font-semibold border-2 border-primary transition ` +
              (estimator.value.interiorDetail == item.type
                ? " bg-transparent text-primary "
                : " bg-primary text-white")
            }
          >
            {item.title}
          </button>
        ))}
      </div>
      {Array.isArray(requiredFields) &&
        requiredFields.includes("interiorDetail") && (
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
          next
        </button>
      </div>
      <div className="quote">If you hire an <strong>uninsured painter</strong> you could be <strong>liable if they get hurt</strong></div>
    </>
  );
};

export default InteriorDetail;

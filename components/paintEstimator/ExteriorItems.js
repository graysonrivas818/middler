"use client";

import { exteriorItemsToBePainted } from "@/app/constants";

const ExteriorItems = ({
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
          What are you painting?
        </h2>
      </div>
      <div className="rounded-2xl lg:-mx-5 2xl:mx-0 lg:p-3 flex max-lg:flex-col lg:flex-wrap gap-3 lg:justify-center lg:items-center border border-[#E5E7EB] w-full overflow-hidden max-lg:divide-y divide-[#E5E7EB]">
        {exteriorItemsToBePainted.map((item, idx) => (
          <label
            key={idx}
            //  className={`flex items-center w-full max-lg:p-3 lg:w-fit grow gap-2 lg:nth-[6]:max-w-[207px] `
            className="flex items-center gap-2 max-lg:p-3 border border-transparent hover:border-gray-200 rounded-lg w-full lg:w-[220px]"
          >
            <input
              type="checkbox"
              name="exteriorItems"
              value={item.title}
              checked={estimator.value.exteriorItems?.includes(item)}
              onChange={(e) => {
                const checked = e.target.checked;
                const updatedItems = checked
                  ? [...(estimator.value.exteriorItems || []), item]
                  : estimator.value.exteriorItems.filter((i) => i !== item);

                dispatch(
                  changeEstimatorValue({
                    value: updatedItems,
                    type: "exteriorItems",
                  })
                );
              }}
              className="size-5 rounded-[7px] border-[#868C8F] text-blue-600 focus:ring-blue-500"
            />
            <span className="text-[#1F2937] text-[15px]">{item.title}</span>
          </label>
        ))}
      </div>
      {Array.isArray(requiredFields) &&
        requiredFields.includes("exteriorItems") && (
          <div className="flex items-center px-2 py-[2px] w-max mx-5 gap-x-3 border-[1px] border-red-300 rounded-lg mt-3">
            <span className="text-red-500 text-[12px]">
              Please select at least one
            </span>
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

export default ExteriorItems;

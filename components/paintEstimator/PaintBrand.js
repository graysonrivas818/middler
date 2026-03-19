'use client';

import { paintList } from "@/app/constants";
import InputDropDown from "../form/inputDropdown";

const PaintBrand = ({
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
          Please select the paint you would like to use?
        </h2>
      </div>
      <div className="2xl:mt-3 flex flex-col max-lg:items-center justify-center w-full lg:flex-row gap-4">
        <InputDropDown
          stateValue={estimator.value.paintBrand}
          setDropdown={setDropdown}
          dropdown={dropdown}
          label={"Brand of Paint"}
          svg={"arrowDown"}
          svgLabel={"Arrow Down"}
          svgColor={"black"}
          list={paintList}
          dropdownType={"paintBrand"}
          viewType={"title"}
          dataType={"type"}
          stateType={"paintBrand"}
          dispatch={dispatch}
          stateMethod={changeEstimatorValue}
          readOnly={false}
          id={"paintBrand"}
          edit={navigation.value.edit}
          changeEdit={changeEdit}
        />
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
          Done
        </button>
      </div>
      {Array.isArray(requiredFields) &&
        requiredFields.includes("paintBrand") && (
          <div className="flex items-center px-2 py-[2px] w-max mx-5 gap-x-3 border-[1px] border-red-300 rounded-lg mt-3">
            <span className="text-red-500 text-[12px]">Please select one</span>
          </div>
        )}
    </>
  );
};

export default PaintBrand;

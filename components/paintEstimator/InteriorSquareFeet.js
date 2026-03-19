"use client";

import { validateNumber } from "@/helpers/forms";
import InputFieldSecondary from "../form/InputFieldSecondary";

const InteriorSquareFeet = ({
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
          How many square feet is being painted?
        </h2>
        <p className={`mt-4 text-neutral-600 text-center`}>
          If you&rsquo;re painting the whole house enter the total sqft. If your
          only painting 1 or a few rooms, measure the floor sqft of each room
          and add them up.
        </p>
      </div>
      <div className="mt-2 flex flex-col lg:flex-row items-center justify-center w-full gap-5 2xl:gap-8">
        <InputFieldSecondary
          inputType={"text"}
          placeholder={`Enter the total SQFT`}
          value={estimator.value.interiorSquareFeet}
          dispatch={dispatch}
          changeValue={changeEstimatorValue}
          type={"interiorSquareFeet"}
          inputClassOne={`${requiredFields.includes("interiorSquareFeet")
            ? " border-color-1 "
            : " "
            }`}
          dropdown={""}
          setDropdown={setDropdown}
          required={requiredFields.includes("interiorSquareFeet")}
          id={"interiorSquareFeet"}
          validation={true}
          validationMethod={validateNumber}
        />
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
            <span>NEXT</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default InteriorSquareFeet;

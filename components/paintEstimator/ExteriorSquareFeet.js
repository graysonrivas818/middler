'use client';

import { validateNumber } from "@/helpers/forms";
import InputFieldSecondary from "../form/InputFieldSecondary";

const ExteriorSquareFeet = ({
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
          If you&rsquo;re painting the whole house enter the total sqft.
        </p>
      </div>
      <div className="flex flex-col max-lg:items-center justify-center lg:flex-row w-full gap-4">
        <InputFieldSecondary
          inputType={"text"}
          placeholder={`Enter the total SQFT`}
          value={estimator.value.exteriorSquareFeet}
          dispatch={dispatch}
          changeValue={changeEstimatorValue}
          type={"exteriorSquareFeet"}
          inputClassOne={`${requiredFields.includes("exteriorSquareFeet")
            ? " border-color-1 "
            : " "
            }`}
          dropdown={""}
          setDropdown={setDropdown}
          required={requiredFields.includes("exteriorSquareFeet")}
          id={"exteriorSquareFeet"}
          validation={true}
          validationMethod={validateNumber}
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
          Next
        </button>
      </div>
    </>
  );
};

export default ExteriorSquareFeet;

"use client";
import { individualItem } from "@/app/constants";
import { validateNumber } from "@/helpers/forms";
import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import InputFieldSecondary from "../form/InputFieldSecondary";

const InteriorIndividualItems = ({
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
  changeObjectValue,
  addObjectToArray,
}) => {
  useEffect(() => {
    if (
      !estimator.value.interiorIndividualItems ||
      estimator.value.interiorIndividualItems.length === 0
    ) {
      dispatch(
        changeEstimatorValue({
          value: [{ title: "", price: "" }],
          type: "interiorIndividualItems",
        })
      );
    }
  }, []);

  return (
    <>
      <div className="text-center">
        <h2 className="text-[25px] font-bold text-[#333]">
          If your a painter you can add extra items you&rsquo;re painting on the{" "}
          <strong>inside of the home.</strong>
        </h2>
      </div>
      <div className="flex flex-col gap-6 w-full 3xl:items-center">
        {estimator.value.interiorIndividualItems?.map((item, idx) => (
          <div key={idx} className="flex max-lg:flex-col gap-5 2xl:px-4 relative 3xl:w-[780px]">
            <div className="w-full lg:w-1/2 lg:max-w-[380px]">
              <label className="block mb-1 text-base font-medium text-[#1F2937]">
                Item {idx + 1}
              </label>
              <InputFieldSecondary
                inputType={"text"}
                placeholder={`ex. bookcase`}
                value={item.title}
                dispatch={dispatch}
                changeObjectValue={changeObjectValue}
                idx={idx}
                index="title"
                items={estimator.value.interiorIndividualItems}
                type={"interiorIndividualItems"}
                inputClassOne={`${requiredFields.includes("interiorIndividualItems")
                  ? " border-primary "
                  : " "
                  }`}
                dropdown={""}
                setDropdown={setDropdown}
                id={`interiorIndividualItems${idx}-title`}
              />
            </div>
            <div className="w-full lg:w-1/2 lg:max-w-[380px]">
              <label className="block mb-1 text-base font-medium text-[#1F2937]">
                Price {idx + 1}
              </label>
              <InputFieldSecondary
                inputType={"text"}
                placeholder={`$`}
                value={item.price}
                dispatch={dispatch}
                changeObjectValue={changeObjectValue}
                idx={idx}
                index="price"
                items={estimator.value.interiorIndividualItems}
                type={"interiorIndividualItems"}
                inputClassOne={`${requiredFields.includes("interiorIndividualItems")
                  ? " border-primary "
                  : " "
                  }`}
                dropdown={""}
                setDropdown={setDropdown}
                id={`interiorIndividualItems${idx}-price`}
                validation={true}
                validationMethod={validateNumber}
              />
            </div>
            <div
              className="absolute right-4 top-0 text-white bg-black rounded-full p-0.5"
              onClick={() =>
                dispatch(
                  addObjectToArray({
                    newObject: null,
                    items: estimator.value.interiorIndividualItems,
                    type: "interiorIndividualItems",
                    index: idx,
                  })
                )
              }
            >
              <IoCloseOutline />
            </div>
          </div>
        ))}
      </div>
      {Array.isArray(requiredFields) &&
        requiredFields.includes("interiorIndividualItems") && (
          <div className="flex items-center px-2 py-[2px] w-max mx-5 gap-x-3 border-[1px] border-red-300 rounded-lg mt-3">
            <span className="text-red-500 text-[12px]">Please select one</span>
          </div>
        )}
      <div className="flex flex-col lg:flex-row gap-4 mt-2">
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
          className="qsnre_btn bg-transparent border-neutral-600 text-neutral-600 hover:text-white hover:bg-black"
        >
          skip
        </button>
        <button
          onClick={() =>
            dispatch(
              addObjectToArray({
                newObject: individualItem[0],
                items: estimator.value.interiorIndividualItems,
                type: "interiorIndividualItems",
              })
            )
          }
          className="qsnre_btn"
        >
          <span>Add Another Item</span>
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
          className="qsnre_btn"
        >
          <span>NEXT</span>
        </button>
      </div>
    </>
  );
};

export default InteriorIndividualItems;

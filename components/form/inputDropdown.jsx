"use client";
import Image from "next/image";
import { useEffect } from "react";
import { TfiAngleDown } from "react-icons/tfi";

const InputDropDown = ({
  stateValue,
  setDropdown,
  dropdown,
  label,
  svg,
  svgLabel,
  svgColor,
  list,
  dropdownType,
  viewType,
  dataType,
  stateType,
  dispatch,
  stateMethod,
  readOnly,
  typeOfData,
  id,
  edit,
  changeEdit,
  required,
  inputClassOne,
  inputClassTwo,
  inputClassThree,
}) => {
  const displayValue =
    stateValue && viewType
      ? list.find((item) => item[dataType] === stateValue)?.[viewType]
      : typeof stateValue === "boolean" && !viewType
      ? stateValue
        ? list[0]
        : list[1]
      : viewType
      ? label
      : "";

  return (
    <div className="relative w-full max-w-[600px]">
      <div
        id={id}
        className={`flex justify-between border border-[#656E81] rounded-[20px] px-5 py-3 cursor-pointer`}
        onClick={() =>
          dropdown === dropdownType
            ? setDropdown("")
            : setDropdown(dropdownType)
        }
      >
        <div
          className={`text-lg ${
            displayValue !== label
              ? "font-medium text-[#1F2937]"
              : "text-[#868C8F]"
          }`}
          title={displayValue}
        >
          {displayValue}
        </div>

        <div className="text-white bg-black p-[5px] rounded-full shadow-[0_0_10px_3px] shadow-black/30">
          <TfiAngleDown />
        </div>
      </div>

      {required && (
        <div className="absolute flex items-center px-2 py-[2px] w-max mx-5 gap-x-3 border-[1px] border-red-300 rounded-lg mt-[2px]">
          <span className="text-red-500 text-[12px]">
            Please fill out this field
          </span>
        </div>
      )}

      {dropdown === dropdownType && (
        <div className="absolute w-full mt-2 bg-white shadow-[0_0_20px] shadow-black/20 rounded-[10px] z-10 max-h-[320px] overflow-y-auto dropdown">
          {list.map((subitem, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-primary/5"
              onClick={() =>
                typeOfData === "boolean"
                  ? (dispatch(
                      stateMethod({
                        value: subitem === "Yes",
                        type: stateType,
                      })
                    ),
                    setDropdown(""))
                  : (dispatch(
                      stateMethod({
                        value: dataType ? subitem[dataType] : subitem,
                        type: stateType,
                      })
                    ),
                    setDropdown(""))
              }
            >
              <div className="size-10 lg:size-16 object-cover p-0.5 flex items-center justify-center bg-white shadow-lg rounded-full">
                <Image
                  src={subitem.image}
                  alt={viewType ? subitem[viewType] : "option"}
                  width={64} 
                  height={64} 
                  className="w-full h-auto object-cover rounded-full"
                />
              </div>
              <span className="lg:text-lg">
                {viewType ? subitem[viewType] : subitem}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputDropDown;

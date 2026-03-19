"use client";
import { useEffect, useRef, useState } from "react";

const InputFieldText2 = ({
  inputType,
  value,
  dispatch,
  changeValue,
  changeObjectValue,
  idx,
  index,
  items,
  type,
  id,
  dropdown,
  setDropdown,
  validation,
  validationMethod,
  required,
  readOnly,
  edit,
  changeEdit,
  placeholder,
}) => {
  const inputRef = useRef(null);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setHasValue(!!inputValue); // Update state based on value
    dispatch(
      changeObjectValue
        ? changeObjectValue({ idx, value: inputValue, index, items, type })
        : changeValue({ value: inputValue, type: type })
    );
    setDropdown(dropdown);
  };

  return (
    <div className="relative w-full p-2">
      <input
        ref={inputRef}
        id={id}
        type={inputType}
        className="w-full bg-white px-5 py-5 text-black rounded-full outline-none border border-primary focus:ring-2 focus:ring-primary focus:border-transparent shadow-[0_0_10px] shadow-primary/20"
        placeholder={placeholder ? placeholder : ""}
        value={value}
        readOnly={readOnly ? true : false}
        onChange={handleChange}
      />
      {required && (
        <div className="absolute flex items-center px-2 py-[2px] w-max mx-2 gap-x-3 border-[1px] border-red-500 rounded-lg mt-[2px]">
          <span className="text-red-500 text-[12px]">
            {type == "interiorSquareFeet"
              ? "Please enter sqft or select Skip"
              : "Please fill out this field"}
          </span>
        </div>
      )}
    </div>
  );
};

export default InputFieldText2;

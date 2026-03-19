"use client";
import { useEffect, useRef, useState } from "react";

const InputFieldSecondary = ({
  inputType,
  placeholder,
  value,
  dispatch,
  changeValue,
  changeObjectValue,
  idx,
  index,
  items,
  type,
  inputClassOne,
  inputClassTwo,
  inputClassThree,
  id,
  dropdown,
  setDropdown,
  validation,
  validationMethod,
  required,
  readOnly,
}) => {
  const inputRef = useRef(null);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  const handleChange = (e) => {
    let inputValue = e.target.value;

    if (validation && typeof validationMethod === "function") {
      inputValue = validationMethod(inputValue);
    }

    dispatch(
      changeObjectValue
        ? changeObjectValue({ idx, value: inputValue, index, items, type })
        : changeValue({ value: inputValue, type: type })
    );

    setHasValue(!!inputValue);
    setDropdown(dropdown);
  };

  return (
    <div className="relative w-full grow max-w-[380px]">
      <input
        ref={inputRef}
        id={id}
        type={inputType}
        className={`
          w-full border border-[#656E81] rounded-xl px-5 py-3 shadow-[0_2px_30px] shadow-black/20 focus:ring-primary focus:border-primary outline-none
          ${value ? "has-value" : ""}
          ${inputClassOne}
          ${inputClassTwo}
          ${inputClassThree}
        `}
        placeholder={placeholder ? placeholder : ""}
        value={value}
        readOnly={readOnly ? true : false}
        onChange={handleChange}
      />
      {required && (
        <div className="flex items-center px-2 py-[2px] w-max mx-1 gap-x-3 border-[1px] border-red-300 rounded-lg mt-1">
          <span className="text-red-500 text-[12px]">
            Address field required
          </span>
        </div>
      )}
    </div>
  );
};

export default InputFieldSecondary;

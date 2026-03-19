"use client";
import { useEffect, useRef, useState } from "react";

const InputFieldText3 = ({
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
    <input
      ref={inputRef}
      id={id}
      type={inputType}
      className="rounded-lg min-w-[135px] text-black p-2.5 border-2 border-white bg-white outline-none"
      placeholder={placeholder ? placeholder : ""}
      value={value}
      readOnly={readOnly ? true : false}
      onChange={handleChange}
    />
  );
};

export default InputFieldText3;

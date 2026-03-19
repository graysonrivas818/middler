const InputTextArea = ({ dispatch, changeValue, value, placeholder, type }) => {
  return (
    <div>
      <textarea
        id="message"
        rows="4"
        className="w-full bg-white resize-none rounded-xl px-3 py-5 outline-none border border-white focus:border-primary focus:shadow-[0_0_10px] shadow-primary/20 shadow-none transition-all duration-300 ease-in-out"
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          dispatch(changeValue({ value: e.target.value, type: type }))
        }
      />
    </div>
  );
};

export default InputTextArea;

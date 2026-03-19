import React from "react";

const SwiperBtn = ({ direction, onClick, w_h, bg }) => {
  const isPrev = direction === "prev";

  const svgPath = isPrev
    ? "M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18"
    : "M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18";

  return (
    <div
      className={`absolute ${w_h || "lg:size-14"} ${
        bg || "hover:bg-primary"
      } backdrop-blur-[10px] border-2 border-primary text-primary hover:text-white rounded-full inline-flex items-center justify-center w-[38px] h-[38px] transition-all duration-200 ease-in-out z-[1] top-10 cursor-pointer ${
        isPrev ? "right-20" : "right-8"
      } group`}
      onClick={onClick}
    >
      {isPrev ? (
        <svg
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-primary group-hover:fill-white transition-all duration-200 ease-in-out"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.29219 14.9593C7.92028 15.3313 7.31723 15.3313 6.94533 14.9593L0.278651 8.29265C-0.0932534 7.92075 -0.0932534 7.3177 0.278651 6.94579L6.94533 0.279118C7.31723 -0.0927876 7.92028 -0.0927876 8.29219 0.279118C8.66409 0.651023 8.66409 1.25407 8.29219 1.62598L3.25132 6.66684L16.1902 6.66684C16.7162 6.66684 17.1426 7.09322 17.1426 7.61922C17.1426 8.14522 16.7162 8.57161 16.1902 8.57161L3.25132 8.5716L8.29219 13.6125C8.66409 13.9844 8.66409 14.5874 8.29219 14.9593Z"
          />
        </svg>
      ) : (
        <svg
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-primary group-hover:fill-white transition-all duration-200 ease-in-out"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.85039 0.278943C9.2223 -0.0929811 9.82535 -0.0929811 10.1973 0.278943L16.8639 6.94563C17.2358 7.31753 17.2358 7.92058 16.8639 8.29249L10.1973 14.9592C9.82535 15.3311 9.2223 15.3311 8.85039 14.9592C8.47849 14.5873 8.47849 13.9842 8.85039 13.6123L13.8913 8.57144L0.952382 8.57144C0.426401 8.57144 0 8.14506 0 7.61906C0 7.09306 0.426401 6.66668 0.952382 6.66668L13.8913 6.66668L8.85039 1.62582C8.47849 1.25389 8.47849 0.650877 8.85039 0.278943Z"
          />
        </svg>
      )}
    </div>
  );
};

export default SwiperBtn;

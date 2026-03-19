import Image from "next/image";

const GoogleRevs = () => {
  return (
    <div className="rounded-[86px] py-3 pl-5 pr-[27px] bg-gradient-to-b from-white to-[#f3f3f3] grd_shdow-2 flex items-center justify-center gap-2.5">
      <div className="rounded-full p-2.5 bg-white dbl_shw">
        <Image
          src="/images/icons/google.webp"
          alt="Google icon"
          width={30}
          height={30}
          className="size-[30px]"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="font-semibold text-sm tracking-[2%]">
          5 Star Reviews
        </span>
        <span className="flex items-center gap-[5px]">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.07748 0.800369C8.21047 0.391069 8.78953 0.391068 8.92251 0.800368L10.4209 5.41187C10.4804 5.59492 10.6509 5.71885 10.8434 5.71885H15.6922C16.1226 5.71885 16.3015 6.26956 15.9534 6.52252L12.0306 9.37258C11.8749 9.48571 11.8097 9.68624 11.8692 9.86928L13.3676 14.4808C13.5005 14.8901 13.0321 15.2304 12.6839 14.9775L8.76113 12.1274C8.60542 12.0143 8.39458 12.0143 8.23887 12.1274L4.31609 14.9775C3.96792 15.2304 3.49946 14.8901 3.63245 14.4808L5.13082 9.86928C5.19029 9.68624 5.12514 9.48571 4.96943 9.37258L1.04665 6.52252C0.69848 6.26956 0.877416 5.71885 1.30778 5.71885H6.1566C6.34907 5.71885 6.51964 5.59492 6.57912 5.41187L8.07748 0.800369Z"
                fill="url(#paint0_linear_4303_1549)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_4303_1549"
                  x1="-0.5"
                  y1="8.5"
                  x2="17.5"
                  y2="8.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#275FF6" />
                  <stop offset="1" stopColor="#FF4545" />
                </linearGradient>
              </defs>
            </svg>
          ))}
        </span>
      </div>
    </div>
  );
};

export default GoogleRevs;

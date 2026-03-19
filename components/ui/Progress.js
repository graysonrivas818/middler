import { FaCheck } from "react-icons/fa";
import Image from "next/image";

/**
 * Progress bar for three fixed stages.
 *
 * @param {0|1} step – Which stage is active (0 = “Project Details”, 1 = “See Prices”)
 */
const Progress = ({ step = 0 }) => {
  // helper: true ► active/done style, false ► upcoming style
  const isActive = (idx) => idx === step;

  return (
    <div className="lg:px-[35px] pt-6 lg:py-5 2xl:pb-2.5 mt-3 lg:mt-0 flex items-center justify-center max-[400px]:gap-x-[105px] gap-x-[128px] lg:gap-x-[150px]">
      <div
        className={`size-7 lg:size-10 rounded-full relative flex items-center justify-center
          ${isActive(0)
            ? "bg-primary text-white"
            : "border-2 border-primary bg-white"
          }
          before:absolute before:top-1/2 before:-translate-y-1/2 before:left-full
          before:h-0.5 lg:before:h-[3px] before:w-[128px] max-[400px]:before:w-[105px]! lg:before:w-[150px]
          before:bg-[#6F6F6F] before:z-0 after:absolute after:top-1/2 after:-translate-y-1/2 after:left-full after:h-0.5 lg:after:h-[3px] after:w-[128px] max-[400px]:after:w-[105px]! lg:after:w-[150px] after:bg-primary`}
      >
        {isActive(0) ? (
          <FaCheck />
        ) : (
          <span className="inline-block size-2 lg:size-3.5 rounded-full bg-primary" />
        )}
        <span
          className={`max-lg:text-[10px] ${isActive(0) ? "lg:font-bold" : "font-normal"
            } text-primary absolute left-1/2 -translate-x-1/2 -top-6 whitespace-nowrap`}
        >
          Project Details
        </span>
      </div>

      {/* ────── 2. See Prices ────── */}
      <div
        className={`size-7 lg:size-10 rounded-full relative flex items-center justify-center
          ${isActive(1)
            ? "bg-primary text-white"
            : "border-2 border-primary bg-white"
          }
          before:absolute before:top-1/2 before:-translate-y-1/2 before:left-full before:-translate-x-px before:ml-0.5
          before:h-0.5 lg:before:h-[3px] before:w-[130px] max-[400px]:before:w-[105px]! lg:before:w-[150px]
          before:bg-[#6F6F6F]`}
      >
        {isActive(1) ? (
          <FaCheck />
        ) : (
          <span className="inline-block size-2 lg:size-3.5 rounded-full bg-primary" />
        )}
        <span
          className={`max-lg:text-[10px] ${isActive(1) ? "lg:font-bold" : "font-normal"
            } text-primary absolute left-1/2 -translate-x-1/2 -top-6 whitespace-nowrap`}
        >
          See Prices
        </span>
      </div>

      {/* ────── 3. Use it (static) ────── */}
      <div className="size-7 lg:size-10 rounded-full border-2 bg-white border-[#6F6F6F] flex items-center justify-center relative">
        <span className="max-lg:text-[10px] font-normal text-[#6F6F6F] absolute left-1/2 -translate-x-1/2 -top-6 whitespace-nowrap">
          Use it
        </span>
        <Image
          src="/images/icons/paint.webp"
          alt="Paint icon"
          width={24}
          height={24}
          className="w-6"
        />
      </div>
    </div>
  );
};

export default Progress;

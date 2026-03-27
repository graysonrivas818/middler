'use client';
import PreHeading from "@/components/ui/PreHeading";

const Heading = ({ oh = false, preheading = "", heading = "", className = "text-[22px]", highlight = "", phClassname = "" }) => {
  const escapeRegex = (string) =>
    string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const escapedHighlight = escapeRegex(highlight);
  const parts = heading.split(new RegExp(`(${escapedHighlight})`, "gi"));

  return (
    <div className="flex flex-col items-center gap-2.5 lg:gap-4">
      {!oh && <PreHeading children={preheading} className={phClassname} />}
      <h2 className={`font-bold lg:text-[50px] text-center ${className}`}>
        {parts.map((part, idx) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={idx} className="text-primary-800">{part}</span>
          ) : (
            <span key={idx}>{part}</span>
          )
        )}
      </h2>
    </div>
  );
};

export default Heading;

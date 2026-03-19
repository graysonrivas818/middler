import Link from "next/link";

const Button = ({ children, onClick, className, type, href, disabled, small }) => {
  const Tag = href ? Link : "button";
  return (
    <Tag
      {...(href
        ? { href: href }
        : { onClick: onClick, type: type, disabled: disabled })}
      className={`bg-primary hover:bg-primary-900 text-white text-sm font-semibold rounded-md ${small ? "py-3 px-7 leading-[15px]" : "px-12 py-4"} transition-all duration-300 ease-in-out ${className}`}
    >
      {children}
    </Tag>
  );
};

export default Button;

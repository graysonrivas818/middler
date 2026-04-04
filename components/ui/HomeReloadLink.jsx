"use client";

import Link from "next/link";

const HomeReloadLink = ({ children, className, ariaLabel }) => {
  const handleClick = (event) => {
    event.preventDefault();
    window.location.assign("/");
  };

  return (
    <Link
      href="/"
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
};

export default HomeReloadLink;
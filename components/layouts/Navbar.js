'use client';

import { menuItems } from "@/app/constants";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const Navbar = () => {
  const [mobileImgs, setMobileImgs] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);

  const pathname = usePathname();

  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 992;
      setMobileImgs(isSmallScreen ? true : false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false);
    };

    router.events?.on?.("routeChangeStart", handleRouteChange);
    return () => {
      router.events?.off?.("routeChangeStart", handleRouteChange);
    };
  }, [router]);
  return (
    <div
      className="max-lg:flex justify-between items-center max-lg:w-full relative"
    >
      <Link href="/" className="block max-lg:grow max-lg:text-left"
            aria-label="Go to Middler Home">
        <Image
          src={mobileImgs ? "/images/logo.webp" : "/images/logo.webp"}
          alt="Middler Logo"
          width={280}
          height={100}
          className="max-w-28 lg:max-w-[280px] inline-block"
        />
      </Link>
      <button
        onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
        className="flex lg:hidden"
      >
        <span className="w-[26px] h-4 block relative">
          <span
            className={`h-0.5 bg-black block left-0 rounded-xl w-full transition-all duration-300 absolute ${isMobileMenuOpen
              ? "rotate-45 top-1/2 -translate-y-1/2"
              : "top-0"
              }`}
          />
          <span
            className={`h-0.5 bg-black block left-0 rounded-xl w-4/5 transition-all duration-300 absolute ${isMobileMenuOpen ? "opacity-0" : "top-1/2 -translate-y-1/2"
              }`}
          />
          <span
            className={`h-0.5 bg-black block left-0 rounded-xl w-full transition-all duration-300 absolute ${isMobileMenuOpen
              ? "-rotate-45 top-1/2 -translate-y-1/2"
              : "bottom-0"
              }`}
          />
        </span>
      </button>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div ref={dropdownRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-white border-t border-t-primary shadow-[0_10px_10px_rgba(0,0,0,0.2)] rounded-b-2xl px-5 py-4 absolute top-full left-0 w-full z-[1001]"
          >
            <ul className="flex flex-col gap-4">
              {menuItems.slice(0, 3).map((item, index) => (
                <li key={index} className="pl-1">
                  <Link
                    href={item.url}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block ${pathname === item.url
                      ? "text-primary font-semibold"
                      : "text-black hover:text-primary"
                      } transition-all duration-200 ease-in-out`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Navbar

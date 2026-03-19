"use client";

import { menuItems } from "@/app/constants";
import Button from "@/components/ui/Button";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

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

  // Close menu on route change
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
    <header className=" absolute z-[1000] w-full top-0 left-0 lg:pt-5">
      <div className="container max-lg:px-0!">
        <nav
          ref={dropdownRef}
          className="relative flex items-center justify-between bg-white shadow-[0_4px_32px_rgba(0,0,0,0.25)] px-5 py-4 lg:rounded-[10px]"
        >
          <Link className="inline-block" href="/" aria-label="Middler Home">
            <Image
              src="/images/logo.webp"
              alt="Middler Home"
              width={192}
              height={64} 
              className="w-28 lg:w-48 h-auto"
            />
            <span className="sr-only">Go to Middler Homepage</span>
          </Link>

          <ul className="hidden lg:flex items-center gap-x-2">
            {menuItems.slice(0, 2).map((item, index) => (
              <li key={index} className="px-4">
                <Link
                  href={item.url}
                  className={` ${pathname === item.url
                    ? "text-primary font-semibold"
                    : "text-black hover:text-primary"
                    } transition-all duration-200 ease-in-out`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <Button className="max-lg:hidden" href="/paint-estimator">
            Free Estimator
          </Button>

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
        </nav>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-white border-t border-t-primary shadow-[0_10px_10px_rgba(0,0,0,0.2)] rounded-b-2xl px-5 py-4 absolute top-full left-0 w-full z-[1001]"
          >
            <ul className="flex flex-col gap-4">
              {menuItems.slice(0, 2).map((item, index) => (
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
              <li className="my-4">
                <Button small className="w-full py-2! px-3.5!" href="/paint-estimator">
                  Free Estimator
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

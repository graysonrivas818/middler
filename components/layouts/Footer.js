import { menuItems, socials } from "@/app/constants";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const footerLinks = [
    { name: "Home", url: "/" },
    { name: "Interior Painting", url: "/interior-painting-cost-calculator" },
    { name: "Exterior Painting", url: "/exterior-painting-cost-calculator" },
    { name: "Cost to Paint a House", url: "/cost-to-paint-a-house" },
    { name: "Blog", url: "/blog" },
    { name: "Privacy Policy", url: "/privacy-policy" },
    { name: "Terms of Service", url: "/terms-of-service" }
  ];

  return (
    <footer className="bg-gradient-to-br lg:bg-gradient-to-r from-primary-950 to-primary pt-[60px] px-6 pb-5 lg:p-[60px]">
      <div className="container">
        <div className="flex flex-wrap justify-between gap-y-14 pb-5 mb-5 lg:pb-4 lg:mb-4 border-b border-b-white/60">
          <div className="w-full lg:max-w-[481px] flex flex-col gap-y-[19px]">
            <Link href="/" aria-label="Go to homepage">
              <Image
                src="/images/logo_w.webp"
                alt="Company white logo"
                width={236}
                height={100}
                className="max-w-[175px] lg:max-w-[236px]"
              />
            </Link>
            <p className="text-[11px] lg:text-[15px] font-extralight leading-[17px] lg:leading-10 text-white">
              Middler estimates painting jobs with smart technology that delivers consistent, accurate, reliable, and professional results every time.
            </p>
            <ul className="flex lg:hidden items-center gap-4">
              {socials.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <li key={idx}>
                    <Link href={social.url} className="text-white text-xl" aria-label={social.alt}>
                      <Icon />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="w-full lg:max-w-[151px] px-1">
            <p className="text-[22px] leading-4 font-bold text-white mb-5">
              Links
            </p>
            <ul className="flex flex-col gap-3">
              {footerLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.url}
                    className="text-[17px] leading-none text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <p className="text-white max-[400px]:text-xs! text-sm leading-[15px] font-light">
            Copyright &copy; {new Date().getFullYear()}{" "}
            Middler&nbsp;&nbsp;|&nbsp;&nbsp;All rights reserved
          </p>
          <ul className="hidden lg:flex items-center gap-4">
            {socials.map((social, idx) => {
              const Icon = social.icon;
              return (
                <li key={idx}>
                  <Link href={social.url} target="_blank" className="text-white text-xl" aria-label={social.alt}>
                    <Icon />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

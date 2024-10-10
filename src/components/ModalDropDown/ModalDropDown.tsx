"use client";

import classNames from "classnames";
import { motion, useAnimate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { header_data } from "../Header/data";

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "ul",
      {
        clipPath: isOpen
          ? "inset(0% 0% 0% 0% round 10px)"
          : "inset(0% 0% 100% 100% round 10px)",
      },
      {
        type: "spring",
        bounce: 0,
        duration: 0.5,
      }
    );
  }, [animate, isOpen]);

  return scope;
}

export function ModalDropDown() {
  const pathname = usePathname();

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const scope = useMenuAnimation(isOpen);

  const redirect = useCallback(
    (pathname: string) => {
      setIsOpen(false);
      const section = document.getElementById(pathname);

      section
        ? section.scrollIntoView({ behavior: "smooth" })
        : router.push("/");
    },
    [router]
  );

  return (
    <div className="menu relative z-9" ref={scope}>
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="text-[15px] leading-5 text-black px-3 py-2 md:py-3 rounded-full bg-black17 flex flex-row items-center gap-2"
      >
        <Image
          src={isOpen ? "/icon/icon-close.svg" : "/icon/icon-menu.svg"}
          alt="LOGO"
          width={24}
          height={24}
        />
      </motion.button>

      <ul
        className="absolute -right-4 top-[56px] bg-white p-6 rounded-2xl min-w-[320px] z-20"
        style={{
          clipPath: "inset(0% 0% 100% 100% round 10px)",
        }}
      >
        {header_data.map((item) => {
          return (
            <li key={item.title} className="mb-6">
              {item.typePages ? (
                <div className="flex justify-between">
                  <Link
                    onClick={() => setIsOpen(false)}
                    href={item.pathname}
                    className={`${
                      pathname === item.pathname
                        ? "text-black"
                        : "text-[#A7AEAD]"
                    } text-2xl leading-[24px] text-black font-medium px-[16px] py-[4px] hover:text-[#202025] transition-all duration-500 ease-linear`}
                  >
                    {item.title}
                  </Link>
                  <Image
                    src={isOpen ? "/icon/arrow.svg" : "/icon/icon-menu.svg"}
                    alt="LOGO"
                    width={24}
                    height={24}
                  />
                </div>
              ) : (
                <button
                  onClick={() => redirect(item.pathname)}
                  className={classNames(
                    "text-2xl leading-[24px] text-black font-medium px-[16px] py-[4px] hover:text-[#202025] transition-all duration-500 ease-linear"
                    // {
                    //   "!text-[#202025]": true,
                    // }
                  )}
                >
                  {item.title}
                </button>
              )}
            </li>
          );
        })}

        <Link
          href={"/staking"}
          className="text-2xl leading-[24px] text-black font-medium px-[16px] py-[4px] hover:text-[#202025] transition-all duration-500 ease-linear"
        >
          Launch App
        </Link>
      </ul>
    </div>
  );
}

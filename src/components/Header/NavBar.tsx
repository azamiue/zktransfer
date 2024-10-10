import { sendGAEvent } from "@next/third-parties/google";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { header_data } from "./data";
export function NavBar() {
  const pathname = usePathname();

  const router = useRouter();

  const redirect = useCallback(
    (pathname: string) => {
      const section = document.getElementById(pathname);

      section
        ? section.scrollIntoView({ behavior: "smooth" })
        : router.push("/");
    },
    [router]
  );

  return (
    <nav className="hidden md:block flex-1">
      <ul className="flex items-center gap-[8px]">
        {header_data.map((item, idx) => {
          return (
            <li key={idx}>
              {item.typePages ? (
                <Link
                  onClick={() => {
                    sendGAEvent({
                      event: "buttonHeader",
                      value: item.pathname,
                    });
                  }}
                  href={item.pathname}
                  className={`text-[15px] flex leading-[24px] text-[#A7AEAD] font-medium px-[16px] py-[4px] hover:text-[#202025] transition-all duration-500 ease-linear ${
                    pathname === item.pathname ? "text-black" : "text-[#A7AEAD]"
                  }`}
                >
                  {item.title}
                </Link>
              ) : (
                <button
                  onClick={() => {
                    sendGAEvent({
                      event: "buttonHeader",
                      value: item.pathname,
                    });
                    redirect(item.pathname);
                  }}
                  className={classNames(
                    "text-[15px] leading-[24px] text-[#A7AEAD] font-medium px-[16px] py-[4px] hover:text-[#202025] transition-all duration-500 ease-linear"
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
      </ul>
    </nav>
  );
}

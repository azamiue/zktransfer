"use client";

import { staking_data } from "@/containers/staking/layout/data";
import classNames from "classnames";
import { useAnimate } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NotFound } from "../not-found/not-found";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

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

export function ModalHeaderDropDown() {
  const pathname = usePathname();

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = useCallback((isOpen: boolean) => {
    setIsOpen(isOpen);
  }, []);

  return (
    <div className="menu relative z-9 ml-3">
      <Dropdown onOpenChange={handleOpenChange}>
        <DropdownTrigger>
          <Image
            src={isOpen ? "/icon/icon-close.svg" : "/icon/icon-menu.svg"}
            alt="LOGO"
            width={24}
            height={24}
          />
        </DropdownTrigger>

        <DropdownMenu
          aria-label="Dynamic Actions"
          itemClasses={{
            wrapper: "bg-[#ffffff]",
            base: "hover:!bg-white",
          }}
        >
          <DropdownItem classNames={{ wrapper: "bg-white" }} textValue="12">
            {staking_data.map((item, idx) => {
              return (
                <Link
                  onClick={(e) => {
                    const array_path = ["/staking-lp", "/staking"];

                    if (!array_path.includes(item.path)) {
                      e.preventDefault();
                      setIsOpen(!isOpen);
                      return toast.success(<NotFound />, {
                        position: "top-center",
                        className:
                          "w-fit text-center !mx-auto !mb-[0px] !rounded-full !px-[24px] !py-[12px]",
                        autoClose: 1500,
                      });
                    }
                    setIsOpen(!isOpen);
                  }}
                  key={idx}
                  href={item.path}
                  className="flex items-center gap-[12px] p-[12px]"
                >
                  <Image
                    src={item.path === pathname ? item.src1 : item.src}
                    alt={item.title}
                    width={24}
                    height={24}
                  />

                  <p
                    className={classNames(
                      "text-[16px] leading-[24px] text-[#A7AEAD]",
                      { "text-black": pathname === item.path }
                    )}
                  >
                    {item.title}
                  </p>
                </Link>
              );
            })}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

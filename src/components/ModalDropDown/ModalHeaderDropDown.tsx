"use client";
import { useAnimate } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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
          <DropdownItem
            classNames={{ wrapper: "bg-white" }}
            textValue="12"
          ></DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

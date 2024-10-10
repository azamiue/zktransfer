import { useEffect, useState } from "react";

type ScrollDirectionProps = "down" | "up" | null;

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirectionProps>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    function updateScrollDirection() {
      const scrollY = window.scrollY;

      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    }

    window.addEventListener("scroll", updateScrollDirection); // add event listener

    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  return scrollDirection;
}

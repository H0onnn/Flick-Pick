import { useState, useLayoutEffect } from "react";

export const useScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useLayoutEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    isScrolled,
  };
};

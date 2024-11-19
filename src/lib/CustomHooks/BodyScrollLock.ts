import { useEffect, useRef, useState } from "react";

const useBodyScrollLock = (): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
] => {
  const [open, setopen] = useState(false);
  const scrollY = useRef(0);
  useEffect(() => {
    if (open && window.document.body.scrollHeight >= window.innerHeight) {
      scrollY.current = window.scrollY;
      window.document.body.style.overflow = "hidden";
      // Prevent content jump
      window.document.body.style.top = `-${scrollY.current}px`;
      window.document.body.classList.add("scrolllock");
    } else {
      window.document.body.classList.remove("scrolllock");
      window.document.body.style.overflow = "";

      window.scrollTo(0, scrollY.current); //reslove back to top after close menubar
      window.document.body.style.top = "";
    }
  }, [open]);

  return [open, setopen];
};
export default useBodyScrollLock;

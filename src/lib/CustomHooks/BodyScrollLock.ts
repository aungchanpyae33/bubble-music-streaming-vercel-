import { useEffect, useRef, useState } from "react";

const useBodyScrollLock = ({
  isCoverScroll,
}: {
  isCoverScroll: boolean;
}): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [open, setopen] = useState(false);
  const scrollY = useRef(0);
  useEffect(() => {
    if (open && window.document.body.scrollHeight >= window.innerHeight) {
      scrollY.current = window.scrollY;
      window.document.body.style.overflow = "hidden";
      // Prevent content jump
      window.document.body.style.top = `-${scrollY.current}px`;
      if (isCoverScroll) {
        window.document.body.classList.add("scrolllock");
      } else {
        window.document.body.classList.add("noScrolllock");
      }
    } else {
      if (isCoverScroll) {
        window.document.body.classList.remove("scrolllock");
      } else {
        window.document.body.classList.remove("noScrolllock");
      }
      window.document.body.style.overflow = "";

      window.scrollTo(0, scrollY.current); //reslove back to top after close menubar
      window.document.body.style.top = "";
    }
  }, [open, isCoverScroll]);

  return [open, setopen];
};
export default useBodyScrollLock;

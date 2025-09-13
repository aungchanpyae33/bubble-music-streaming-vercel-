import { useEffect, useRef, useState } from "react";

const useBodyScrollLock = ({
  isCoverScroll,
}: {
  isCoverScroll: boolean;
}): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [open, setOpen] = useState(false);
  const scrollY = useRef(0);
  const mainElement = document.querySelector("main");
  useEffect(() => {
    if (open && mainElement!.scrollHeight >= window.innerHeight) {
      scrollY.current = window.scrollY;
      mainElement!.style.overflow = "hidden";
      // Prevent content jump
      mainElement!.style.top = `-${scrollY.current}px`;
      if (isCoverScroll) {
        mainElement!.classList.add("scrolllock");
        console.log("ue");
      } else {
        mainElement!.classList.add("noScrolllock");
      }
    } else {
      if (isCoverScroll) {
        mainElement!.classList.remove("scrolllock");
      } else {
        mainElement!.classList.remove("noScrolllock");
      }
      mainElement!.style.overflow = "";

      window.scrollTo(0, scrollY.current); //reslove back to top after close menubar
      mainElement!.style.top = "";
    }
  }, [open, isCoverScroll, mainElement]);

  return [open, setOpen];
};
export default useBodyScrollLock;

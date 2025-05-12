import { RefObject } from "react";

function ScrollHorizontal(
  direction: "left" | "right",
  divRef: RefObject<HTMLDivElement | null>
) {
  if (divRef.current) {
    const clientWidth = divRef.current.clientWidth;
    divRef.current.scrollBy({
      left: direction === "left" ? -clientWidth : clientWidth,
      behavior: "smooth",
    });
  }
}
export default ScrollHorizontal;

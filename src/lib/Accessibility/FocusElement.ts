import { RefObject } from "react";

export const FocusElement = (
  targeElement: HTMLElement,
  selector: string,
  number: RefObject<number>
) => {
  const target = targeElement.querySelector(
    `[data-focus="${selector}${number.current}"]`
  ) as HTMLElement;
  if (!target) return;
  target.focus();

  target.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
};

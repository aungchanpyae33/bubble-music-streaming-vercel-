import { ReactNode, RefObject, useEffect, useRef } from "react";
type MediaQuery = `(width ${">=" | "<=" | ">" | "<"} ${string})`;
interface Props extends React.ComponentProps<"div"> {
  refFocus: RefObject<HTMLDivElement | null>;
  children: ReactNode;
  mqAffectsChild?: MediaQuery[];
}
function FocusTrap({ children, refFocus, mqAffectsChild }: Props) {
  const compareElement = useRef<HTMLElement>(null);

  useEffect(() => {
    const mediaQueries: MediaQueryList[] = [];
    const copyRef = refFocus!.current!;
    let lastClickMustBeToClose = false;
    //to handle when lastelemet is focus and then when resize , its loss focus
    const focusableElements = Array.from(
      copyRef.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
      )
    ).reverse() as HTMLElement[];
    // to get focuvisiable lastElement in document
    function findLastElement() {
      compareElement!.current! = focusableElements.find(
        (element) => (element as HTMLElement).offsetParent !== null
      ) as HTMLElement;
    }
    findLastElement(); //initialize in audiofull load
    //to handle tailwind change hidden style
    mqAffectsChild &&
      mqAffectsChild.forEach((item, index) => {
        mediaQueries[index] = window.matchMedia(item);
        mediaQueries[index].addEventListener("change", findLastElement);
      });

    // to handle when lastElement is focus and then resize the window to some breakpoint , and it loss focus state which can lead to break focus trap
    function handleOut(e: FocusEvent) {
      // if focus loss is cause by tab key , return it
      if (e.relatedTarget) {
        return;
      }
      // check if last element is on the screen or not
      if (compareElement.current !== focusableElements[0]) {
        lastClickMustBeToClose = true;
      }
    }

    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Tab") {
        if (
          e.shiftKey &&
          document.activeElement ===
            focusableElements[focusableElements.length - 1]
        ) {
          e.preventDefault();
          if (mqAffectsChild) {
            lastClickMustBeToClose = false;
          }
          compareElement.current?.focus();
          return;
        }
        // if lastelement is loss focus by resize window, force focus to firstElement
        if (mqAffectsChild && lastClickMustBeToClose && !e.shiftKey) {
          e.preventDefault();
          lastClickMustBeToClose = false;
          focusableElements[focusableElements.length - 1].focus();
          return;
        } else {
          lastClickMustBeToClose = false;
        }

        //back to first elemet
        if (!e.shiftKey && document.activeElement === compareElement.current) {
          if (mqAffectsChild) {
            lastClickMustBeToClose = false;
          }
          e.preventDefault();
          focusableElements[focusableElements.length - 1].focus();
        }
      }
    }
    if (mqAffectsChild) {
      copyRef.addEventListener("focusout", handleOut);
    }
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      if (mqAffectsChild) {
        copyRef.removeEventListener("focusout", handleOut);
        mediaQueries.forEach((item) => {
          item.removeEventListener("change", findLastElement);
        });
      }
    };
  }, [refFocus, mqAffectsChild]);

  return children;
}

export default FocusTrap;

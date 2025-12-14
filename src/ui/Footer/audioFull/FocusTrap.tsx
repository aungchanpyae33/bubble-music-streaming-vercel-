import { ReactNode, RefObject, useEffect, useRef } from "react";
type MediaQuery = `(width ${">=" | "<=" | ">" | "<"} ${string})`;
interface Props extends React.ComponentProps<"div"> {
  refFocus: RefObject<HTMLElement | null>;
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
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), details, [tabindex]:not([tabindex="-1"])'
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
        const mq = window.matchMedia(item);
        mediaQueries[index] = mq;

        if (mq.addEventListener) {
          mq.addEventListener("change", findLastElement); // Modern browsers
        } else {
          // Fallback for older browsers (deprecated)
          // @ts-ignore: Safari/ 2020
          mq.addListener(findLastElement);
        }
      });

    // to handle when lastElement is focus and then resize the window to some breakpoint , as it loss focus state which can lead to break focus trap
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
          if ("removeEventListener" in item) {
            item.removeEventListener("change", findLastElement); // Modern browsers
          } else {
            // Fallback for older browsers (deprecated)
            // @ts-ignore: Safari 2020
            item.removeListener(findLastElement);
          }
        });
      }
    };
  }, [refFocus, mqAffectsChild]);

  return children;
}

export default FocusTrap;

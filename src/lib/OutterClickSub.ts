import React, { RefObject, useContext, useEffect } from "react";
import { ContextMoreOptionStack } from "@/ui/trackComponent/MoreOptionStackContext";

function OutterClickSub(
  portalElRef: RefObject<HTMLDivElement | null>,
  stackNum: number
) {
  const { stack, setStack } = useContext(ContextMoreOptionStack);
  // regiseterPortal is the container that store link between parent and sub parent link , like
  // parent own two element instand(own and its child) , if sub content does not have another sub option , sub will have (own instance)
  useEffect(() => {
    const copyRef = portalElRef.current;
    if (!copyRef) return;
    function OutterClickFunction(e: PointerEvent) {
      e.stopImmediatePropagation();
      if (stack > stackNum) {
        setStack(stackNum);
      }
    }

    copyRef.addEventListener("click", OutterClickFunction);
    return () => {
      copyRef.removeEventListener("click", OutterClickFunction);
    };
  }, [portalElRef, stack]);
}

export default OutterClickSub;

import React, { RefObject, useEffect, useMemo } from "react";
import { RegisterPortalValue } from "./CustomHooks/PortalRefControllStore";

function OutterClick(
  value: boolean,
  fun: React.Dispatch<React.SetStateAction<boolean>>,
  parentElement: RefObject<HTMLButtonElement | null>,
  registryPortal?: RegisterPortalValue
) {
  const passiveOptions = useMemo<AddEventListenerOptions>(
    () => ({ passive: true }),
    []
  );
  // regiseterPortal is the container that store link between parent and sub parent link , like
  // parent own two element instand(own and its child) , if sub content does not have another sub option , sub will have (own instance)
  useEffect(() => {
    function OutterClickFunction(e: MouseEvent | TouchEvent) {
      // parentElement is target trigger element , the reason to add /skip this element is to gave this button can close itself
      if (parentElement!.current!.contains(e.target as Node)) return;

      // check clicked target is in the portal
      if (registryPortal?.has(e.target as Node)) return;
      fun(false);
    }
    if (value) {
      document.addEventListener("mousedown", OutterClickFunction);
      document.addEventListener(
        "touchstart",
        OutterClickFunction,
        passiveOptions
      );
    }

    return () => {
      // console.log("iam only run");
      document.removeEventListener("mousedown", OutterClickFunction);
      document.removeEventListener(
        "touchstart",
        OutterClickFunction,
        passiveOptions
      );
    };
  }, [value, fun, parentElement, registryPortal, passiveOptions]);
}

export default OutterClick;

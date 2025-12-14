// This function returns true if the click is inside the parent button or inside any registered portal container.

import { RefObject } from "react";
import { RegisterPortalValue } from "./CustomHooks/PortalRefControllStore";

export function checkContainPortal(
  e: PointerEvent,
  parentElement: RefObject<HTMLButtonElement | null>,
  registryPortal?: RegisterPortalValue
) {
  const target = e.target as Node;

  // parentElement is target trigger element , the reason to add /skip this element is to gave this button can close itself
  if (parentElement.current && parentElement.current.contains(target)) {
    return true;
  }
  // check clicked target is in the portal
  if (registryPortal?.has(target)) {
    return true;
  }

  //  Otherwise → it's truly an outside click
  return false;
}

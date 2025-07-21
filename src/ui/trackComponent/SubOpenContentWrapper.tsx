"use client";
import { createPortal } from "react-dom";
interface SubOpenContentWrapperProps<T> {
  /** Zustand selector type */
  selector: (state: any) => T;
  useStore: (selector: (state: any) => T) => T;
  children: React.ReactNode;
}
function SubOpenContentWrapper<T>({
  selector,
  useStore,
  children,
}: SubOpenContentWrapperProps<T>) {
  const Isselected = useStore(selector);
  if (!Isselected) return null;
  return typeof window !== "undefined" && createPortal(children, document.body);
}

export default SubOpenContentWrapper;

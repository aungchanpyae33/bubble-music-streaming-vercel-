import { useContext, useEffect, useRef } from "react";
import { ContextMoreOptionStack } from "@/ui/trackComponent/MoreOptionStackContext";

export function usePortalStackRegister(): [
  React.RefObject<HTMLDivElement | null>,
  React.RefObject<number | null>
] {
  const { setStack } = useContext(ContextMoreOptionStack);
  const containerRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<number>(null);
  // useEffect(() => {
  //   setStack((pre) => {
  //     const newStacl = pre + 1;
  //     stackRef.current = newStacl;
  //     return newStacl;
  //   });
  //   return () => {
  //     // setStack((pre)=> pre -1)
  //   };
  // }, []);

  return [containerRef, stackRef];
}

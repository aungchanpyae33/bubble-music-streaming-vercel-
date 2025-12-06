import { useEffect, useRef } from "react";
import { RegisterPortalValue } from "./PortalRefControllStore";
// this hooks does feed the element when portal is mounted (menaing portal is open by click) and it feeds to the register portal ,
// it has two portal , for parent content that only trigger by parent trigger don't have parentRegisterPortal  but for the sub content suboption that will be trigger by the element of the parent toggle content will add those element to its own register portal and its parent register portal because parent need to watch it
export function usePortalRefRegister(
  registryPortal: RegisterPortalValue,
  parentRegisterPortal: RegisterPortalValue | undefined
) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (parentRegisterPortal) {
      parentRegisterPortal.add(el);
    }
    registryPortal.add(el);

    return () => {
      registryPortal.remove(el);
      if (parentRegisterPortal) {
        parentRegisterPortal.remove(el);
      }
    };
  }, [registryPortal, parentRegisterPortal]);

  return ref;
}

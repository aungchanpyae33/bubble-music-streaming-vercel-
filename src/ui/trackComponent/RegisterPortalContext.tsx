"use client";
import { createContext, ReactNode, useMemo } from "react";
import {
  createOutsideClickRegistryPortal,
  RegisterPortalValue,
} from "@/lib/CustomHooks/PortalRefControllStore";

interface PortalRegistryContextProps {
  registryPortal: RegisterPortalValue;
}

export const ContextPortalRegistry = createContext<PortalRegistryContextProps>({
  registryPortal: {
    add: (el: HTMLElement | null) => {},
    remove: (el: HTMLElement | null) => {},
    has: (target: Node) => false,
  },
});
function RegistryPortalContext({ children }: { children: ReactNode }) {
  const registryPortal = useMemo(() => createOutsideClickRegistryPortal(), []);
  const value = { registryPortal };
  return (
    <ContextPortalRegistry.Provider value={value}>
      {children}
    </ContextPortalRegistry.Provider>
  );
}

export default RegistryPortalContext;

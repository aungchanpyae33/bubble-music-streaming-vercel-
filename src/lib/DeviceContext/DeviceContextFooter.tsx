"use client";
import { createContext, ReactNode } from "react";
interface contextProps {
  device: string | undefined;
}
export const ContextDevice = createContext<contextProps>({
  device: undefined,
});
function DeviceContextFooter({
  device,
  children,
}: {
  device: string | undefined;
  children: ReactNode;
}) {
  const value = { device };
  return (
    <ContextDevice.Provider value={value}>{children}</ContextDevice.Provider>
  );
}

export default DeviceContextFooter;

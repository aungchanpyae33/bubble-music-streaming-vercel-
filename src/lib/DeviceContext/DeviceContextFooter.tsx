"use client";
import { createContext, ReactNode } from "react";
export interface contextProps {
  device:
    | "mobile"
    | "tablet"
    | "console"
    | "smarttv"
    | "wearable"
    | "xr"
    | "embedded"
    | "desktop";
}
export const ContextDevice = createContext<contextProps>({
  device: "mobile",
});
function DeviceContextFooter({
  device,
  children,
}: {
  device: contextProps["device"];
  children: ReactNode;
}) {
  const value = { device };
  return (
    <ContextDevice.Provider value={value}>{children}</ContextDevice.Provider>
  );
}

export default DeviceContextFooter;

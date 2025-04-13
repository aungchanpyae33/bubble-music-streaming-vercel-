import React, { createContext, SetStateAction, useState } from "react";

interface ContextVolumeProps {
  children: React.ReactNode;
}
interface contextProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}
export const volumeContext = createContext<contextProps>({
  open: false,
  setOpen: () => {},
});
function ContextVolume({ children }: ContextVolumeProps) {
  const [open, setOpen] = useState(false);
  const value = { open, setOpen };
  return (
    <div className="flex max-w-[250px] lg:w-full items-center  group  p-1 ">
      <volumeContext.Provider value={value}>{children}</volumeContext.Provider>
    </div>
  );
}

export default ContextVolume;

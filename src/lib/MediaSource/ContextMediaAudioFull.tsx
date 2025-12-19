import React, { createContext, SetStateAction, useState } from "react";
interface contextProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}
export const Context = createContext<contextProps>({
  open: false,
  setOpen: () => {},
});
function ContextMediaAudioFull({
  children,
  footerNaviRef,
}: {
  children: React.ReactNode;
  footerNaviRef: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const value = { open, setOpen };

  return (
    <Context.Provider value={value}>
      {children}
      {footerNaviRef}
    </Context.Provider>
  );
}

export default ContextMediaAudioFull;

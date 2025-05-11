import { createContext, Dispatch, SetStateAction, useState } from "react";

interface contextProps {
  hidden: boolean;
  setHidden: Dispatch<SetStateAction<boolean>>;
}
export const ToggleContentContext = createContext<contextProps>({
  hidden: false,
  setHidden: () => {},
});

function ContextToggleContent({
  children,
  show,
}: {
  children: React.ReactNode;
  show: boolean;
}) {
  const [hidden, setHidden] = useState(show);
  const value = { hidden, setHidden };
  return (
    <ToggleContentContext.Provider value={value}>
      {children}
    </ToggleContentContext.Provider>
  );
}

export default ContextToggleContent;

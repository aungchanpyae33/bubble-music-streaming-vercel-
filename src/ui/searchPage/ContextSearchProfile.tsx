"use client";
import { createContext } from "react";

interface SearchProfileContextProps {
  id: string;
}

export const SearchProfileContext = createContext<SearchProfileContextProps>({
  id: "",
});
function ContextSearchProfile({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const value = { id };

  return (
    <SearchProfileContext.Provider value={value}>
      {children}
    </SearchProfileContext.Provider>
  );
}

export default ContextSearchProfile;

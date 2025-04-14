import { ReactNode, useContext } from "react";
import { ContextToggle } from "./ToggleContext";

function SearchResultWrapper({ children }: { children: ReactNode }) {
  const { open } = useContext(ContextToggle);
  return open && children;
}

export default SearchResultWrapper;

import { ReactNode, useContext } from "react";
import ToggleContext, { ContextToggle } from "./ToggleContext";
import SearchResult from "./SearchResult";

function SearchResultWrapper({ children }: { children: ReactNode }) {
  const { open } = useContext(ContextToggle);
  return open && children;
}

export default SearchResultWrapper;

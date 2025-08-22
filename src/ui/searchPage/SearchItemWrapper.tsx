import React from "react";

interface SearchItemWrapperProps extends React.ComponentProps<"li"> {}
function SearchItemWrapper({ children }: SearchItemWrapperProps) {
  return (
    <li
      className=" transition-colors duration-150 flex gap-4 items-center justify-between  [&:has(:focus-visible)]:ring-4 px-4 py-2  grow-0  hover:bg-[#333333] group
      "
      // tabIndex={0}
      // id="uni1"
      // role={`cell${index + 1}`}
    >
      {children}
    </li>
  );
}

export default SearchItemWrapper;

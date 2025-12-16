import React from "react";

type SearchListContainerProps = React.ComponentProps<"ul">;
function SearchListContainer({ children }: SearchListContainerProps) {
  return (
    <ul className=" grid w-full  lg:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-2">
      {children}
    </ul>
  );
}

export default SearchListContainer;

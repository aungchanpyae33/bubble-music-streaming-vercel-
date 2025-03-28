"use client";
import { useContext } from "react";
import { ContextTableHead } from "./TableHeadBgChange";
import clsx from "clsx";

function TableHead({ children }: { children: React.ReactNode }) {
  const { isStuck } = useContext(ContextTableHead);
  return (
    <thead
      className={clsx(
        "sticky z-10 transition-colors duration-300   top-0 mb-[72px]  h-[65px]",
        // mb-[72px](the same height of the row) to prevent cover to the  last row
        {
          " bg-gray-700": isStuck,
          " bg-inherit ": !isStuck,
        }
      )}
    >
      {children}
    </thead>
  );
}

export default TableHead;

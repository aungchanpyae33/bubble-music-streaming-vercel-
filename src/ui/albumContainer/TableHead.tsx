"use client";
import { useContext } from "react";
import { ContextTableHead } from "./TableHeadBgChange";
import clsx from "clsx";

function TableHead({ children }: { children: React.ReactNode }) {
  const { isStuck } = useContext(ContextTableHead);
  return (
    <thead
      className={clsx(
        "sticky z-10 transition-colors duration-300  text-white top-0  h-[65px]",
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

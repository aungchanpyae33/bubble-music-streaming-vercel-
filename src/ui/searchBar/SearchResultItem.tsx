import clsx from "clsx";
import Link from "next/link";
import React, { memo } from "react";
interface prop {
  title: string;
  index: number;
  // arrow: {
  //   run: boolean;
  //   number: number;
  // };
  show: boolean;
}
//[later] : reactcompiler -> stable
const SearchResultItem = memo(({ title, index, show }: prop) => {
  console.log("SearchResultItem");
  return (
    <div
      className={clsx(
        "hover:bg-red-600 pl-20 sm:pl-2 h-[40px] flex items-center",
        {
          "bg-red-600": show,
        }
      )}
      style={{ cursor: "pointer" }}
      key={title}
    >
      <Link href={`/test?query=${title}`} tabIndex={-1}>
        {title}
      </Link>
    </div>
  );
});

SearchResultItem.displayName = "SearchResultItem";

export default SearchResultItem;

import clsx from "clsx";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  console.log("SearchResultItem");
  return (
    <div
      className={clsx(
        "hover:bg-red-600  pl-20 sm:pl-2 h-[40px] flex items-center cursor-pointer",
        {
          "bg-red-600": show,
        }
      )}
      key={title}
      onMouseDown={() => router.push(`/setting?query=${title}`)}
      onTouchStart={() => router.push(`/setting?query=${title}`)}
    >
      <div className=" truncate">{title}</div>
    </div>
  );
});

SearchResultItem.displayName = "SearchResultItem";

export default SearchResultItem;

import clsx from "clsx";
import { useRouter } from "nextjs-toploader/app";

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

  return (
    <div
      className={clsx(
        "hover:bg-red-600 pl-[85px] sm:pl-4  pr-2 h-[40px] flex items-center cursor-pointer",
        {
          "bg-red-600": show,
        }
      )}
      key={title}
      onMouseDown={() => {
        router.push(`/search?query=${title}`);
      }}
      onTouchStart={() => {
        router.push(`/search?query=${title}`);
      }}
    >
      <div className=" leading-relaxed truncate">{title}</div>
    </div>
  );
});

SearchResultItem.displayName = "SearchResultItem";

export default SearchResultItem;

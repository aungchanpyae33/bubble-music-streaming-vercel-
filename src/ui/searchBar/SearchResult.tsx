import React, { RefObject } from "react";
import { Movie } from "@/database/data";
import Link from "next/link";
import useTest from "@/lib/CustomHooks/NaviHook";

interface prop {
  data: Movie[];
  inputRef: RefObject<HTMLInputElement | null>;
}

function SearchResult({ data, inputRef }: prop) {
  const [arrow, setarrow] = useTest({ run: false, number: -1 }, inputRef, data);

  return (
    <div className="SearchResult w-full absolute bg-white rounded-b-md border-none shadow-md shadow-overlay z-40">
      {data?.map((item: Movie, index: number) => (
        <div
          className={`pl-9  ${
            index === arrow.number && !arrow.run && "bg-red-600"
          } ${arrow.run && "hover:bg-red-600"}`}
          style={{ cursor: "pointer" }}
          key={item.title}
          onMouseMove={() => {
            console.log("enter");
            if (arrow.number !== index) {
              setarrow({ run: true, number: index });
            }
          }}
        >
          <Link href={`/test?query=${item.title}`} tabIndex={-1}>
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default SearchResult;

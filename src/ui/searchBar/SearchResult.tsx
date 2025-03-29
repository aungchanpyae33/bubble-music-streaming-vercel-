"use client";
import React, { RefObject } from "react";
import { Movie } from "@/database/data";

import useTest from "@/lib/CustomHooks/NaviHook";
import SearchResultItem from "./SearchResultItem";

interface prop {
  data: Movie[];
  inputRef: RefObject<HTMLInputElement | null>;
}

function SearchResult({ data, inputRef }: prop) {
  const [arrow] = useTest({ run: false, number: -1 }, inputRef, data);

  return (
    <div className="SearchResult w-full absolute bg-black rounded-b-md border-none shadow-md shadow-overlay text-start">
      {data?.map((item: Movie, index: number) => (
        <SearchResultItem
          key={item.title}
          title={item.title}
          index={index}
          show={index === arrow.number && !arrow.run}
        />
      ))}
    </div>
  );
}

export default SearchResult;

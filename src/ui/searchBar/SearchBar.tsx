"use client";
import React, { useRef, useState, useTransition } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import SearchResult from "./SearchResult";
import { Movie } from "@/database/data";
import CloseFunctoion from "@/lib/CloseFunction";

function SearchBar({ data }: { data: Movie[] }) {
  const DivRef = useRef<HTMLDivElement | null>(null);
  const [open, setopen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransion] = useTransition();
  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    startTransion(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  CloseFunctoion(open, setopen, DivRef);
  return (
    <div className="SearchContainer w-[98%] z-0 mx-auto ">
      <div ref={DivRef} className="max-w-[600px] w-[100%] relative mx-auto ">
        <Form action={"/test"}>
          <label className="">
            <span className="sr-only">Search</span>
            <input
              autoFocus
              className="placeholder:text-slate-400 block bg-blue w-full   border border-slate-300  py-2 pl-9  shadow-sm focus:outline-none sm:text-sm"
              placeholder="Search for song and artist"
              type="search"
              name="query"
              required
              autoComplete="off"
              spellCheck="false"
              ref={inputRef}
              defaultValue={searchParams.get("query")?.toString()}
              // prevent up and down for displaying search list
              onFocus={() => setopen(true)}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                }
              }}
              onChange={(e) => {
                setopen(true);
                handleSearch(e.target.value);
              }}
            />
            {isPending && <span>loading...</span>}
            {open && <SearchResult data={data} inputRef={inputRef} />}
          </label>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;

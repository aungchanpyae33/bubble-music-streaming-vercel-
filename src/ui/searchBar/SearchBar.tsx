"use client";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import SearchResult from "./SearchResult";
import Form from "next/form";

function SearchBar() {
  const DivRef = useRef<HTMLDivElement | null>(null);
  const [open, setopen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string | null>(null);
  const searchAbortController = useRef<AbortController>(null);
  // CloseFunctoion(open, setopen, DivRef);
  async function fetchInput(params: string) {
    if (searchAbortController.current) {
      searchAbortController.current.abort();
    }
    console.log("render fetchinput");
    searchAbortController.current = new AbortController();
    const signal = searchAbortController.current?.signal;
    if (params.length > 0) {
      const fetchData = await fetch(`/api/search?with=${params}`, {
        signal,
      });
      return await fetchData.json();
    }
    console.log("iam run");
    return [];
  }
  const { data = [], error } = useSWR(
    value && value.length > 0 ? value : null,
    fetchInput,
    {
      keepPreviousData: value ? true : false,
    }
  );
  console.log("yes i am render", error);
  return (
    <Form
      action={"/test"}
      onSubmit={() => {
        setopen(false);
        inputRef.current?.blur();
      }}
    >
      <div ref={DivRef} className="w-[100%] relative mx-auto">
        <label className="">
          <span className="sr-only">Search</span>
          <div className=" flex items-stretch bg-white">
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
                setValue(e.currentTarget.value);
              }}
            />
            {isPending && <span>loading...</span>}
            {open && <SearchResult data={data} inputRef={inputRef} />}
          </label>
        </Form>
      </div>
    </div>
  );
}

export default SearchBar;

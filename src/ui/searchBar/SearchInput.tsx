"use client";

import Form from "next/form";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useSWR from "swr";
import SearchResult from "./SearchResult";
import clsx from "clsx";
import useScreenSize from "@/lib/CustomHooks/ScreenSizeDetecter";
function SearchInput() {
  const [open, setopen] = useState(false);
  const testRef = useRef<HTMLFormElement>(null);
  const [show, setShow] = useState(false);
  const isSmallScreen = useScreenSize("(max-width: 640px)");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isSmallScreen) {
      // testRef!.current!.classList.add("hidden");
      // setShow(true);
    } else {
      if (document.activeElement !== inputRef.current) {
        setShow(false);
      }
    }
  }, [isSmallScreen]);
  console.log(isSmallScreen);

  const [value, setValue] = useState<string | null>(null);
  const searchAbortController = useRef<AbortController | null>(null);

  async function fetchInput(params: string) {
    if (searchAbortController.current) {
      searchAbortController.current.abort();
    }
    searchAbortController.current = new AbortController();
    const signal = searchAbortController.current.signal;
    if (params.length > 0) {
      const fetchData = await fetch(`/api/search?with=${params}`, {
        signal,
      });
      return await fetchData.json();
    }
    return [];
  }

  const { data = [], error } = useSWR(
    value && value.length > 0 ? value : null,
    fetchInput,
    {
      keepPreviousData: !!value,
    }
  );

  return (
    <div>
      <button
        className={clsx(" sm:hidden", {
          "inline-block ": open,
        })}
        onClick={() => {
          // testRef!.current!.classList.toggle("hidden");
          setShow(!show);
        }}
      >
        {show ? "Close" : "Open"}
      </button>

      <Form
        action="/test"
        onSubmit={() => {
          setopen(false);
          inputRef.current?.blur();
        }}
        ref={testRef}
        className={clsx(
          "w-full hidden  sm:flex    h-[50px] top-0 left-0 z-50 absolute  items-center  sm:w-auto md:bg-transparent sm:h-auto sm:static sm:z-auto sm:flex-none sm:items-start",
          {
            unhide: show,
          }
        )}
      >
        <div className="w-[100%] sm:max-w-[500px] lg:max-w-[600px] relative mx-auto">
          <label>
            <span className="sr-only">Search</span>
            <div className="flex items-stretch bg-white">
              <input
                className="placeholder:text-slate-400 block bg-blue w-full h-[40px] pl-9 shadow-sm focus:outline-none sm:text-sm bg-transparent"
                placeholder="Search for song and artist"
                type="search"
                name="query"
                required
                autoComplete="off"
                spellCheck="false"
                ref={inputRef}
                onBlur={() => {
                  setopen(false);
                  setShow(false);
                }}
                onFocus={() => {
                  setopen(true);
                  setShow(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    e.preventDefault();
                    inputRef.current?.blur();
                  }
                }}
                onChange={(e) => {
                  setopen(true);
                  setValue(e.currentTarget.value);
                }}
              />
              <button
                className="border-l border-gray-300 px-2"
                type="reset"
                onClick={() => {
                  inputRef.current?.focus();
                  setopen(false);
                }}
              >
                Reset
              </button>
            </div>
            {open && <SearchResult data={data} inputRef={inputRef} />}
          </label>
        </div>
      </Form>
    </div>
  );
}

export default SearchInput;

"use client";
import { useRef, useState } from "react";
import useSWR from "swr";
import SearchResult from "./SearchResult";
import FormContainer from "./FormContainer";
import SearchResultWrapper from "./SearchResultWrapper";
function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState<string | null>(null);
  const searchAbortController = useRef<AbortController | null>(null);
  // console.log("searchinput render");
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
    <FormContainer inputRef={inputRef} setValue={setValue}>
      {data.length > 0 && (
        <SearchResultWrapper>
          <SearchResult data={data} inputRef={inputRef} />
        </SearchResultWrapper>
      )}
    </FormContainer>
  );
}

export default SearchInput;

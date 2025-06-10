"use client";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchResult from "./SearchResult";
import FormContainer from "./FormContainer";
import SearchResultWrapper from "./SearchResultWrapper";

function SearchInput() {
  const inputRef = useRef<HTMLInputElement>(null);
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
      const returnData = await fetchData.json();
      return returnData.data;
    }
    return [];
  }

  const { data = [], error } = useQuery({
    queryKey: ["search", value],
    queryFn: () => fetchInput(value!),
    placeholderData: (previousData) => previousData,
    staleTime: 10 * 60 * 1000,
  });

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

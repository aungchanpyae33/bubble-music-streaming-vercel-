import React from "react";
import SearchBar from "@/ui/searchBar/SearchBar";
import { getData } from "@/database/data";

async function page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || "";

  const data = await getData(query);

  return (
    <div className="bg-red-50">
      <p></p>
      <SearchBar data={data} />
    </div>
  );
}
export default page;

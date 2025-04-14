import React from "react";
import GenreContainer from "@/ui/genreContainer/GenreContainer";
import { getData } from "@/database/data";
async function page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  // const searchParams = await props.searchParams;
  // const query = searchParams?.query || "";
  const data = await getData("go");
  console.log(data);
  return (
    <div>
      {/* <div className="grid grid-cols-12 gap-5  p-5  bg-yellow-600">
        {query.length < 1 && (
          <>
            <GenreContainer description={"supanova"} />
            <GenreContainer description={"supanova"} />
            <GenreContainer description={"supanova"} />
            <GenreContainer description={"supanova"} />
            <GenreContainer description={"supanova"} />
            <GenreContainer description={"supanova"} />
          </>
        )}
      </div> */}
    </div>
  );
}
export default page;

import SearchTrack from "./SearchTrack";
import SearchContainer from "./SearchContainer";
import SearchListContainerTitle from "./SearchListContainerTitle";
import SearchListContainer from "./SearchListContainer";
import { getSearchPageReturn } from "@/database/data";

function SearchSongs({
  songs,
  title,
}: {
  songs: getSearchPageReturn["songs"];
  title: string;
}) {
  return (
    <SearchContainer>
      <SearchListContainerTitle title={title} />
      <SearchListContainer>
        {songs?.idArray.map((id, index) => {
          const item = songs[id];
          return <SearchTrack key={item.id} song={item} index={index} />;
        })}
      </SearchListContainer>
    </SearchContainer>
  );
}

export default SearchSongs;

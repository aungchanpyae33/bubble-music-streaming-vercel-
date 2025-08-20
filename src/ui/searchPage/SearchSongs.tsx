import SearchTrack from "./SearchTrack";
import SearchContainer from "./SearchContainer";
import SearchListContainerTitle from "./SearchListContainerTitle";
import SearchListContainer from "./SearchListContainer";
import { SongInfo } from "@/database/data";

function SearchSongs({ songs, title }: { songs: SongInfo[]; title: string }) {
  return (
    <SearchContainer>
      <SearchListContainerTitle title={title} />
      <SearchListContainer>
        {songs.map((item, index) => (
          <SearchTrack key={item.id} song={item} index={index} />
        ))}
      </SearchListContainer>
    </SearchContainer>
  );
}

export default SearchSongs;

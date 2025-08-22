import SearchContainer from "./SearchContainer";
import SearchListContainerTitle from "./SearchListContainerTitle";
import SearchListContainer from "./SearchListContainer";
import SearchListContainerItem from "./SearchListContainerItem";
import { getSearchPageReturn, listInfo } from "@/database/data";
interface SearchPlaylistProps {
  title: string;
  playlists: getSearchPageReturn["playlists"];
}
function SearchPlaylist({ title, playlists }: SearchPlaylistProps) {
  return (
    <SearchContainer>
      <SearchListContainerTitle title={title} />
      <SearchListContainer>
        {playlists?.idArray.map((id, index) => {
          const item = playlists[id];
          return (
            <SearchListContainerItem
              key={item.id}
              description="test"
              index={index}
              Itemdata={item}
            />
          );
        })}
      </SearchListContainer>
    </SearchContainer>
  );
}

export default SearchPlaylist;

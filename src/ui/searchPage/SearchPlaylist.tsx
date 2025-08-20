import SearchContainer from "./SearchContainer";
import SearchListContainerTitle from "./SearchListContainerTitle";
import SearchListContainer from "./SearchListContainer";
import SearchListContainerItem from "./SearchListContainerItem";
import { listInfo } from "@/database/data";
interface SearchPlaylistProps {
  title: string;
  playlists: listInfo[];
}
function SearchPlaylist({ title, playlists }: SearchPlaylistProps) {
  return (
    <SearchContainer>
      <SearchListContainerTitle title={title} />
      <SearchListContainer>
        {playlists.map((item, index) => (
          <SearchListContainerItem
            key={item.id}
            description="test"
            index={index}
            Itemdata={item}
          />
        ))}
      </SearchListContainer>
    </SearchContainer>
  );
}

export default SearchPlaylist;

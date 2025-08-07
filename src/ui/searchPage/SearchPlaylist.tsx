import SearchContainer from "./SearchContainer";
import SearchListContainerTitle from "./SearchListContainerTitle";
import SearchListContainer from "./SearchListContainer";
import { getProps } from "@/database/data";
import SearchListContainerItem from "./SearchListContainerItem";
interface SearchPlaylistProps {
  title: string;
  playlists: getProps[];
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

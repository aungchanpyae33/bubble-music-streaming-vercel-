import SearchContainer from "./SearchContainer";
import SearchListContainerTitle from "./SearchListContainerTitle";
import SearchListContainer from "./SearchListContainer";

import SearchArtistItem from "./SearchArtistItem";
import { getSearchPageReturn, listInfo } from "@/database/data";
interface SearchAlbumProps {
  title: string;
  albums: getSearchPageReturn["artists"];
}
function SearchAlbum({ title, albums }: SearchAlbumProps) {
  return (
    <SearchContainer>
      <SearchListContainerTitle title={title} />
      <SearchListContainer>
        {albums?.idArray.map((id, index) => {
          const item = albums[id];
          return (
            <SearchArtistItem
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

export default SearchAlbum;

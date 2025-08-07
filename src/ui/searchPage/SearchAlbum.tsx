import SearchContainer from "./SearchContainer";
import SearchListContainerTitle from "./SearchListContainerTitle";
import SearchListContainer from "./SearchListContainer";
import { getProps } from "@/database/data";
import SearchArtistItem from "./SearchArtistItem";
interface SearchAlbumProps {
  title: string;
  albums: getProps[];
}
function SearchAlbum({ title, albums }: SearchAlbumProps) {
  return (
    <SearchContainer>
      <SearchListContainerTitle title={title} />
      <SearchListContainer>
        {albums.map((item, index) => (
          <SearchArtistItem
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

export default SearchAlbum;

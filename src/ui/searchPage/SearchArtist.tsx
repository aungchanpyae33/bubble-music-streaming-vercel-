import SearchContainer from "./SearchContainer";
import SearchListContainerTitle from "./SearchListContainerTitle";
import SearchListContainer from "./SearchListContainer";
import { getProps } from "@/database/data";
import SearchArtistItem from "./SearchArtistItem";
interface SearchArtistProps {
  title: string;
  artists: getProps[];
}
function SearchArtist({ title, artists }: SearchArtistProps) {
  return (
    <SearchContainer>
      <SearchListContainerTitle title={title} />
      <SearchListContainer>
        {artists.map((item, index) => (
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

export default SearchArtist;

import SearchContainer from "./SearchContainer";
import SearchListContainerTitle from "./SearchListContainerTitle";
import SearchListContainer from "./SearchListContainer";
import SearchArtistItem from "./SearchArtistItem";
import { getSearchPageReturn } from "@/database/data";
interface SearchArtistProps {
  title: string;
  artists: getSearchPageReturn["artists"];
}

function SearchArtist({ title, artists }: SearchArtistProps) {
  return (
    <SearchContainer>
      <SearchListContainerTitle title={title} />
      <SearchListContainer>
        {artists?.idArray.map((id, index) => {
          const item = artists[id];
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

export default SearchArtist;

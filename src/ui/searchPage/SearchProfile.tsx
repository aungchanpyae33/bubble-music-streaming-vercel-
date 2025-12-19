import SearchContainer from "./SearchContainer";
import SearchListContainerTitle from "./SearchListContainerTitle";
import SearchListContainer from "./SearchListContainer";
import { getSearchPageReturn } from "@/database/data";
import SearchProfileItem from "./SearchProfileItem";
interface SearchProfileProps {
  title: string;
  profiles: getSearchPageReturn["profiles"];
}
function SearchProfile({ title, profiles }: SearchProfileProps) {
  return (
    <SearchContainer>
      <SearchListContainerTitle title={title} />
      <SearchListContainer>
        {profiles?.idArray.map((id, index) => {
          const item = profiles[id];
          return (
            <SearchProfileItem
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

export default SearchProfile;

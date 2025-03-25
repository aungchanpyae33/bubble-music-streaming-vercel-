import SearchInput from "./SearchInput";
import ToggleContext from "./ToggleContext";

function SearchBar() {
  return (
    <div className="">
      <ToggleContext>
        <SearchInput />
      </ToggleContext>
    </div>
  );
}

export default SearchBar;

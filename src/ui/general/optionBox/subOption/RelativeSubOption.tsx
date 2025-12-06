import { RelativeData } from "../ContextGoToRelative";
import OptionContainer from "../OptionContainer";
import OptionItem from "../OptionItem";

function RelativeSubItem({ relative }: { relative: RelativeData }) {
  return (
    <OptionItem>
      <button className=" px-4">{relative.name}</button>
    </OptionItem>
  );
}

function RelativeSubOption({ relative }: { relative: RelativeData[] }) {
  return (
    <OptionContainer>
      {relative.map((item) => (
        <RelativeSubItem key={item.id} relative={item} />
      ))}
    </OptionContainer>
  );
}

export default RelativeSubOption;

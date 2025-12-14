import MoreOptionContext from "@/ui/trackComponent/MoreOptionContext";
import { RelativeData } from "../ContextGoToRelative";
import OptionContainer from "../OptionContainer";
import OptionItem from "../OptionItem";
import MoreSubOption from "@/ui/trackComponent/MoreSubOption";
import OptionIconEl from "../OptionIconEl";
import IconWrapper from "../../IconWrapper";
import { ChevronRight, UserSearch } from "lucide-react";
import OptionText from "../OptionText";
import OptionSubArrow from "../OptionSubArrow";
import ProfileOption from "../ProfileOption";

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
      <MoreOptionContext relative={relative}>
        <MoreSubOption
          stackNum={2}
          triggerEl={
            <OptionItem>
              <OptionIconEl>
                <IconWrapper size="small" Icon={UserSearch} />
              </OptionIconEl>
              <OptionText text="go to artist" />
              <OptionSubArrow>
                <IconWrapper Icon={ChevronRight} />
              </OptionSubArrow>
            </OptionItem>
          }
          className="w-full"
          targetElement={
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          }
        />
      </MoreOptionContext>
      {relative.map((item) => (
        <RelativeSubItem key={item.id} relative={item} />
      ))}
    </OptionContainer>
  );
}

export default RelativeSubOption;

"use client";
import MoreOptionContext, {
  ContextMoreOption,
} from "@/ui/trackComponent/MoreOptionContext";
import { useContext } from "react";
import OptionItem from "./OptionItem";
import OptionIconEl from "./OptionIconEl";
import IconWrapper from "../IconWrapper";
import { ChevronRight, UserSearch } from "lucide-react";
import OptionButton from "./OptionButton";
import NoThankYouPreFetchLink from "../NoThankYouPreFetchLink";
import { GoToRelativeContext } from "./ContextGoToRelative";
import MoreSubOption from "@/ui/trackComponent/MoreSubOption";
import OptionText from "./OptionText";
import OptionSubArrow from "./OptionSubArrow";
import RelativeSubOption from "./subOption/RelativeSubOption";

function GoToArtist() {
  const { relative } = useContext(GoToRelativeContext);
  const { setShow } = useContext(ContextMoreOption);
  if (!relative) return;
  // check if is array (usually comefrom track where song has more than one singer)
  if (Array.isArray(relative) && relative.length > 1) {
    // must use moreSubOption if this content comes from parent portal content
    return (
      <MoreOptionContext relative={relative}>
        <MoreSubOption
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
          targetElement={<RelativeSubOption relative={relative} />}
        />
      </MoreOptionContext>
    );
  } else {
    const artistId = Array.isArray(relative) ? relative[0].id : relative.id;
    return (
      <OptionItem>
        <OptionButton onClick={() => setShow(false)}>
          <NoThankYouPreFetchLink
            href={`/artist/${artistId}`}
            className="flex items-center"
          >
            <OptionIconEl>
              <IconWrapper size="small" Icon={UserSearch} />
            </OptionIconEl>

            <OptionText text="go to artist " />
          </NoThankYouPreFetchLink>
        </OptionButton>
      </OptionItem>
    );
  }
}

export default GoToArtist;

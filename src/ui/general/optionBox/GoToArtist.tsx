"use client";
import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import { useContext } from "react";
import OptionItem from "./OptionItem";
import OptionIconEl from "./OptionIconEl";
import IconWrapper from "../IconWrapper";
import { UserSearch } from "lucide-react";
import Link from "next/link";
import { InfoTrackContext } from "@/ui/trackComponent/ContextInfoTrack";
import OptionButton from "./OptionButton";
import NoThankYouPreFetchLink from "../NoThankYouPreFetchLink";

function GoToArtist() {
  const { song } = useContext(InfoTrackContext);
  const artistId = song?.artists[0].id;
  const { setShow } = useContext(ContextMoreOption);
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

          <span>go to the artist </span>
        </NoThankYouPreFetchLink>
      </OptionButton>
    </OptionItem>
  );
}

export default GoToArtist;

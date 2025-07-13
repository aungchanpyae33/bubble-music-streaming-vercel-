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

function GoToArtist() {
  const { artistId } = useContext(InfoTrackContext);
  const { setShow } = useContext(ContextMoreOption);
  return (
    <OptionItem>
      <OptionButton onClick={() => setShow(false)}>
        <Link
          href={`/artist/${artistId}`}
          prefetch={false}
          className="flex items-center"
        >
          <OptionIconEl>
            <IconWrapper size="small" Icon={UserSearch} />
          </OptionIconEl>

          <span>go to the artist </span>
        </Link>
      </OptionButton>
    </OptionItem>
  );
}

export default GoToArtist;

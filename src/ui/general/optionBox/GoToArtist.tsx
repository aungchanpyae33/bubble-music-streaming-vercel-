"use client";
import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import { useContext } from "react";
import OptionItem from "./OptionItem";
import OptionIconEl from "./OptionIconEl";
import IconWrapper from "../IconWrapper";
import { UserSearch } from "lucide-react";
import Link from "next/link";
import { InfoTrackContext } from "@/ui/trackComponent/ContextInfoTrack";

function GoToArtist() {
  const { artistId } = useContext(InfoTrackContext);
  const { setShow } = useContext(ContextMoreOption);
  return (
    <OptionItem>
      <button className="flex items-center" onClick={() => setShow(false)}>
        <OptionIconEl>
          <IconWrapper size="medium" Icon={UserSearch} />
        </OptionIconEl>
        <Link href={`/artist/${artistId}`} prefetch={false}>
          <span>go to the artist </span>
        </Link>
      </button>
    </OptionItem>
  );
}

export default GoToArtist;

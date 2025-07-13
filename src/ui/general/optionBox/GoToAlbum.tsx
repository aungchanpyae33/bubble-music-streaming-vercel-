"use client";
import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import { useContext } from "react";
import OptionItem from "./OptionItem";
import { InfoTrackContext } from "@/ui/trackComponent/ContextInfoTrack";
import OptionIconEl from "./OptionIconEl";
import { Disc } from "lucide-react";
import Link from "next/link";
import IconWrapper from "../IconWrapper";
import OptionButton from "./OptionButton";

function GoToAlbum() {
  const { albumId } = useContext(InfoTrackContext);
  const { setShow } = useContext(ContextMoreOption);
  return (
    <OptionItem>
      <OptionButton onClick={() => setShow(false)}>
        <Link
          href={`/album/${albumId}`}
          className="flex items-center"
          prefetch={false}
        >
          <OptionIconEl>
            <IconWrapper size="small" Icon={Disc} />
          </OptionIconEl>

          <span>go to the album </span>
        </Link>
      </OptionButton>
    </OptionItem>
  );
}

export default GoToAlbum;

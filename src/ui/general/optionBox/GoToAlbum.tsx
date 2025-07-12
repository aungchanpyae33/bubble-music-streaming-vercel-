import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import { useContext } from "react";
import OptionItem from "./OptionItem";
import { InfoTrackContext } from "@/ui/trackComponent/ContextInfoTrack";
import OptionIconEl from "./OptionIconEl";
import { Disc } from "lucide-react";
import Link from "next/link";
import IconWrapper from "../IconWrapper";

function GoToAlbum() {
  const { albumId } = useContext(InfoTrackContext);
  const { setShow } = useContext(ContextMoreOption);
  return (
    <OptionItem>
      <button className="flex items-center" onClick={() => setShow(false)}>
        <OptionIconEl>
          <IconWrapper size="medium" Icon={Disc} />
        </OptionIconEl>
        <Link href={`/album/${albumId}`} prefetch={false}>
          <span>go to the album </span>
        </Link>
      </button>
    </OptionItem>
  );
}

export default GoToAlbum;

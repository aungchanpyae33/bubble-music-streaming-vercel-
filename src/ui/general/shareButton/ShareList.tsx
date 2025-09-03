"use client";
import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";
import { useContext } from "react";
import { Link2 } from "lucide-react";
import IconWrapper from "../IconWrapper";
import OptionItem from "../optionBox/OptionItem";
import OptionIconEl from "../optionBox/OptionIconEl";
import { SongListContext } from "@/ui/playlist/playlistOption/ContextSongListContainer";

function ShareList() {
  const { setShow } = useContext(ContextMoreOption);
  const { id, type } = useContext(SongListContext);
  const handleCopy = async () => {
    const origin = window.location.origin;
    try {
      await navigator.clipboard.writeText(`${origin}/${type}/${id}`);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <OptionItem>
      <button
        className="flex items-center"
        onClick={async () => {
          await handleCopy();
          setShow(false);
        }}
      >
        <OptionIconEl>
          <IconWrapper size="small" Icon={Link2} />
        </OptionIconEl>
        <span>share </span>
      </button>
    </OptionItem>
  );
}

export default ShareList;

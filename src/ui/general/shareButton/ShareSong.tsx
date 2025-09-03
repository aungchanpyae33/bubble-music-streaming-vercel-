"use client";
import { ContextMoreOption } from "@/ui/trackComponent/MoreOptionContext";

import { useContext } from "react";

import { Link2 } from "lucide-react";
import IconWrapper from "../IconWrapper";
import { InfoTrackContext } from "@/ui/trackComponent/ContextInfoTrack";
import OptionItem from "../optionBox/OptionItem";
import OptionIconEl from "../optionBox/OptionIconEl";

function ShareSong() {
  const { setShow } = useContext(ContextMoreOption);
  const { song } = useContext(InfoTrackContext);
  const songId = song?.song_id;
  const handleCopy = async () => {
    const origin = window.location.origin;
    console.log(origin);
    try {
      await navigator.clipboard.writeText(`${origin}/track/${songId}`);
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

export default ShareSong;

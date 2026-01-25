import MediaSessionButton from "@/lib/CustomHooks/MediaSession/MediaSessionButton";
import MediaSessionToggle from "@/lib/CustomHooks/MediaSession/MediaSessionToggle";
import { ReactNode, useContext } from "react";
import { AudioElementContext } from "../AudioWrapper";

function MediaSessionButtonWrapper({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  const { audioEl } = useContext(AudioElementContext);
  MediaSessionButton(id, audioEl);
  MediaSessionToggle();
  return children;
}

export default MediaSessionButtonWrapper;

import MediaSessionButton from "@/lib/MediaSession/MediaSessionButton";
import MediaSessionToggle from "@/lib/MediaSession/MediaSessionToggle";
import { ReactNode } from "react";

function MediaSessionButtonWrapper({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  MediaSessionButton(id);
  MediaSessionToggle();
  return children;
}

export default MediaSessionButtonWrapper;

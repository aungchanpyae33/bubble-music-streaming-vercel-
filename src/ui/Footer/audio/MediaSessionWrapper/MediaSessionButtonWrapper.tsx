import MediaSessionButton from "@/lib/MediaSession/MediaSessionButton";
import MediaSessionToggle from "@/lib/MediaSession/MediaSessionToggle";
import { ReactNode } from "react";

function MediaSessionButtonWrapper({
  children,
  url,
}: {
  children: ReactNode;
  url: string;
}) {
  MediaSessionButton(url);
  MediaSessionToggle();
  return children;
}

export default MediaSessionButtonWrapper;

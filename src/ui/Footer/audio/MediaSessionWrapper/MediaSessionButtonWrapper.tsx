import MediaSessionButton from "@/lib/MediaSession/MediaSessionButton";
import MediaSessionToggle from "@/lib/MediaSession/MediaSessionToggle";
import { ReactNode } from "react";

function MediaSessionButtonWrapper({
  children,
  url,
  uni_id,
}: {
  children: ReactNode;
  url: string;
  uni_id?: number | undefined;
}) {
  MediaSessionButton(url, uni_id);
  MediaSessionToggle();
  return children;
}

export default MediaSessionButtonWrapper;

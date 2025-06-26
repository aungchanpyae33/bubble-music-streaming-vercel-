import { artists } from "@/database/data";
import MediaSessionDes from "@/lib/MediaSession/MediaSessionDescription";

function MediaSessionDesWrapper({
  name,
  artists,
}: {
  name: string;
  artists: artists[];
}) {
  MediaSessionDes(name, artists);
  return null;
}

export default MediaSessionDesWrapper;

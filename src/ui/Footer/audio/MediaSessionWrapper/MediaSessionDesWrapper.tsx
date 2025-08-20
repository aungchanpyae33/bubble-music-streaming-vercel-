import { Artist } from "@/database/data";
import MediaSessionDes from "@/lib/MediaSession/MediaSessionDescription";

function MediaSessionDesWrapper({
  name,
  artists,
}: {
  name: string;
  artists: Artist[];
}) {
  MediaSessionDes(name, artists);
  return null;
}

export default MediaSessionDesWrapper;

import { artists } from "@/database/data";
import { useEffect } from "react";
const MediaSessionDes = (name: string, artists: artists[]) => {
  // console.log(urlSongs)
  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: name,
        artist: artists.map((artist) => artist.name).join(", "),
        artwork: [
          {
            src: "https://tebi.bubblemusic.dpdns.org/lee-hi/4-only/cover/photo_2025-05-23_14-51-24.jpg",
            sizes: "300x300",
            type: "image/jpg",
          },
        ],
      });
    }
    return () => {
      navigator.mediaSession.metadata = null;
    };
  }, [name, artists]);
};
export default MediaSessionDes;

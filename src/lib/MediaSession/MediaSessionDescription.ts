import { artists } from "@/database/data";
import { useEffect } from "react";
const MediaSessionDes = (name: string, artists: artists[]) => {
  console.log(artists);
  // console.log(urlSongs)
  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: name,
        artist: artists.map((artist) => artist.name).join(", "),
        artwork: [
          {
            src: "https://s3.tebi.io/test1345/timo-volz-ZlFKIG6dApg-unsplash%20%281%29.jpg",
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

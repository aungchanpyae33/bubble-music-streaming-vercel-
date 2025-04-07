import { useEffect } from "react";
const MediaSessionDes = (name: string, url: string) => {
  // console.log(urlSongs)
  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: name,
        artist: "Kendrick Lamar",
        album: "To Pimp A Butterfly",
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
  }, [name, url]);
};
export default MediaSessionDes;

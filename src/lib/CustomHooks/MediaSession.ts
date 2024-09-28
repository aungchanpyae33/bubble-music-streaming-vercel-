import { useEffect } from "react";

const useMediaSession = (name: string) => {
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
  }, [name]);
};
export default useMediaSession;

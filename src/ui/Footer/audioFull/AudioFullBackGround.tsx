import clsx from "clsx";
import { useEffect, useState } from "react";

function AudioFullBackGround({
  children,
  open,
}: {
  children: React.ReactNode;
  open: boolean;
}) {
  const bgImageUrl =
    "https://s3.tebi.io/tebi.bubblemusic.us.kg/premium_photo-1690406382383-3827c1397c48.avif";
  const [isImageLoaded, setIsImageLoaded] = useState("initial");

  useEffect(() => {
    const img = new Image();
    img.src = bgImageUrl;

    // When the image loads successfully
    img.onload = () => {
      console.log("loaded");
      setIsImageLoaded("success");
    };

    // If the image fails to load
    img.onerror = () => {
      setIsImageLoaded("error");
    };
  }, [bgImageUrl]);
  console.log(isImageLoaded);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={clsx(
        "z-50   fixed inset-0 bg-no-repeat bg-cover bg-center bg-fixed",
        {
          hidden: !open,
        }
      )}
      style={{
        backgroundImage:
          "url('https://s3.tebi.io/tebi.bubblemusic.us.kg/premium_photo-1690406382383-3827c1397c48.avif')",
      }}
    >
      <div
        className={clsx(
          "absolute inset-0 -z-10 transition-opacity duration-[1500ms] bg-black",
          {
            "opacity-50": isImageLoaded === "success",
            "opacity-100": isImageLoaded === "initial",
          }
        )}
      ></div>
      {isImageLoaded === "error" && (
        <div className="text-white">Failed to load image</div>
      )}
      {children}
    </div>
  );
}

export default AudioFullBackGround;

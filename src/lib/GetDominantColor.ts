import { RefObject, SetStateAction, useEffect, useState } from "react";
// this is basic color extract function , for more precise and performance , use color thief js
const useGetDominantColor = ({
  setBgValue,
  imgRef,
}: {
  setBgValue: React.Dispatch<SetStateAction<string | undefined>>;
  imgRef: RefObject<HTMLImageElement | null>;
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  useEffect(() => {
    const img = imgRef!.current!;
    let isMounted = true;
    function get() {
      if (!isMounted) return; //early return when click close
      const canvas = document.createElement("canvas");

      canvas.width = img.width;

      canvas.height = img.height;

      const ctx = canvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(img, 0, 0, img.width, img.height);
      } // 2. Get the average color (simple example - improve as needed)

      const imageData = ctx!.getImageData(0, 0, img.width, img.height).data;

      let r = 0,
        g = 0,
        b = 0;

      for (let i = 0; i < imageData.length; i += 4) {
        r += imageData[i];

        g += imageData[i + 1];

        b += imageData[i + 2];
      }
      const avgColor = `rgb(${Math.round(
        r / (imageData.length / 4)
      )}, ${Math.round(g / (imageData.length / 4))}, ${Math.round(
        b / (imageData.length / 4)
      )})`;
      setIsImageLoaded(true);
      setBgValue(avgColor);
    }
    if (img.complete) {
      get();
    } else {
      img.addEventListener("load", get);
    }

    return () => {
      isMounted = false;
      img.removeEventListener("load", get);
    };
  }, [imgRef, setBgValue]);

  return [isImageLoaded];
};

export default useGetDominantColor;

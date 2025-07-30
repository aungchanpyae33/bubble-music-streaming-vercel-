import { RefObject, SetStateAction, useEffect, useState } from "react";
// this is basic color extract function , for more precise and performance , use color thief js
const useGetDominantColor = ({
  setBgValue,
  imgRef,
}: {
  setBgValue: React.Dispatch<SetStateAction<number[]>>;
  imgRef: RefObject<HTMLImageElement | null>;
}) => {
  useEffect(() => {
    const img = imgRef!.current!;
    let isMounted = true;
    function getColor() {
      if (!isMounted) return; //early return when click close
      const canvas = document.createElement("canvas");

      canvas.width = img.width;

      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx!.getImageData(0, 0, img.width, img.height).data;

      let r = 0,
        g = 0,
        b = 0;

      for (let i = 0; i < imageData.length; i += 4) {
        r += imageData[i];

        g += imageData[i + 1];

        b += imageData[i + 2];
      }
      const mainR = Math.round(r / (imageData.length / 4));
      const mainG = Math.round(g / (imageData.length / 4));
      const mainB = Math.round(b / (imageData.length / 4));
      if (isNaN(mainR) || isNaN(mainG) || isNaN(mainB)) return;
      setBgValue([mainR, mainG, mainB]);
    }

    // Check if the image has already been loaded (e.g., from cache)
    if (img.complete) {
      // If already loaded, extract the color immediately
      getColor();
    } else {
      // If not yet loaded, wait for the 'load' event to fire before extracting color
      img.addEventListener("load", getColor);
    }
    return () => {
      isMounted = false;
      img.removeEventListener("load", getColor);
    };
  }, [imgRef, setBgValue]);
};

export default useGetDominantColor;

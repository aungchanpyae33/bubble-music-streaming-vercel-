"use client";
import clsx from "clsx";
import { SetStateAction, useState } from "react";
import { createContext } from "react";
interface Props extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}
const baseColor = [51, 51, 51];
interface contextProps {
  bgValue: number[];
  setBgValue: React.Dispatch<SetStateAction<number[]>>;
}
export const ContextAlbum = createContext<contextProps>({
  bgValue: baseColor,
  setBgValue: () => {},
});

function AlbumUpperBackground({ children }: Props) {
  const [bgValue, setBgValue] = useState<number[]>(baseColor);
  // bg-[rgb(51,51,51)]
  const R = bgValue[0];
  const G = bgValue[1];
  const B = bgValue[2];

  const mainColor = bgValue ? `rgb(${R},${G},${B})` : "";

  const value = { bgValue, setBgValue };

  return (
    <ContextAlbum.Provider value={value}>
      <div
        className={clsx("relative rounded ", {})}
        style={
          bgValue
            ? {
                backgroundColor: `${mainColor}`,
              }
            : {}
        }
      >
        {children}
      </div>
    </ContextAlbum.Provider>
  );
}

export default AlbumUpperBackground;

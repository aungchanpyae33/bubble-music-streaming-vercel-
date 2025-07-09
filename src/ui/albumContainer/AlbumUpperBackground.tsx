"use client";
import clsx from "clsx";
import { SetStateAction, useState } from "react";
import { createContext } from "react";
interface Props extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}
interface contextProps {
  bgValue: number[] | undefined;
  setBgValue: React.Dispatch<SetStateAction<number[] | undefined>>;
}
export const ContextAlbum = createContext<contextProps>({
  bgValue: undefined,
  setBgValue: () => {},
});
function AlbumUpperBackground({ children }: Props) {
  const [bgValue, setBgValue] = useState<number[] | undefined>(undefined);
  const R = bgValue ? bgValue[0] : "";
  const G = bgValue ? bgValue[1] : "";
  const B = bgValue ? bgValue[2] : "";

  const mainColor = bgValue ? `rgb(${R},${G},${B})` : "";

  const value = { bgValue, setBgValue };

  return (
    <ContextAlbum.Provider value={value}>
      <div
        className={clsx("relative", {})}
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

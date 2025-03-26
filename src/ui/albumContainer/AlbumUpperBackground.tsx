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
  const bottomR = bgValue ? Math.round(Number(R) * 0.9) : "";
  const bottomG = bgValue ? Math.round(Number(G) * 0.9) : "";
  const bottomB = bgValue ? Math.round(Number(B) * 0.9) : "";

  const mainColor = bgValue ? `rgb(${R},${G},${B})` : "";
  const bottomColor = `rgb(${bottomR},${bottomG},${bottomB})`;

  const value = { bgValue, setBgValue };
  return (
    <>
      <ContextAlbum.Provider value={value}>
        <div
          className={clsx("relative", {})}
          style={
            bgValue
              ? {
                  background: `linear-gradient(to bottom,${mainColor}0%,${bottomColor}60%)`,
                }
              : {}
          }
        >
          {children}
          <div
            className=" absolute bottom-0 translate-y-full opacity-55  w-full  left-0 h-[250px]"
            style={
              bgValue
                ? {
                    background: `linear-gradient(to bottom,${bottomColor}0%,rgb(43,42,43)70%)`,
                  }
                : {}
            }
          ></div>
        </div>
      </ContextAlbum.Provider>
    </>
  );
}

export default AlbumUpperBackground;

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
  const bottomR = bgValue ? Math.round(Number(bgValue[0]) * 0.8) : "";
  const bottomG = bgValue ? Math.round(Number(bgValue[1]) * 0.8) : "";
  const bottomB = bgValue ? Math.round(Number(bgValue[2]) * 0.8) : "";

  const bottomoverlayR = bgValue ? Math.round(Number(bgValue[0]) * 0.6) : "";
  const bottomoverlayG = bgValue ? Math.round(Number(bgValue[1]) * 0.6) : "";
  const bottomoverlayB = bgValue ? Math.round(Number(bgValue[2]) * 0.6) : "";

  const mainColor = bgValue
    ? `rgb(${bgValue[0]},${bgValue[1]},${bgValue[2]})`
    : "";
  const bottomColor = `rgb(${bottomR},${bottomG},${bottomB})`;
  const bottomoverlayColor = `rgba(${bottomoverlayR},${bottomoverlayG},${bottomoverlayB},0.9)`;
  console.log(mainColor, bottomColor);
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
            className=" absolute bottom-0 translate-y-full   w-full  left-0 h-[150px]"
            style={
              bgValue
                ? {
                    background: `linear-gradient(to bottom,${bottomoverlayColor}0%,rgb(43,42,43)80%)`,
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

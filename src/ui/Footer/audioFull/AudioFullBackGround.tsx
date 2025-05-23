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

export const ContextBackGround = createContext<contextProps>({
  bgValue: undefined,
  setBgValue: () => {},
});
function AudioFullBackGround({ children, className, ref }: Props) {
  const [bgValue, setBgValue] = useState<number[] | undefined>(undefined);
  const value = { bgValue, setBgValue };
  const R = bgValue ? bgValue[0] : "";
  const G = bgValue ? bgValue[1] : "";
  const B = bgValue ? bgValue[2] : "";
  const bottomR = bgValue ? Math.round(Number(R) * 0.5) : "";
  const bottomG = bgValue ? Math.round(Number(G) * 0.5) : "";
  const bottomB = bgValue ? Math.round(Number(B) * 0.5) : "";
  const mainColor = bgValue ? `rgb(${R},${G},${B})` : "";
  const bottomColor = `rgb(${bottomR},${bottomG},${bottomB})`;
  return (
    <ContextBackGround.Provider value={value}>
      <div
        tabIndex={0}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        className={className}
        ref={ref}
        style={
          bgValue
            ? {
                background: `linear-gradient(to bottom,${mainColor}0%,${bottomColor}75%)`,
              }
            : {}
        }
      >
        <div
          className={clsx(
            "absolute inset-0 -z-10 transition-opacity duration-1000 opacity-0 bg-black",
            {
              "opacity-55": bgValue === undefined,
            }
          )}
        ></div>
        {children}
      </div>
    </ContextBackGround.Provider>
  );
}

export default AudioFullBackGround;

import clsx from "clsx";
import { SetStateAction, useState } from "react";
import { createContext } from "react";
interface Props extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}
interface contextProps {
  bgValue: string | undefined;
  setBgValue: React.Dispatch<SetStateAction<string | undefined>>;
}
export const Context = createContext<contextProps>({
  bgValue: undefined,
  setBgValue: () => {},
});
function AudioFullBackGround({ children }: Props) {
  const [bgValue, setBgValue] = useState<string | undefined>(undefined);

  const value = { bgValue, setBgValue };
  return (
    <>
      <Context.Provider value={value}>
        <div>
          <div
            onClick={(e) => e.stopPropagation()}
            className="z-50 flex flex-col gap-y-2   fixed inset-0 transition-all duration-1000 bg-[#E0E0E0]"
            style={{
              background: `linear-gradient(to bottom,${bgValue} 0%,rgb(79, 79, 79) 75%)`,
            }}
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
        </div>
      </Context.Provider>
    </>
  );
}

export default AudioFullBackGround;

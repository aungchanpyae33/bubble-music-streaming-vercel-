import { ReactNode } from "react";

function AudioFullInfoWrapper({ children }: { children: ReactNode }) {
  return (
    <div className=" absolute gap-5  w-full top-0  -translate-y-[110%] flex flex-col md:flex-row ">
      {children}
    </div>
  );
}

export default AudioFullInfoWrapper;

import { ReactNode } from "react";

function AudioFullInfoWrapper({ children }: { children: ReactNode }) {
  return (
    <div className=" mx-auto  w-[90%]  flex-1 flex   relative">
      <div className="  lg:items-end justify-center gap-2 lg:justify-start flex flex-col  lg:flex-row  w-full lg:pb-12 md:pb-10 pb-1 ">
        {children}
      </div>
    </div>
  );
}

export default AudioFullInfoWrapper;

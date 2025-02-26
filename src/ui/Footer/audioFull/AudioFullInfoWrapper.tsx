import { ReactNode } from "react";

function AudioFullInfoWrapper({ children }: { children: ReactNode }) {
  return (
    <div className=" mx-auto  w-[96%] md:w-[95%] lg:w-[90%]  flex-1 flex  relative">
      <div className=" md:absolute  justify-around md:justify-normal gap-5 static md:bottom-5 bottom-0 w-full flex flex-col md:flex-row">
        {children}
      </div>
    </div>
  );
}

export default AudioFullInfoWrapper;

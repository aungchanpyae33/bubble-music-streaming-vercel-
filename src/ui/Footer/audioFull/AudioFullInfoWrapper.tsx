import { ReactNode } from "react";
import AudioCurImg from "./AudioCurImg";

function AudioFullInfoWrapper() {
  return (
    <div className=" mx-auto  w-[90%]  flex-1 flex   relative">
      <div className="  lg:items-end justify-center gap-2 lg:justify-start flex flex-col  lg:flex-row  w-full lg:pb-12 md:pb-10 pb-1 ">
        <AudioCurImg />
        <div className=" h-[20%]   flex items-start justify-center flex-col">
          <p className=" lg:text-5xl md:text-4xl text-2xl">Supanova</p>
          <p className=" lg:text-3xl md:text-2xl text-xl">Aspea</p>
        </div>
      </div>
    </div>
  );
}

export default AudioFullInfoWrapper;

import { Context } from "@/lib/MediaSource/ContextMediaAudioFull";
import { useContext, useRef } from "react";
import AudioFullBackGround from "./AudioFullBackGround";
import AudioFunctionButton from "../audio/AudioFunction/AudioFunctionButton";
import AudioFunctionShuffle from "../audio/AudioFunction/AudioFunctionShuffle";
import AudioFunctionPre from "../audio/AudioFunction/AudioFunctionPre";
import AudioFunctionNext from "../audio/AudioFunction/AudioFunctionNext";
import ToggleButton from "../audio/Toggle/ToggleButton";
import AudioFunctionRepeat from "../audio/AudioFunction/AudioFunctionRepeat";
import TimeIndicatorDur from "../audio/Time/TimeIndicatorDur";
import AudioSeekBar from "../audio/SliderUi/AudioSeekBar";
import TimeIndicatorCur from "../audio/Time/TimeIndicatorCur";
import AudioCurImg from "./AudioCurImg";
import AudioFullInfoWrapper from "./AudioFullInfoWrapper";

import CloseFunctoionForFull from "@/lib/CloseFunctionForFull";
function AudioFull({
  footerRef,
  url,
  duration,
}: {
  footerRef: React.RefObject<HTMLElement | null>;
  url: string;
  duration: number;
}) {
  const { open, setOpen } = useContext(Context);
  const refFocus = useRef<HTMLDivElement | null>(null);
  CloseFunctoionForFull(open, setOpen, footerRef, refFocus);
  return (
    <div tabIndex={0} ref={refFocus}>
      {open && (
        <AudioFullBackGround ref={refFocus}>
          <div className="mx-auto w-[90%] h-[50px]   flex sticky top-0 z-50">
            <button
              className=""
              onClick={() => {
                footerRef!.current!.classList.toggle("z-50");
                setOpen(!open);
              }}
            >
              close
            </button>
          </div>

          <AudioFullInfoWrapper>
            <AudioCurImg />
            <div className="text-white h-[20%]   flex items-start justify-center flex-col">
              <p className=" lg:text-5xl md:text-4xl text-2xl">Supanova</p>
              <p className=" lg:text-3xl md:text-2xl text-xl">Aspea</p>
            </div>
          </AudioFullInfoWrapper>
          <div className=" h-[110px] shrink-0  w-[90%]  inset-x-0 mx-auto sticky bottom-0">
            <div className="audioFunctionContainer  flex  flex-col flex-1  items-center  justify-center">
              <div className="BottomContainer w-full static top-0 left-0 ">
                <div className=" w-full flex items-center relative">
                  <AudioSeekBar
                    hideSliderInSmScreen={false}
                    childrenFn={(value) => (
                      <TimeIndicatorCur
                        value={value}
                        duration={duration}
                        className="text-sm md:text-base w-fit md:w-[5rem] text-center md:static md:left-auto md:bottom-auto md:translate-y-0  absolute left-0 bottom-0 translate-y-full"
                      />
                    )}
                    duration={duration}
                    key={url}
                    className="hidden"
                  />
                  <TimeIndicatorDur
                    duration={duration}
                    className="text-sm md:text-base w-fit md:w-[5rem] text-center md:static md:right-auto md:bottom-auto md:translate-y-0 absolute right-0 bottom-0 translate-y-full "
                  />
                </div>
              </div>
              <div className="upContainer">
                <AudioFunctionButton>
                  {/* in jsx when use arrow and {} , react expect to return elemetn , if it does not have  return ,  implicitly returns void, or undefined, so, react think nothing to render  */}
                  {(playListArray) => (
                    // return element
                    <div
                      className="flex gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <AudioFunctionShuffle
                        className="bg-pink-300 p-2 text-sm md:text-base"
                        urlProp={playListArray}
                        url={url}
                      />
                      <AudioFunctionPre
                        url={url}
                        urlProp={playListArray}
                        className="bg-pink-300 p-2 text-sm md:text-base"
                      />
                      <ToggleButton
                        className="w-[50px] bg-red-300"
                        urlProp={playListArray}
                      />
                      <AudioFunctionNext
                        url={url}
                        urlProp={playListArray}
                        className="bg-pink-300 p-2 text-sm md:text-base"
                      />
                      <AudioFunctionRepeat className="bg-pink-300 p-2 text-sm md:text-base" />
                    </div>
                  )}
                </AudioFunctionButton>
              </div>
            </div>
          </div>
        </AudioFullBackGround>
      )}
    </div>
  );
}

export default AudioFull;

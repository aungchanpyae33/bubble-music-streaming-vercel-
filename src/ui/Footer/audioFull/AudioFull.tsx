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
import clsx from "clsx";
import Volume from "../volume/Volume";
import FocusTrap from "./FocusTrap";
function AudioFull({
  footerRef,
  url,
  duration,
  toggleRef,
}: {
  footerRef: React.RefObject<HTMLElement | null>;
  url: string;
  duration: number;
  toggleRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const { open, setOpen } = useContext(Context);
  const refFocus = useRef<HTMLDivElement | null>(null);

  CloseFunctoionForFull(open, setOpen, toggleRef, refFocus);

  return open ? (
    <FocusTrap
      refFocus={refFocus}
      mqAffectsChild={["(width >= 48rem)", "(width >= 64rem)"]}
    >
      <div
        tabIndex={0}
        ref={refFocus}
        className={clsx("", {
          hidden: !open,
        })}
      >
        <AudioFullBackGround>
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
          <div className=" h-fit py-2  shrink-0  w-[90%]  inset-x-0 mx-auto sticky bottom-0">
            <div className="audioFunctionContainer  flex  flex-col flex-1 h-full gap-y-10 items-center justify-center">
              <div className="BottomContainer w-full static top-0 left-0 items-center ">
                <div className="  w-full flex items-center relative">
                  <AudioSeekBar
                    hideSliderInSmScreen={false}
                    childrenFn={(value) => (
                      <TimeIndicatorCur
                        value={value}
                        duration={duration}
                        className="text-sm md:text-base  w-fit md:w-[5rem] text-start md:static md:left-auto md:bottom-auto md:translate-y-0  absolute left-0 bottom-0 translate-y-full"
                      />
                    )}
                    duration={duration}
                    key={url}
                    className="hidden"
                  />
                  <TimeIndicatorDur
                    duration={duration}
                    className="text-sm md:text-base w-fit md:w-[5rem] text-end md:static md:right-auto md:bottom-auto md:translate-y-0 absolute right-0 bottom-0 translate-y-full "
                  />
                </div>
              </div>
              <div className="upContainer w-full flex justify-center md:justify-between">
                <div className="hidden md:flex w-[20%] max-w-[250px]  items-center">
                  hiello
                </div>
                <AudioFunctionButton>
                  {/* in jsx when use arrow and {} , react expect to return elemetn , if it does not have  return ,  implicitly returns void, or undefined, so, react think nothing to render  */}
                  {(playListArray) => (
                    // return element
                    <div
                      className="flex flex-1  justify-center gap-5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <AudioFunctionShuffle
                        className="bg-pink-300 p-2  md:text-base text-2xl"
                        urlProp={playListArray}
                        url={url}
                      />
                      <AudioFunctionPre
                        url={url}
                        urlProp={playListArray}
                        className="bg-pink-300 p-2  md:text-base text-2xl"
                      />
                      <ToggleButton
                        className=" bg-red-300 md:text-base text-2xl "
                        urlProp={playListArray}
                      />
                      <AudioFunctionNext
                        url={url}
                        urlProp={playListArray}
                        className="bg-pink-300 p-2  md:text-base text-2xl"
                      />
                      <AudioFunctionRepeat className="bg-pink-300 p-2  md:text-base text-2xl" />
                    </div>
                  )}
                </AudioFunctionButton>
                <div className="hidden md:flex  relative w-[20%] max-w-[250px] justify-end">
                  <Volume />
                </div>
              </div>
            </div>
          </div>
        </AudioFullBackGround>
      </div>
    </FocusTrap>
  ) : (
    <div className=" hidden"></div>
  );
}

export default AudioFull;

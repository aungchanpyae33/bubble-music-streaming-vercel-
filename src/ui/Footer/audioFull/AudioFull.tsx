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
import AudioFullInfoWrapper from "./AudioFullInfoWrapper";
import CloseFunctoionForFull from "@/lib/CloseFunctionForFull";
import Volume from "../volume/Volume";

import { AnimatePresence } from "motion/react";
import AudioCurImg from "./AudioCurImg";
import { X } from "lucide-react";
import IconWrapper from "@/ui/general/IconWrapper";
import clsx from "clsx";
import MotionFull from "./MotionFull";
import FocusTrap from "./FocusTrap";
import LyricToggleBtn from "./LyricToggleBtn";
import QueueToggle from "./QueueToggle";
import ContextAudioFullRef from "./ContextAudioFullRef";

function AudioFull({
  footerRef,
  url,
  id,
  duration,
  toggleRef,
}: {
  footerRef: React.RefObject<HTMLDivElement | null>;
  url: string;
  id: string;
  duration: number;
  toggleRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const { open, setOpen } = useContext(Context);
  const refFocus = useRef<HTMLDivElement | null>(null);

  CloseFunctoionForFull(open, setOpen, toggleRef, refFocus);
  return (
    <ContextAudioFullRef footerRef={footerRef} open={open}>
      <AnimatePresence>
        {open && (
          <MotionFull>
            <FocusTrap
              refFocus={refFocus}
              mqAffectsChild={["(width >= 48rem)", "(width >= 64rem)"]}
            >
              <AudioFullBackGround
                className={clsx(
                  "w-full h-full flex flex-col items-center justify-center   "
                )}
                ref={refFocus}
              >
                <div className="mx-auto w-[90%] h-[55px] min-h-[55px] max-h-[55px]  flex items-center sticky top-0">
                  <button
                    className=" bg-transparent transition-colors  duration-200 hover:bg-[#333333] p-1 rounded-full flex items-center justify-center"
                    onClick={() => {
                      toggleRef.current?.focus();
                      setOpen(!open);
                    }}
                  >
                    <IconWrapper size="large" Icon={X} />
                  </button>
                </div>

                <AudioFullInfoWrapper>
                  <AudioCurImg />
                </AudioFullInfoWrapper>
                <div className=" h-[20%] py-2  shrink-0  w-[90%]  inset-x-0 mx-auto sticky bottom-0">
                  <div className="audioFunctionContainer  flex  flex-col flex-1 h-full gap-y-10 items-center justify-center">
                    <div className="BottomContainer w-full static top-0 left-0 items-center ">
                      <div className="  w-full flex items-center relative">
                        <AudioSeekBar
                          isFull={true}
                          url={url}
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
                      <div className=" md:flex w-[20%] max-w-[250px]  items-center">
                        <LyricToggleBtn />
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
                              listSong={playListArray}
                              id={id}
                            />
                            <AudioFunctionPre
                              id={id}
                              listSong={playListArray}
                              className="bg-pink-300 p-2  md:text-base text-2xl"
                            />
                            <ToggleButton className=" bg-red-300 md:text-base text-2xl " />
                            <AudioFunctionNext
                              id={id}
                              listSong={playListArray}
                              className="bg-pink-300 p-2  md:text-base text-2xl"
                            />
                            <AudioFunctionRepeat className="bg-pink-300 p-2  md:text-base text-2xl" />
                          </div>
                        )}
                      </AudioFunctionButton>
                      <div className="flex  relative w-[20%] gap-x-3 max-w-[250px] justify-end">
                        <QueueToggle />
                        <span className=" hidden md:inline">
                          <Volume isFull={true} />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </AudioFullBackGround>
            </FocusTrap>
          </MotionFull>
        )}
      </AnimatePresence>
    </ContextAudioFullRef>
  );
}

export default AudioFull;

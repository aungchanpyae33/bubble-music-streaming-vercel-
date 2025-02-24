import { Context } from "@/lib/MediaSource/ContextMediaAudioFull";
import { useContext } from "react";
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
function AudioFull({
  footerRef,
  url,
  duration,
}: {
  footerRef: React.RefObject<HTMLElement | null>;
  url: string;
  duration: number;
}) {
  const { open, setopenFn } = useContext(Context);
  return (
    <>
      {open && (
        <AudioFullBackGround footerRef={footerRef}>
          <button
            className=" absolute bg-pink-400 top-0 right-2"
            onClick={() => {
              footerRef!.current!.classList.toggle("z-50");
              setopenFn();
            }}
          >
            close
          </button>
          <div className=" h-[20%] min-h-[100px] w-full sm:w-[96%] md:w-[95%] lg:w-[90%]  bg-red-800 inset-x-0 mx-auto bg-re fixed bottom-0">
            <div className="audioFunctionContainer flex  flex-col flex-1  items-center  justify-center">
              <div className="BottomContainer w-full static top-0 left-0 ">
                <div className=" w-full flex items-center">
                  <AudioSeekBar
                    childrenFn={(value) => (
                      <TimeIndicatorCur
                        value={value}
                        duration={duration}
                        className="text-sm md:text-base w-[5rem] text-center"
                      />
                    )}
                    duration={duration}
                    key={url}
                    className="w-full h-[3px] sm:hidden bg-blue-700 relative"
                  />
                  <TimeIndicatorDur
                    duration={duration}
                    className="text-sm md:text-base w-[5rem] text-center"
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
    </>
  );
}

export default AudioFull;

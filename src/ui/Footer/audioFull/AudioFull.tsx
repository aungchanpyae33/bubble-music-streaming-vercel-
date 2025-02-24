import { Context } from "@/lib/MediaSource/ContextMediaAudioFull";
import { useContext } from "react";
import AudioFullBackGround from "./AudioFullBackGround";
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
          <Image
            src={
              "https://s3.tebi.io/test1345/timo-volz-ZlFKIG6dApg-unsplash%20%281%29.jpg"
            }
            alt="this is image element"
            width={300}
            className="z-30"
            height={300}
            onLoad={(e) => console.log("done loading")}
          />

          <div className=" h-[20%] min-h-[100px] w-[90%] inset-x-0 mx-auto fixed bottom-0"></div>
        </AudioFullBackGround>
      )}
    </>
  );
}

export default AudioFull;

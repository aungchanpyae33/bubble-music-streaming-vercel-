import clsx from "clsx";
import { createContext, useRef } from "react";

interface AudioFullRefContextProps {
  audioFullRef: React.RefObject<HTMLDivElement | null>;
}

export const AudioFullRefContext = createContext<AudioFullRefContextProps>({
  audioFullRef: { current: null },
});
function ContextAudioFullRef({
  footerRef,
  children,
  open,
}: {
  footerRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
  open: boolean;
}) {
  const audioFullRef = useRef<HTMLDivElement>(null);
  function removeZindex() {
    if (!open) {
      footerRef!.current!.classList.remove("z-50");
    }
  }
  return (
    <AudioFullRefContext.Provider value={{ audioFullRef }}>
      <div
        className={clsx(
          "fixed inset-0 z-50 transition-transform duration-500 ease-in-out  bg-[#0A0A0A]",
          {
            "translate-y-full ": !open,
            "translate-y-0 ": open,
          }
        )}
        ref={audioFullRef}
        aria-hidden={!open}
        onTransitionEnd={removeZindex}
      >
        {children}
      </div>
    </AudioFullRefContext.Provider>
  );
}

export default ContextAudioFullRef;
